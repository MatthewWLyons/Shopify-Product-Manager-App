const express = require("express");
const router = express.Router();
const request = require("request");
const axios = require("axios");

const ShopifyStore = process.env.ShopifyStore;
const ShopifyKey = process.env.ShopifyKey;
const ShopifyPassword = process.env.ShopifyPassword;

const ShopifyUrl =
  "https://" +
  ShopifyKey +
  ":" +
  ShopifyPassword +
  "@" +
  ShopifyStore +
  ".myshopify.com";

router.get("/products", (req, res) => {
  request(ShopifyUrl + "/admin/products.json", function(error, response, body) {
    if (!error && response.statusCode == 200) {
      const info = JSON.parse(body);
      const products = info.products;
      res.json(products);
    }
  });
});

router.get("/product/:ProductId", (req, res) => {
  request(
    ShopifyUrl + "/admin/products/" + req.params.ProductId + ".json",
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
    headers: { "Content-Type": "application/json", Accept: "/" }
  };

  axios.post(
    ShopifyUrl + "/admin/products.json",
    JSON.stringify(product),
    config
  );
});

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

  const UpdateURL = ShopifyUrl + "/admin/products/" + req.body.id + ".json";

  var config = {
    headers: { "Content-Type": "application/json", Accept: "/" }
  };
  axios.put(UpdateURL, JSON.stringify(product), config);
});

module.exports = router;
