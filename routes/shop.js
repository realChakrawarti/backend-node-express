import express from "express"
import * as productController from "../controllers/products.js"

const router = express.Router()

router.use("/products", (req, res, next) => {
  res.send("<h3>Hello from Products page</h3>")
})

router.get("/product/:productId", productController.getProductById)

// router.get("/cart", productController.getCartProducts);

// router.post("/cart", productController.postCart);

// router.post("/cart/delete-item", productController.removeCartItem);

// By default path is "/"
router.get("/", productController.getProducts)

export default router
