import Cart from "../models/Cart.js";

//UPDATE
export const updateCart = async (req, res, next) => {
  const cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) {
    const newCart = new Cart(req.body);
    try {
      const savedCart = await newCart.save();
      res.status(200).json(savedCart);
    } catch (err) {
      next(err);
    }
  } else {
    try {
      const newcart = { ...cart._doc };
      let newarr = [];
      let notbeenadd = true;
      for (let item of newcart.products) {
        if (item.productId !== req.body.products[0].productId) {
          newarr.push(item);
        } else {
          notbeenadd = false;
          if (req.body.products[0].quantity > 0)
            newarr.push({...req.body.products[0],quantity:(item.quantity+req.body.products[0].quantity)});
            // newarr.push(req.body.products[0]);
        }
      }
      if (notbeenadd) newarr = [...newarr, req.body.products[0]];
      newcart.products = newarr;

      const updatedCart = await Cart.findByIdAndUpdate(
        cart._id,
        { $set: newcart },
        { new: true }
      );
      res.status(200).json(updatedCart);
    } catch (err) {
      next(err);
    }
  }
};

export const checkoutCart = async (req, res, next) => {
  const cart = await Cart.findOne({ userId: req.body.userId });
  try {
    const newcart = { ...cart._doc };
    newcart.products = [];
    const updatedCart = await Cart.findByIdAndUpdate(
      cart._id,
      { $set: newcart },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    next(err);
  }
};

export const deleteCart = async (req, res, next) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    next(err);
  }
};

export const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
};

export const getCarts = async (req, res, next) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    next(err);
  }
};
