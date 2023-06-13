import Product from "../models/product.js";
// import Cart from "../models/cart.js";

export const getAddproductPage = (req, res, next) => {
  res.render("add-product", { pageTitle: "Add Product Title" });
};

export const getEditProductPage = (req, res, next) => {
  const productId = req.params.productId;
  req.user
    .getProducts({ where: { id: productId } })
    .then((products) => {
      const product = products[0];
      res.render("edit-product", {
        data: product,
        pageTitle: "Edit Product",
      });
    })
    .catch((err) => console.error(err));
};

export const getProductById = (req, res, next) => {
  const productId = req.params.productId;
  // Using where condition
  // Product.findAll({
  //   where: { id: productId },
  // })
  //   .then((products) => console.log(products[0]))
  //   .then((err) => console.error(err));
  Product.findByPk(productId)
    .then((product) =>
      res.render("shop/product-details", {
        data: product,
        pageTitle: `${product.title}`,
      })
    )
    .catch((err) => console.log(err));
};

export const postCart = (req, res, next) => {
  const productId = req.body.productId;
  console.log("Cart ID:", req.body.productId);
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products.at(0);
      }
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }

      return Product.findByPk(productId);
    })
    .then((product) =>
      fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      })
    )
    .then(() => res.redirect("/cart"))
    .catch((err) => console.log(err));
};

export const removeCartItem = (req, res, next) => {
  const productId = req.body.productId;
  // Cart.removeItem(productId);
  res.redirect("/cart");
};

export const postAddProduct = (req, res, next) => {
  req.user
    .createProduct({
      title: req.body.title,
    })
    .then((result) => {
      console.log("Added product!");
      return res.redirect("/");
    })
    .catch((err) => console.log(err));
};

export const postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const updatedTitle = req.body.title;
  Product.findByPk(productId)
    .then((product) => {
      product.title = updatedTitle;
      return product.save();
    })
    .then(() => {
      console.log("Updated product");
      res.redirect("/");
    })
    .catch((err) => console.error(err));
};

export const deleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.findByPk(productId)
    .then((product) => {
      return product.destroy();
    })
    .then((result) => {
      console.log("Product deleted");
      return res.redirect("/");
    })
    .catch((err) => console.log(err));
  // Cart.removeItem(productId);
};

export const getProducts = (req, res, next) => {
  req.user
    .getProducts()
    .then((products) => {
      res.render("shop/product-listing", { data: products, pageTitle: "Shop" });
    })
    .catch((err) => console.log(err));
};

export const getCartProducts = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart
        .getProducts()
        .then((products) => {
          console.log("productsInCart", products);
          res.render("shop/cart", { pageTitle: "My Cart", data: products });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
