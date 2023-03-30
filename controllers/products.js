import Product from "../models/product.js";

export const getAddproductPage = (req, res, next) => {
  res.render("add-product", { pageTitle: "Add Product Title" });
};

export const postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

export const getProducts = (req, res, next) => {
  const products = Product.fetchAll((products) => {
    console.log("shop.js", products);
    res.render("shop", { data: products, pageTitle: "Shop" });
  });
};
