const { default: mongoose } = require("mongoose");
const ClientSubscription = require("../models/ClientSubscription");
const Client = require("../models/Client");

const createClientSubscription = async (req, res) => {
  const { expiryDate, subscriptionId, clientId } = req.body;

  if (!expiryDate || !subscriptionId || !clientId)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const currentDate = new Date();

    const activeSubscription = await ClientSubscription.findOne({
      clientId: mongoose.Types.ObjectId(clientId),
      expiryDate: { $gt: currentDate },
      subscriptionId: mongoose.Types.ObjectId(subscriptionId),
    }).exec();

    if (activeSubscription)
      return res
        .status(400)
        .json({ message: "Oops! They is already an active subscription." });

    if (currentDate > new Date(expiryDate))
      return res
        .status(400)
        .json({ message: "Expiry date must be greater than today" });

    const subscription = await ClientSubscription.create({
      expiryDate,
      subscriptionId,
      clientId,
    });

    if (!subscription)
      return res.status(400).json({ message: "Invalid subscription data" });

    res.status(201).json({ message: "Subscription added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const editClientSubscription = async (req, res) => {
  const { subscriptionId, expiryDate, clientSubscriptionId } = req.body;

  if (!subscriptionId || !expiryDate || !clientSubscriptionId)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const clientSubscription = await ClientSubscription.findById(
      clientSubscriptionId
    ).exec();

    if (!clientSubscription)
      return res.status(400).json({ message: "No client subscription found" });

    clientSubscription.subscriptionId = subscriptionId;
    clientSubscription.expiryDate = expiryDate;

    await clientSubscription.save();

    res
      .status(200)
      .json({ message: "Client subscription updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getClientsBySubscriptions = async (req, res) => {
  const {
    hasSubscription = 'hasSubscription',
    subscriptionId,
    page = 1,
    limit = 100,
  } = req.query;


  try {
    let clients =[];
    let totalClients;

    const options = {
      skip: (page - 1) * limit,
      limit: parseInt(limit),
    };

    if (hasSubscription === "hasSubscription") {
      // Clients with active subscriptions
      const query = {
        // expiryDate: { $gt: new Date() },
        isDeleted: false,
      };

      if (subscriptionId) {
        query.subscriptionId = subscriptionId;
      }

      const activeSubscriptions = await ClientSubscription.find(query)
        .populate({path: "clientId", select: "_id"})
        .populate({path: "subscriptionId", select: "name serviceName"});
      const clientIds = activeSubscriptions.map((sub) => sub.clientId._id);

      totalClients = await Client.countDocuments({
        _id: { $in: clientIds },
        isDeleted: false,
      });
      clients = await Client.find(
        { _id: { $in: clientIds }, isDeleted: false },
        null,
        options
      ).select("-password -refreshToken");
      clients = clients.map((client) => ({
        ...client._doc,
        subscriptions: activeSubscriptions.filter((sub) =>
          sub.clientId._id.equals(client._id)
        ),
      }));
    } else {
      // Clients without any subscriptions
      const activeSubscriptions = await ClientSubscription.find({
        // expiryDate: { $gt: new Date() },
        isDeleted: false,
      }).populate("clientId");

      const activeClientIds = activeSubscriptions.map(
        (sub) => sub.clientId._id
      );

      totalClients = await Client.countDocuments({
        _id: { $nin: activeClientIds },
        isDeleted: false,
      });
      clients = await Client.find(
        { _id: { $nin: activeClientIds }, isDeleted: false },
        null,
        options
      ).select("-password -refreshToken");
    }

    const totalPages = Math.ceil(totalClients / limit);

    res.status(200).json({
      clients,
      totalPages,
      currentPage: parseInt(page),
      totalClients,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = {
  createClientSubscription,
  editClientSubscription,
  getClientsBySubscriptions,
};
