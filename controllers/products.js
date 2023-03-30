export const products = [];

export const getAddproductPage = (req, res, next) => {
  res.render("add-product", { pageTitle: "Add Product Title" });
};

export const postAddProduct = (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
};

export const getProducts = (req, res, next) => {
  console.log("shop.js", products);
  res.render("shop", { data: products, pageTitle: "Shop" });
};
