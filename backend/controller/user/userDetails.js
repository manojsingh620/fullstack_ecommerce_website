const userModel = require("../../models/userModel");


async function userDetailcontroller(req, res) {
  try {
    console.log("user id from userDetails ", req.userId);

    const user = await userModel.findById(req.userId);
    console.log("user id from userDetails info =", user);

    res.status(200).json({
      data: user,
      error: false,
      success: true,
      message: "user details",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      err: true,
      success: false,
    });
  }
}

module.exports = userDetailcontroller;
