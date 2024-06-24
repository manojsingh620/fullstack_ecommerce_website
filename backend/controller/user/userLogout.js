async function userLogout(req, res) {
  try {

    const tokenOption = {
      httpOnly : true,
      email : true,
      sameSite : 'None'
    }

    res.clearCookie("token",tokenOption);

    res.json({
      message: "Logout successfully",
      error: false,
      success: true,
      data: [],
    });


  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userLogout;
