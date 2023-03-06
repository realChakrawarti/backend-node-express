import express from "express";
import path from "path";

const __dirname = path.resolve();

const router = express.Router();

router.use("/products", (req, res, next) => {
  res.send("<h3>Hello from Products page</h3>");
});

// /admin/add-product
router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(__dirname, "views", "add-product.html"));
});

// /admin/check-product
router.post("/check-product", (req, res, next) => {
  res.send(`<h3>${req.body.product} is available! 🎉</h3>`);
});

export default router;
