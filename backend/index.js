const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectToDb = require("./config/db");
const router = require("./routes");
const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);


const PORT = 8080 || process.env.PORT;


connectToDb().then(() => {
  app.listen(PORT, () => {
    console.log("server is running on port 8080");
    console.log("connect to DB");
  });
});
