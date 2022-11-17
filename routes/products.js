var express = require("express");
var router = express.Router();
const products = require("../products.json");
//http://localhost:3000/products/
router.get("/", function (req, res, next) {
  res.status(200).json(products);
});
//http://localhost:3000/products/2
router.get("/:id", function (req, res, next) {
  try {
    const { id } = req.params;
    if (id < 0) {
      throw new Error("id must be positive");
    }
    const productsList = Object.entries(products);
    if (productsList.length - 1 < id) {
      throw new Error("id is out of range");
    }
    res.status(200).json(productsList[id][1]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//http://localhost:3000/products/instock/10
router.get("/instock/:qt", function (req, res, next) {
  try {
    const { qt } = req.params;
    if (qt < 0) {
      throw new Error("qt must be positive");
    }
    const productsList = Object.entries(products);
    const productsInStock = [];
    productsList.map((product) => {
      if (product[1].stock >= parseInt(qt)) {
        productsInStock.push(product[1]);
      }
    });
    res.status(200).json(productsInStock);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//http://localhost:3000/products/LENOVOX230/10
router.get("/:id/:qt", function (req, res, next) {
  try {
    const { id, qt } = req.params;
    if (id < 0) {
      throw new Error("id must be positive");
    }
    const selectedProduct = products[id];
    if (!selectedProduct) {
      throw new Error("name is wrong");
    }
    if (qt < 0) {
      throw new Error("qt must be positive");
    }
    const total = parseInt(selectedProduct.price) * parseInt(qt);
    res
      .status(200)
      .json({
        id,
        qt: parseInt(qt),
        unit_price: parseInt(selectedProduct.price),
        total,
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
