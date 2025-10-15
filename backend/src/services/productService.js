const Product = require("../models/Product");

const getAllProducts = async (query) => {
  const { category, search } = query;
  const filter = {};

  if (category) filter.category = category;
  if (search) filter.name = { $regex: search, $options: "i" };

  const products = await Product.find(filter).sort({ createdAt: -1 });
  return products;
};

const getProductById = async (id) => {
  const product = await Product.findById(id);
  if (!product) {
    const err = new Error("Product not found");
    err.statusCode = 404;
    throw err;
  }
  return product;
};

const createProduct = async (data) => {
  const product = new Product(data);
  await product.save();
  return product;
};

const updateProduct = async (id, data) => {
  const updated = await Product.findByIdAndUpdate(id, data, { new: true });
  if (!updated) {
    const err = new Error("Product not found");
    err.statusCode = 404;
    throw err;
  }
  return updated;
};

const deleteProduct = async (id) => {
  const deleted = await Product.findByIdAndDelete(id);
  if (!deleted) {
    const err = new Error("Product not found");
    err.statusCode = 404;
    throw err;
  }
  return deleted;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
