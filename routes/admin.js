import express from "express";

const router = express.Router();

router.use("/products", (req, res, next) => {
  res.send("<h3>Hello from Products page</h3>");
});

// /admin/add-product
router.get("/add-product", (req, res, next) => {
  res.send(
    "<h3>Check Product</h3><hr/><form method='POST' action='/admin/check-product'><input type='text' name='product' placeholder='Check product availability'/><button type='submit'>Check</button></form>"
  );
});

// /admin/check-product
router.post("/check-product", (req, res, next) => {
  res.send(`<h3>${req.body.product} is available! 🎉</h3>`);
});

export default router;
