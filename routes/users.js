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
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        const info = JSON.parse(body);
        const products = info.products;
        res.json(products);
      }
    }
  );
});

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  console.log(req.body.title);
  const product = {
    "product": {
      "title": req.body.title,
      "body_html": req.body.description,
      "product_type": req.body.type,
      "variants": [
        {
          "price": req.body.price,
          "compare_at_price": req.body.compareAt,
        }
      ]
    }
  };

  console.log("Body: " + JSON.stringify(product));
  console.log("Product Title: " + product.product.title);
  console.log("Product Type: " + product.product.type);
  console.log("Product Price: " + product.product.price);
  console.log("Product Compare At Price: " + product.product.compareAt);
  console.log("Product Description: " + product.product.description);

  var config = {
    headers: { 'Content-Type': 'application/json', 'Accept': '*/*', }
  };

  axios.post('https://64beb4e89fe8585f4b55beaff60b6fa7:9b7274f7aae9f3e0b2922f5f8d64e925@lyons-teststore.myshopify.com/admin/products.json', JSON.stringify(product), config);

});

module.exports = router;
