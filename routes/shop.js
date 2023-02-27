import express from "express";

const router = express.Router();

router.use("/products", (req, res, next) => {
  res.send("<h3>Hello from Products page</h3>");
});

// By default path is "/"
router.get("/", (req, res, next) => {
  res.send("<h3>Hello from ExpressJS</h3>");
});

export default router;
