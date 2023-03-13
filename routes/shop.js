import path from "path";
import express from "express";
import { products } from "./admin.js";

const __dirname = path.resolve();

const router = express.Router();

router.use("/products", (req, res, next) => {
  res.send("<h3>Hello from Products page</h3>");
});

// By default path is "/"
router.get("/", (req, res, next) => {
  console.log("shop.js", products);
  res.render("shop", { data: products, pageTitle: "Shop" });
});

export default router;
