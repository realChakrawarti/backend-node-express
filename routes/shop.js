import path from "path";
import express from "express";

const __dirname = path.resolve();

const router = express.Router();

router.use("/products", (req, res, next) => {
  res.send("<h3>Hello from Products page</h3>");
});

// By default path is "/"
router.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "views", "shop.html"));
});

export default router;
