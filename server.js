require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3502;
const allowedOrigins = require("./config/allowedOrigins");
const bodyParser = require("body-parser");
const { logger } = require("./middleware/logger");

app.use(logger);

mongoose.set("strictQuery", true);

connectDB();

app.use(cors(corsOptions));

app.use(
  cors({
    origin: { allowedOrigins },
    credentials: true,
    methods: ["POST", "PUT", "GET", "PATCH", "OPTIONS", "HEAD", "DELETE"],
  })
);

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/", require("./routes/root"));
app.use("/auth", require("./routes/authRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/stripe", require("./routes/stripeRoutes"));
app.use("/payments", require("./routes/clientPaymentsRoutes"));
app.use("/subscriptions", require("./routes/subscriptionRoutes"));
app.use("/client-subscriptions", require("./routes/clientSubscrptionRoutes"));
app.use("/meal-plan", require("./routes/mealPlanRoutes"));
app.use("/progress-log", require("./routes/progressLogRoutes"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log(process.env.NODE_ENV);
  console.log("connected to mongo db");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
