const mongoose = require("mongoose");
const Subscription = require("../models/Subscription");
const {
  createStripeSubscriptionSession,
} = require("./clientPaymentController");

const createSubscription = async (req, res) => {
  const {
    name,
    amount,
    description,
    points,
    serviceName,
    noOfMonths,
    recommended,
  } = req.body;

  if (
    !name ||
    !amount ||
    !description ||
    !points ||
    !serviceName ||
    !noOfMonths
  )
    return res.status(400).json({ message: "All fields are required!!" });

  try {
    const dupSub = await Subscription.findOne({
      name: { $regex: name.trim(), $options: "i" },
      isDeleted: false,
    })
      .lean()
      .exec();

    if (dupSub)
      return res.status(409).json({ message: "Subscription already exists" });

    const subscription = await Subscription.create({
      name,
      amount,
      description,
      points,
      serviceName,
      noOfMonths,
      recommended,
    });
    if (!subscription) return res.status(400).json({ message: "Invalid data" });

    res.status(201).json({ message: "Subscription added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ messag: "Something went wrong" });
  }
};

const editSubscription = async (req, res) => {
  const {
    name,
    subscriptionId,
    amount,
    serviceName,
    description,
    points,
    recommended,
    noOfMonths,
  } = req.body;

  if (
    !name ||
    !subscriptionId ||
    !amount ||
    !description ||
    !points ||
    !serviceName ||
    !noOfMonths
  )
    return res.status(400).json({ message: "All fields are required" });

  try {
    const dupSub = await Subscription.findOne({
      name: { $regex: name.trim(), $options: "i" },
    })
      .lean()
      .exec();

    if (dupSub && dupSub._id.toString() !== subscriptionId)
      return res.status(409).json({ message: "Subscription already exists" });

    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription)
      return res.status(400).json({ message: "No subscription found" });

    subscription.name = name;
    subscription.amount = amount;
    subscription.description = description;
    subscription.points = points;
    subscription.serviceName = serviceName;
    subscription.recommended = recommended;
    subscription.noOfMonths = noOfMonths;
    await subscription.save();

    res.status(200).json({ message: "Subscription updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ messag: "Something went wrong" });
  }
};

const getAllSubscriptions = async (req, res) => {
  const serviceName = req.query.serviceName;
  const filters = {
    serviceName: { $regex: serviceName || "", $options: "i" },
  };
  try {
    const subscriptions = await Subscription.find(filters)
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    res.status(200).json(subscriptions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ messag: "Something went wrong" });
  }
};

const getSubscriptionById = async (req, res) => {
  const { subscriptionId } = req.params;

  try {
    const subscription = await Subscription.findById(subscriptionId)
      .lean()
      .exec();
    res.status(200).json(subscription);

  } catch (error) {
    console.log(error);
    res.status(500).json({ messag: "Something went wrong" });
  }
};

const deleteSubscriptionById = async (req, res) => {
  const { subscriptionId } = req.params;
  if (!subscriptionId)
    return res.status(400).json({ message: "Subscription Id is required" });

  try {
    const subscription = await Subscription.findById(subscriptionId).exec();
    if (!subscription)
      return res.status(400).json({ message: "No subscription found" });

    await Subscription.findByIdAndDelete(subscriptionId);
    return res
      .status(200)
      .json({ message: "Subscription deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ messag: "Something went wrong" });
  }
};

const subscribe = async (req, res) => {
  const { clientId, subscriptionId } = req.body;
  console.log({ clientId, subscriptionId });

  if (!clientId || !subscriptionId)
    return res.status(400).json({ message: "All fields are required" });
  // const findinterval = (noOfMonths) => {
  //   if (noOfMonths === 1) return "month";
  //   if (noOfMonths === 3) return "every 90 days";
  //   return "month";
  // };

  try {
    const subscription = await Subscription.findById(subscriptionId).exec();
    if (!subscription)
      return res.status(400).json({ message: "No subscription found" });

    const stripeSessionUrl = await createStripeSubscriptionSession(
      clientId,
      subscription.amount,
      "subscription",
      subscription.noOfMonths,
      subscriptionId,
      `https://fithub.com/payment-successful/${subscriptionId}`,
      `https://fithub.com/payment-failed/${subscriptionId}`,
      subscription.name || "Premium Subscription"
    );

    if (stripeSessionUrl === 0) {
      return res.status(400).json({ message: "Something went wrong!" });
    }

    res.json({ url: stripeSessionUrl.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  createSubscription,
  editSubscription,
  getAllSubscriptions,
  deleteSubscriptionById,
  subscribe,
  getSubscriptionById
};
