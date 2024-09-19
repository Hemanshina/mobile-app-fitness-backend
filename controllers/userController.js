const Tutor = require("../models/Tutor");
const Client = require("../models/Client");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Review = require("../models/Review");
const Session = require("../models/Session");
const UserPaymentAccount = require("../models/UserPaymentAccount");

const userMap = {
  student: Client,
  tutor: Tutor,
};

// client signup
const registerClient = async (req, res) => {
  const { email, password, name, } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: `All fields are required` });

  try {
    const roles = ["Client"];

    const dupEmail = await Client.findOne({
      email: { $regex: email.trim(), $options: "i" },
    })
      .lean()
      .exec();

    if (dupEmail)
      return res.status(409).json({ message: `Email already exists!!` });

    const hashPassword = await bcrypt.hash(password.trim(), 10);

    // generating jwt
    const accessToken = jwt.sign(
      {
        ClientInfo: {
          username: email,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" }
    );

    const refreshToken = jwt.sign(
      { username: email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // END OF JWT

    const clientObject = {
      password: hashPassword,
      email: email.trim().toLowerCase(),
      roles: roles,
      refreshToken: refreshToken,
      name: name,
    };

    const client = await Client.create(clientObject);

    if (!client)
      return res.status(400).json({ message: `Invalid user data received` });

    res.status(201).json({ message: "Account created successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!!" });
  }
};

//getUser by ID
const getuserById = async (req, res) => {
  if (!req.params.userId)
    return res.status(400).json({ message: "id is required" });

  try {
    const user = await Client.findById(req.params.userId)
      .select("-password -refreshToken")
      .lean()
      .exec();

    // const studentAccount = await UserPaymentAccount.findOne({
    //   userId: req.params.userId,
    // })
    //   .lean()
    //   .exec();

    if (!user) {
      return res
        .status(204)
        .json({ message: `No user matches id: ${req.params.userId}` });
    }

    const userData = {
      name: user.name,
      email: user.email,
      imgUrl: user.imgUrl,
      createdAt: user.createdAt,
    };
    res.status(200).json(userData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!!" });
  }
};


//delete user
const deleteUser = asyncHandler(async (req, res) => {
  const { userId, userType } = req.params;

  console.log(userType);
  if (!userId || !userType || !userMap[userType.toLowerCase()])
    return res
      .status(400)
      .json({ message: "User id and user type are required" });

  try {
    const user = await userMap[userType.toLowerCase()].findById(userId).exec();

    if (!user)
      return res.status(400).json({
        message: "Something went wrong, refresh the page and try again",
      });

    await userMap[userType.toLowerCase()]
      .findOneAndDelete({ _id: userId })
      .exec();

    if (userType.toLowerCase() === "student") {
      await Promise.all([Session.deleteMany({ studentId: userId }).exec()]);
    }

    await UserPaymentAccount.findOne({ userId: userId }).exec();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!!" });
  }
});

const updateUserStatus = async (req, res) => {
  const { userId, status, userType } = req.body;

  if (!userId || !status || !userMap[userType])
    return res.status(400).json({ message: "All fields are required" });

  try {
    const updates = {
      status: status,
    };
    const user = await userMap[userType].findByIdAndUpdate(userId, updates, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User status updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};


const editProfile = async (req, res) => {
  const {
    userId,
    subjects,
    userType,
    name,
    email,
    payRate,
    description,
    certification,
    teachingExperience,
    schoolName,
    courseName
  } = req.body;

  console.log("called")

  if (!userId || !userType || !email || !userMap[userType] || !name)
    return res.status(400).json({ message: "All fields are required" });

  if (
    userType === "tutor" &&
    (!subjects ||
      !payRate ||
      !description ||
      !certification ||
      !teachingExperience)
  )
    return res.status(400).json({ message: "All fields are required" });

  try {
    const user = await userMap[userType].findById(userId).exec();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.email = email;
    user.name = name;

    if (userType === "tutor") {
      user.subjects = subjects;
      user.payRate = payRate;
      user.description = description;
      user.certification = certification;
      user.teachingExperience = teachingExperience;
    }
    if (userType === "student") {
      user.schoolName = schoolName;
      user.courseName = courseName;
     
    }

    await user.save();

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};



module.exports = {
  updateUserStatus,
  deleteUser,
  registerClient,
  editProfile,
  getuserById,
};
