import express from "express"
import path from "path"
import * as productController from "../controllers/products.js"
import isAuth from "../middleware/isAuth.js"

const __dirname = path.resolve()

const router = express.Router()

router.use("/products", (req, res, next) => {
  res.send("<h3>Hello from Products page</h3>")
})

// GET /admin/add-product
router.get("/add-product", isAuth, productController.getAddproductPage)

// GET /admin/edit-product
router.get(
  "/edit-product/:productId",
  isAuth,
  productController.getEditProductPage
)

// POST /admin/add-product
router.post("/add-product", isAuth, productController.postAddProduct)

// POST /admin/edit-product
router.post("/edit-product", isAuth, productController.postEditProduct)

// POST /admin/delete-product
router.post("/delete-product", isAuth, productController.deleteProduct)

export default router
