const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../services/productService");

const getProducts = async (req, res, next) => {
  try {
    const products = await getAllProducts(req.query);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
};

const getSingleProduct = async (req, res, next) => {
  try {
    const product = await getProductById(req.params.id);
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

const addProduct = async (req, res, next) => {
  try {
    const newProduct = await createProduct(req.body);
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    next(error);
  }
};

const editProduct = async (req, res, next) => {
  try {
    const updated = await updateProduct(req.params.id, req.body);
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

const removeProduct = async (req, res, next) => {
  try {
    const deleted = await deleteProduct(req.params.id);
    res.status(200).json({ success: true, data: deleted });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getSingleProduct,
  addProduct,
  editProduct,
  removeProduct,
};
