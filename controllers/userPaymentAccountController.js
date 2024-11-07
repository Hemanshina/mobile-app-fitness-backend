const Client = require("../models/Client");
const Payment = require("../models/Payment");
const UserPaymentAccount = require("../models/UserPaymentAccount");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const DOMAIN = `${process.env.CLIENT_DOMAIN}/dashboard`;

const createStipeDepositeSession = async (req, res) => {
  const { userId, amount } = req.body;

  console.log({ userId, amount })
  if (!userId || !amount)
    return res.status(400).json({ message: "All fields are required" });
  try {
    const stripeSessionUrl = await createStripeSession(userId, amount);

    if (stripeSessionUrl === 0)
      return res.status(400).json({ message: "Something went wrong!" });

    res.json({ url: stripeSessionUrl.url });
  } catch (error) {
    console.log(error);
  }
};

const createStripeSession = async (userId, amount) => {
  try {
    const customer = await stripe.customers.create({
      metadata: {
        userId: userId,
      },
    });
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Service",
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer: customer.id,
      success_url: "https://sites.google.com/view/tutorlinkpage/home",
      cancel_url: "https://sites.google.com/view/tutorlinkpage/home",
    });

    return { url: session.url };
  } catch (error) {
    console.log(error);
    return 0;
  }
};

const deposit = async (userId, amount, transactionCode) => {
  try {
    let payment = await UserPaymentAccount.findOne({ userId: userId }).exec();

    if (!payment) {
      await UserPaymentAccount.create({
        userId: userId,
        balance: amount,
        stripeCode: transactionCode,
      });
    }else{
      payment.balance += amount;
      await payment.save();
    }

    await Payment.create({
      userId: userId,
      amount: amount,
      stripeCode: transactionCode,
    });



    return Boolean(true);
  } catch (error) {
    console.log(error);
    return false;
  }
};

const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret =
    "whsec_5d1d724063f88514e43eae3cda6e0058d90a998a899e94bb4655ef11508588cb";

  let event;

  let result = false;
  const data = req.body.data.object;

  // console.log("data", data);

  try {
    const eventType = req.body.type;
    if (eventType === "checkout.session.completed") {
      console.log("Inside the success block");

      stripe.customers
        .retrieve(data.customer)
        .then(async (customer) => {
          // check dupilicate reference
          const duplicateReference = await Payment.findOne({
            stripeCode: data.customer,
          })
            .lean()
            .exec();

          if (duplicateReference) {
            console.log("Inside the check duplicate function");

            return res.status(409).json({ message: "Duplicate" });
          }

          const userId = customer.metadata.userId;

          if (userId) {
            console.log("on the deposit block");

            result = await deposit(
              customer.metadata.userId,
              data.amount_total / 100,
              data.customer
            );
          } else {
            console.log("the else block");
          }

          if (result) return res.status(200).json({ message: "success" });
          return res.status(500);
        })
        .catch((err) => console.log(err));
    }
  } catch (error) {
    console.log("webhook error", error);
  }
};

const getAllTransactions = async (req, res) => {
  const { userId } = req.params;

  if (!userId)
    return res.status(400).json({ message: "Client id is required" });

  try {
    const clientPayment = await Payment.find({ userId: userId }).lean().exec();

    if (!clientPayment)
      return res.status(404).json({ message: "No transactions found" });

    res.status(200).json(clientPayment);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!!" });
  }
};

module.exports = {
  getAllTransactions,
  createStipeDepositeSession,
  stripeWebhook,
  createStripeSession,
};
