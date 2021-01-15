const express = require("express");
const mongoose = require("mongoose");
const ProductModel = require("./schema");

const productsRouter = express.Router();

productsRouter.post("/", async (req, res, next) => {
  try {
    const newProduct = new ProductModel(req.body);
    const { _id } = await newProduct.save();
    res.status(201).send(_id);
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await ProductModel.find();
    res.status(201).send(products);
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/:productId", async (req, res, next) => {
  try {
    const product = await ProductModel.findById(req.params.productId);
    if (product) {
      res.status(201).send(product);
    } else {
      let error = new Error("PRODUCT NOT FOUND");
      error.httpStatusCode = 404;
      next(error);
    }
  } catch (error) {
    const err = new Error();
    if (error.name == "CastError") {
      err.message = "Product Not Found";
      err.httpStatusCode = 404;
      next(err);
    } else {
      next(error);
    }
  }
});

productsRouter.put("/:productId", async (req, res, next) => {
  try {
    let product = await ProductModel.findById(req.params.productId);
    console.log(product);
    if (product) {
      let modifiedProduct = await ProductModel.findByIdAndUpdate(
        req.params.productId,
        req.body,
        {
          runValidators: true,
          new: true,
          useFindAndModify: false,
        }
      );
      if (modifiedProduct) {
        res.send(modifiedProduct);
      } else {
        next();
      }
    } else {
      let error = new Error("PRODUCT NOT FOUND");
      error.httpStatusCode = 404;
      next(error);
    }
  } catch (error) {
    const err = new Error();
    if (error.name == "CastError") {
      err.message = "Product Not Found";
      err.httpStatusCode = 404;
      next(err);
    } else {
      next(error);
    }
  }
});

productsRouter.delete("/:productId", async (req, res, next) => {
  try {
    const product = await ProductModel.findById(req.params.productId);
    if (product) {
      const {_id} = await ProductModel.findByIdAndDelete(
        req.params.productId
      );
      if (_id) {
        res.status(200).send(`${_id} deleted`);
      } else {
        next();
      }
    } else {
      let error = new Error("PRODUCT NOT FOUND");
      error.httpStatusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/:productId/reviews", async (req, res, next) => {
  try {
    res.status(201).send("GET ALL REVIEWS");
  } catch (error) {
    next(error);
  }
});

productsRouter.post("/:productId/reviews", async (req, res, next) => {
  try {
    res.status(201).send("POST A REVIEW");
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/:productId/reviews/:reviewId", async (req, res, next) => {
  try {
    res.status(201).send("GET A REVIEW BY ID");
  } catch (error) {
    next(error);
  }
});

productsRouter.put("/:productId/reviews/:reviewId", async (req, res, next) => {
  try {
    res.status(201).send("UPDATE REVIEW");
  } catch (error) {
    next(error);
  }
});

productsRouter.delete(
  "/:productId/reviews/:reviewId",
  async (req, res, next) => {
    try {
      res.status(201).send("DELETE A REVIEW");
    } catch (error) {
      next(error);
    }
  }
);

module.exports = productsRouter;
