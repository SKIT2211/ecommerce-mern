const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("../models/Product");

dotenv.config();

const products = [
  {
    name: "iPhone 14",
    price: 999,
    category: "Mobile",
    stock: 50,
    imageUrl: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
  },
  {
    name: "Samsung Galaxy S23",
    price: 899,
    category: "Mobile",
    stock: 45,
    imageUrl: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
  },
  {
    name: "MacBook Pro",
    price: 1999,
    category: "Laptop",
    stock: 30,
    imageUrl: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
  },
  {
    name: "Dell XPS 13",
    price: 1299,
    category: "Laptop",
    stock: 25,
    imageUrl: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
  },
  {
    name: "AirPods Pro",
    price: 249,
    category: "Accessories",
    stock: 100,
    imageUrl: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
  },
  {
    name: "Logitech Mouse",
    price: 49,
    category: "Accessories",
    stock: 80,
    imageUrl: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
  },
  {
    name: "iPad Air",
    price: 599,
    category: "Tablet",
    stock: 40,
    imageUrl: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
  },
  {
    name: "Samsung Galaxy Tab",
    price: 499,
    category: "Tablet",
    stock: 35,
    imageUrl: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
  },
  {
    name: "USB-C Hub",
    price: 29,
    category: "Accessories",
    stock: 150,
    imageUrl: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
  },
  {
    name: "Kindle Paperwhite",
    price: 139,
    category: "Others",
    stock: 60,
    imageUrl: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for product seeding...");

    await Product.deleteMany();
    await Product.insertMany(products);

    console.log("Products seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }
};

// seedProducts();

module.exports = seedProducts;
