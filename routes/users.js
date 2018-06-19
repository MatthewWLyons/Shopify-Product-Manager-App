const express = require("express");
const router = express.Router();
const request = require("request");
const axios = require("axios");

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get("/products", (req, res) => {
  request(
    "https://64beb4e89fe8585f4b55beaff60b6fa7:9b7274f7aae9f3e0b2922f5f8d64e925@lyons-teststore.myshopify.com/admin/products.json",
    function(error, response, body) {
      if (!error && response.statusCode == 200) {
        const info = JSON.parse(body);
        const products = info.products;
        res.json(products);
      }
    }
  );
});

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get("/product/:ProductId", (req, res) => {
  request(
    "https://64beb4e89fe8585f4b55beaff60b6fa7:9b7274f7aae9f3e0b2922f5f8d64e925@lyons-teststore.myshopify.com/admin/products/" +
      req.params.ProductId +
      ".json",
    function(error, response, body) {
      if (!error && response.statusCode == 200) {
        const info = JSON.parse(body);
        const product = info.product;
        res.json(product);
      } else {
      }
    }
  );
});

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  const product = {
    product: {
      title: req.body.title,
      body_html: req.body.description,
      product_type: req.body.type,
      variants: [
        {
          price: req.body.price,
          compare_at_price: req.body.compareAt
        }
      ]
    }
  };
  var config = {
    headers: { "Content-Type": "application/json", Accept: "*/*" }
  };

  axios.post(
    "https://64beb4e89fe8585f4b55beaff60b6fa7:9b7274f7aae9f3e0b2922f5f8d64e925@lyons-teststore.myshopify.com/admin/products.json",
    JSON.stringify(product),
    config
  );
});

// @route   PUT /api/update/:ProductId
// @desc    Register user
// @access  Public
router.post("/update", (req, res) => {
  const product = {
    product: {
      id: req.body.id,
      title: req.body.title,
      body_html: req.body.description,
      product_type: req.body.type,
      variants: [
        {
          price: req.body.price,
          compare_at_price: req.body.compareAt
        }
      ]
    }
  };

  const UpdateURL =
    "https://64beb4e89fe8585f4b55beaff60b6fa7:9b7274f7aae9f3e0b2922f5f8d64e925@lyons-teststore.myshopify.com/admin/products/" +
    req.body.id +
    ".json";

  var config = {
    headers: { "Content-Type": "application/json", Accept: "*/*" }
  };
  axios.put(UpdateURL, JSON.stringify(product), config);
});

module.exports = router;
