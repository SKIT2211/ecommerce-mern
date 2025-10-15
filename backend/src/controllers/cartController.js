const {
  addToCart,
  removeCartItem,
  getUserCart,
  updateCartItem,
} = require("../services/cartService");

const addItem = async (req, res, next) => {
  try {
    const cart = await addToCart(req.user.id, req.body);
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
};

const updateItem = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const cart = await updateCartItem(req.user.id, productId, quantity);
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
};

const removeItem = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const cart = await removeCartItem(req.user.id, productId);
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
};

const getCart = async (req, res, next) => {
  try {
    const cart = await getUserCart(req.user.id);
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
};

module.exports = { addItem, updateItem, removeItem, getCart };
