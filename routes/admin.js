import express from "express";

const router = express.Router();

router.use("/products", (req, res, next) => {
  res.send("<h3>Hello from Products page</h3>");
});

router.get("/add-product", (req, res, next) => {
  res.send(
    "<h3>Check Product</h3><hr/><form method='POST' action='/check-product'><input type='text' name='product' placeholder='Check product availability'/><button type='submit'>Check</button></form>"
  );
});

router.post("/check-product", (req, res, next) => {
  res.send(`<h3>${req.body.username} is available! 🎉</h3>`);
});

export default router;
