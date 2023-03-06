import express from "express";
import path from "path";

const __dirname = path.resolve();

const router = express.Router();

export const products = [];

router.use("/products", (req, res, next) => {
  res.send("<h3>Hello from Products page</h3>");
});

// GET /admin/add-product
router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(__dirname, "views", "add-product.html"));
});

// POST /admin/add-product
router.post("/add-product", (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
});

export default router;
