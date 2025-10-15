const express = require("express");
const router = express.Router();

const {
  addItem,
  updateItem,
  removeItem,
  getCart,
} = require("../controllers/cartController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, addItem);
router.patch("/:productId", auth, updateItem);
router.delete("/:productId", auth, removeItem);
router.get("/", auth, getCart);

module.exports = router;
