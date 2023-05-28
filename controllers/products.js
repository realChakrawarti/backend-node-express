import Product from "../models/product.js";
import Cart from "../models/cart.js";

export const getAddproductPage = (req, res, next) => {
  res.render("add-product", { pageTitle: "Add Product Title" });
};

export const getEditProductPage = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId, (product) => {
    return res.render("edit-product", {
      data: product,
      pageTitle: "Edit Product",
    });
  });
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

export const postCart = (req, res, next) => {
  const productId = req.body.productId;
  console.log("Cart ID:", req.body.productId);
  Cart.addProduct(productId);
  res.redirect("/");
};

export const removeCartItem = (req, res, next) => {
  const productId = req.body.productId;
  Cart.removeItem(productId);
  res.redirect("/cart");
};

export const postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

export const postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const updatedTitle = req.body.title;
  Product.update(productId, updatedTitle);
  res.redirect("/");
};

export const deleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.delete(productId);
  Cart.removeItem(productId);
  res.redirect("/");
};

export const getProducts = (req, res, next) => {
  const products = Product.fetchAll((products) => {
    res.render("shop/product-listing", { data: products, pageTitle: "Shop" });
  });
};

export const getCartProducts = (req, res, next) => {
  Cart.getCart((cart) => {
    const cartProducts = [];
    Product.fetchAll((products) => {
      for (const product of products) {
        const itemInCart = cart.find((item) => item.id === product.id);
        if (itemInCart) {
          cartProducts.push({ ...product, quantity: itemInCart.quantity });
        }
      }
      res.render("shop/cart", { pageTitle: "My Cart", data: cartProducts });
    });
  });
};
