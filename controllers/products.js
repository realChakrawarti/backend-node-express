import Product from "../models/product.js";

export const getAddproductPage = (req, res, next) => {
  res.render("add-product", { pageTitle: "Add Product Title" });
};

export const getProductById = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId, (product) =>
    res.render("shop/product-details", {
      data: product,
      pageTitle: `${product.productTitle}`,
    })
  );
};

export const postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

export const getProducts = (req, res, next) => {
  const products = Product.fetchAll((products) => {
    res.render("shop/product-listing", { data: products, pageTitle: "Shop" });
  });
};
