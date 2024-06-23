
const bcrypt = require("bcryptjs");
const userModel = require("../../models/userModel");



async function userSignUpController(req, res) {
  try {
    const { email, password, name } = req.body;

    const user = await userModel.findOne({ email });

    console.log("user data", user);

    if (user) {
      throw new Error("User is already exist");
    }

    if (!email) {
      throw new Error("please provide email");
    }
    if (!password) {
      throw new Error("please provide password");
    }
    if (!name) {
      throw new Error("please provide name");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error("something is wrong");
    }

    const payload = {
      ...req.body,
      role : "GENERAL",
      password: hashPassword,
    };

    const userData = new userModel(payload);
    const saveUser = await userData.save();

    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User Created successfuly",
    });
  } catch (err) {

    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignUpController;
