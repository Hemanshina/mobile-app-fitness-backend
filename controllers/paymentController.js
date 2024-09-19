const Payment = require("../models/Payment");

const getClientPayments = async (req, res) => {
  const page = req?.query?.page || 1;
  const perPage = req?.query?.perPage || 20;
  const skip = (page - 1) * parseInt(perPage);
  const transactionCode = req?.query?.transactionCode;

  try {
    const [sales, count] = await Promise.all([
      Payment.find()
      .where({
        $expr: {
          $regexMatch: {
            input: { $toString: "$transactionCode" },
            regex: transactionCode.toString(),
            options: "i",
          },
        },
      })
        .sort({ createdAt: -1 })
        .populate({ path: "userId", select: "email" })
        .limit(parseInt(perPage))
        .skip(skip)
        .lean()
        .exec(),
      Payment.countDocuments(),
    ]);

    if (!sales.length)
      return res.status(200).json({ message: "No sales found" });

    res.status(200).json({ sales, count });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!!" });
  }
};

module.exports = {
  getClientPayments,
};
