const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const userModel = require("../../models/userModel");

async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error("please provide email");
    }
    if (!password) {
      throw new Error("please provide password");
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const checkpassword = await bcrypt.compare(password, user.password);
    console.log("log in successfuly", checkpassword);

    if (checkpassword) {
      const tokenData = {
        _id: user._id,
        email: user.email,
      };
      const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
        expiresIn: 60 * 60 * 24,
      });

      const tokenOption = {
        httpOnly : true,
        secure : true,
        sameSite : 'None'
      }

      res.cookie("token",token,tokenOption).json({
        message: "Login successfully",
        data: token,
        success: true,
        error: false,
      });

    } else {
      throw new Error("Please  check Email and Password");
    }
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}
module.exports = userSignInController;
