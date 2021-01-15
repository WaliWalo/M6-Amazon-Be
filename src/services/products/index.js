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
    const id = req.params.productId;
    const { reviews } = await ProductModel.findById(id, {
      reviews: 1,
      _id: 0,
    });
    res.status(201).send(reviews);
  } catch (error) {
    console.log("Error with getting all reviews route: ", error);
    res.status(500).json({ success: false, errors: "Internal Server Error" });
    next(error);
  }
});

productsRouter.post("/:productId/reviews", async (req, res, next) => {
  try {
    const newReview = {...req.body, createdAt: new Date};
  console.log(newReview);
    const productId = req.params.productId;

    const {_id} = await ProductModel.findByIdAndUpdate(
      productId,
      {
        $push: {
          reviews: newReview,
        },
      },
      { runValidators: true, new: true }
    );
    res.status(201).json({ success: true, reviewAdded: _id });
  } catch (error) {
    console.log("Error with posting review route: ", error);
    res.status(500).json({ success: false, errors: "Internal Server Error" });
    next(error);
  }
});

productsRouter.get("/:productId/reviews/:reviewId", async (req, res, next) => {
  try {
    const { productId, reviewId } = req.params;
    const { reviews } = await ProductModel.findOne(
      {
        _id: mongoose.Types.ObjectId(productId),
      },
      {
        _id: 0,
        reviews: {
          $elemMatch: { _id: mongoose.Types.ObjectId(reviewId) },
        },
      }
    );
    if (reviews && reviews.length > 0) {
      res.status(201).send(reviews[0]);
    } else {
      const error = new Error(
        `Review with id ${mongoose.Types.ObjectId(reviewId)} not found`
      );
      res.status(404).json({ success: false, errors: error });
      next(error);
    }
  } catch (error) {
    console.log("Error with getting specific review route: ", error);
    res.status(500).json({ success: false, errors: "Internal Server Error" });
    next(error);
  }
});

productsRouter.put("/:productId/reviews/:reviewId", async (req, res, next) => {
  try {
    const { productId, reviewId } = req.params;

    const { reviews } = await ProductModel.findOne(
      {
        _id: mongoose.Types.ObjectId(productId),
      },
      {
        _id: 0,
        reviews: {
          $elemMatch: { _id: mongoose.Types.ObjectId(reviewId) },
        },
      }
    );
    if (reviews && reviews.length > 0) {
      const oldReview = reviews[0].toObject();
      const modifiedReview = { ...oldReview, ...req.body };
      await ProductModel.findOneAndUpdate(
        {
          _id: mongoose.Types.ObjectId(productId),
          "reviews._id": mongoose.Types.ObjectId(reviewId),
        },
        { $set: { "reviews.$": modifiedReview } },
        {
          runValidators: true,
          new: true,
        }
      );
      res.status(201).json({ success: true, data: modifiedReview });
    } else {
      const error = new Error(`Review with id ${reviewId} not found`);
      error.httpStatusCode = 404;
      next(error);
    }
  } catch (error) {
    console.log("Error with editing review route: ", error);
    res.status(500).json({ success: false, errors: "Internal Server Error" });
    next(error);
  }
});

productsRouter.delete(
  "/:productId/reviews/:reviewId",
  async (req, res, next) => {
    try {
      const { productId, reviewId } = req.params;

      const modifiedProduct = await ProductModel.findByIdAndUpdate(
        productId,
        {
          $pull: {
            reviews: { _id: mongoose.Types.ObjectId(reviewId) },
          },
        },
        {
          runValidators: true,
          new: true,
        }
      );
      if (modifiedProduct) {
        res.status(201).json({ success: true, data: "Review deleted" });
      } else {
        const error = new Error(`Review with id ${reviewId} not found`);
        res.status(404).json({ success: false, errors: error });
        next(error);
      }
    } catch (error) {
      console.log("Error with deleting review route: ", error);
      res.status(500).json({ success: false, errors: "Internal Server Error" });
      next(error);
    }
  }
);

module.exports = productsRouter;
