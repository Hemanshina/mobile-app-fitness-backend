const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const DOMAIN = `${process.env.CLIENT_DOMAIN}/client`;
const { default: mongoose } = require("mongoose");
const ClientPayment = require("../models/ClientPayment");
const Client = require("../models/Client");
const ClientSubscription = require("../models/ClientSubscription");
const Subscription = require("../models/Subscription");



const createStripeSession = async (
  userId,
  amount,
  orderType,
  mode = "payment",
  orderId = "none"
) => {
  try {
    const customer = await stripe.customers.create({
      metadata: {
        userId: userId,
        orderType: orderType,
        orderId,
      },
    });

    const lineItems = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: mode === "subscription" ? "Premium" : "Service",
          },
          unit_amount: amount * 100,
        },
        quantity: 1,
      },
    ];

    if (mode === "subscription") {
      // Add recurring parameter for subscription mode
      lineItems[0].price_data.recurring = {
        interval: "month",
      };
    }

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode,
      customer: customer.id,
      success_url: `${DOMAIN}/success`,
      cancel_url: `${DOMAIN}/cancel`,
    });

    return { url: session.url };
  } catch (error) {
    console.log(error);
    return 0;
  }
};

const createStripeSubscriptionSession = async (
  userId,
  amount,
  orderType,
  interval, 
  orderId = "none",
  success_url,
  cancel_url,
  subscriptionName,
) => {
  try {
    const customer = await stripe.customers.create({
      metadata: {
        userId: userId,
        orderType: orderType,
        orderId,
      },
    });

    const lineItems = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: subscriptionName,
          },
          unit_amount: amount * 100,
          recurring: {
            interval: 'month', // Set the interval from the parameter
            interval_count: interval
          },
        },
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "subscription", // Always in subscription mode
      customer: customer.id,
      success_url,
      cancel_url,
    });

    return { url: session.url };
  } catch (error) {
    console.log(error);
    return 0;
  }
};








const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret =
    "whsec_5d1d724063f88514e43eae3cda6e0058d90a998a899e94bb4655ef11508588cb";
  const eventType = req.body.type;
  const data = req.body.data.object;

  try {
    if (eventType !== "checkout.session.completed") {
      return res.status(400).json({ message: "Unhandled event type" });
    }

    console.log("Inside the success block");

    const customer = await stripe.customers.retrieve(data.customer);

    const duplicateReference = await ClientPayment.findOne({
      transactionCode: data.customer,
    })
      .lean()
      .exec();

    if (duplicateReference) {
      return res.status(409).json({ message: "Duplicate" });
    }

    const { orderId, userId: clientId, orderType } = customer.metadata;
    const amount = data.amount_total / 100;
    let result;

    console.log("Customer metadata:", customer.metadata);

    switch (orderType) {
      case "deposit":
        console.log("On the deposit block");
        result = await deposit(
          clientId,
          amount,
          data.customer,
          "Deposit",
          "Success"
        );
        break;
      case "subscription":
        result = await premiumSubscription(
          clientId,
          orderId,
          data.customer,
          orderType,
          amount
        );
        break;
      default:
        result = await checkoutWithOrder(
          clientId,
          orderId,
          data.customer,
          orderType,
          amount
        );
    }

    if (result) {
      return res.status(200).json({ message: "Success" });
    } else {
      return res.status(500).json({ message: "Processing failed" });
    }
  } catch (error) {
    console.error("Webhook error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



const premiumSubscription = async (
  clientId,
  orderId,
  transactionCode,
  orderType,
  amount
) => {
  try {
    const client = await Client.findById(clientId).exec();
    const subscriptionInDb = await Subscription.findById(orderId).exec();

    if (!client || !subscriptionInDb) return false;

    const currentDate = new Date();

    const [activeSubscription, transactionDup] = await Promise.all([
      ClientSubscription.findOne({
        clientId: mongoose.Types.ObjectId(clientId),
        endDate: { $gt: currentDate },
        subscriptionId: mongoose.Types.ObjectId(orderId),
      }).exec(),
      ClientPayment.findOne({ transactionCode }).exec(),
    ]);

    if (transactionDup) return false;

    const transaction = new ClientPayment({
      clientId,
      description: "Subscription",
      transactionCode,
      amount,
    });

    if (activeSubscription) {
      activeSubscription.expiryDate = addMonthsToADate(
        activeSubscription.expiryDate,
        subscriptionInDb.noOfMonths
      );

      await Promise.all([activeSubscription.save(), transaction.save()]);

      return true;
    }

    const subscription = new ClientSubscription({
      expiryDate: addMonthsToADate(currentDate, subscriptionInDb.noOfMonths),
      subscriptionId: subscriptionInDb._id,
      clientId: clientId,
    });

    await Promise.all([subscription.save(), transaction.save()]);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getAllClientTransactions = async (req, res) => {
  const page = req?.query?.page || 1;
  const perPage = req?.query?.perPage || 20;
  const skip = (page - 1) * parseInt(perPage);

  const { clientId } = req.query;

  const filters = {};

  try {
    clientId && (filters.clientId = clientId);

    const [transactions, count] = await Promise.all([
      ClientPayment.find(filters)
        .sort({ createdAt: -1 })
        .limit(parseInt(perPage))
        .skip(skip)
        .lean()
        .exec(),
      ClientPayment.countDocuments(filters),
    ]);

    if (!transactions?.length) {
      return res.status(200).json({ message: "No transactions found" });
    }

    res.status(200).json({ transactions, count });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!!" });
  }
};


function addMonthsToADate(date, noOfMonths) {
  const result = new Date(date);
  result.setMonth(result.getMonth() + parseInt(noOfMonths));
  return result;
}

module.exports = {
  stripeWebhook,
  createStripeSession,
  getAllClientTransactions,
  createStripeSubscriptionSession,
};
