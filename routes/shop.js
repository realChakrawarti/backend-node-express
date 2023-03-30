import path from "path";
import express from "express";
import * as productController from "../controllers/products.js";

const __dirname = path.resolve();

const router = express.Router();

router.use("/products", (req, res, next) => {
  res.send("<h3>Hello from Products page</h3>");
});

// By default path is "/"
router.get("/", productController.getProducts);

export default router;
