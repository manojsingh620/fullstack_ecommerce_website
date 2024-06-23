const addToCartModel = require("../../models/cartProduct");

const addToCartController = async (req, res) => {
  try {
    const { productId } = req?.body;
    const currentUser = req.userId;

    console.log("productId id addtocart",productId)

    const isProductAvilable = await addToCartModel.findOne({ ProductId : productId });

    console.log("isProductAvilable", isProductAvilable);

    if( isProductAvilable) {
       return res.json({
        message: "Already exist in add to cart",
        success: false,
        error: true,
      });
    }

    const payload = {
      ProductId: productId,
      Quantity: 1,
      UserId: currentUser,
    };

    const newAddToCart = new addToCartModel(payload);
    const saveProduct = await newAddToCart.save();

    return res.json({
      data: saveProduct,
      message: "Product Added in cart",
      success: true,
      error: false,
    });

  } catch (err) {
    res.json({
      message: err?.message || err,
      success: false,
      error: true,
    });
  }
};

module.exports = addToCartController;
