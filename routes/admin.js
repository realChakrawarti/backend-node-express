import express from "express";
import path from "path";
import * as productController from "../controllers/products.js";

const __dirname = path.resolve();

const router = express.Router();

router.use("/products", (req, res, next) => {
  res.send("<h3>Hello from Products page</h3>");
});

// GET /admin/add-product
router.get("/add-product", productController.getAddproductPage);

// POST /admin/add-product
router.post("/add-product", productController.postAddProduct);

export default router;
