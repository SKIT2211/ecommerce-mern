const express = require("express");
const router = express.Router();

const {
  getProducts,
  getSingleProduct,
  addProduct,
  editProduct,
  removeProduct,
} = require("../controllers/productController");
const auth = require("../middleware/authMiddleware");

router.get("/", getProducts);
router.get("/:id", getSingleProduct);
router.post("/", auth, addProduct);
router.patch("/:id", auth, editProduct);
router.delete("/:id", auth, removeProduct);

module.exports = router;
