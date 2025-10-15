const Cart = require("../models/Cart");
const Product = require("../models/Product");

const addToCart = async (userId, { productId, quantity }) => {
  const product = await Product.findById(productId);
  if (!product) {
    const err = new Error("Product not found");
    err.statusCode = 404;
    throw err;
  }

  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = new Cart({ user: userId, items: [] });
  }

  const existingItem = cart.items.find(
    (item) => item.product.toString() === productId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  await cart.save();
  const populatedCart = await cart.populate("items.product");
  return populatedCart;
};

const updateCartItem = async (userId, productId, quantity) => {
  const cart = await Cart.findOne({ user: userId }).populate("items.product");
  if (!cart) {
    const err = new Error("Cart not found");
    err.statusCode = 404;
    throw err;
  }

  const item = cart.items.find((item) => {
    const id = item.product?._id
      ? item.product._id.toString()
      : item.product.toString();
    return id === productId;
  });

  if (!item) {
    const err = new Error("Product not found in cart");
    err.statusCode = 404;
    throw err;
  }

  item.quantity = quantity;
  await cart.save();
  return cart;
};

const removeCartItem = async (userId, productId) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    const err = new Error("Cart not found");
    err.statusCode = 404;
    throw err;
  }

  cart.items = cart.items.filter((item) => {
    const id = item.product?._id
      ? item.product._id.toString()
      : item.product.toString();
    return id !== productId;
  });

  await cart.save();
  const populatedCart = await cart.populate("items.product");

  return populatedCart;
};

const getUserCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId }).populate("items.product");
  if (!cart) {
    const err = new Error("Cart not found");
    err.statusCode = 404;
    throw err;
  }

  return cart;
};

module.exports = {
  addToCart,
  updateCartItem,
  removeCartItem,
  getUserCart,
};
