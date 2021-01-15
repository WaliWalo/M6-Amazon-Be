const express = require("express");
const mongoose = require("mongoose");
const ProductModel = require("./schema");

const productsRouter = express.Router();

productsRouter.post("/", async (req, res, next) => {
  try {
    res.status(201).send("POST PRODUCT");
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/", async (req, res, next) => {
  try {
    res.status(201).send("GET ALL PRODUCT");
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/:productId", async (req, res, next) => {
  try {
    res.status(201).send("GET PRODUCT BY ID");
  } catch (error) {
    next(error);
  }
});

productsRouter.put("/:productId", async (req, res, next) => {
  try {
    res.status(201).send("UPDATE PRODUCT");
  } catch (error) {
    next(error);
  }
});

productsRouter.delete("/:productId", async (req, res, next) => {
  try {
    res.status(201).send("DELETE PRODUCT");
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
