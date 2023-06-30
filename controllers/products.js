import Product from "../models/product.js"

export const getAddproductPage = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product Title",
    isAuthenticated: req.session.isLoggedIn,
  })
}

export const getLoginPage = (req, res, next) => {
  res.render("login", {
    pageTitle: "Login",
    isAuthenticated: req.session.isLoggedIn,
  })
}

export const postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err)
    res.redirect("/")
  })
}

export const postLogin = (req, res, next) => {
  req.session.isLoggedIn = true
  res.redirect("/")
}

export const getEditProductPage = (req, res, next) => {
  const productId = req.params.productId
  Product.findById(productId)
    .then((product) => {
      res.render("edit-product", {
        data: product,
        pageTitle: "Edit Product",
        isAuthenticated: req.session.isLoggedIn,
      })
    })
    .catch((err) => console.error(err))
}

export const getProductById = (req, res, next) => {
  const productId = req.params.productId
  Product.findById(productId)
    .then((product) =>
      res.render("shop/product-details", {
        data: product,
        pageTitle: `${product.title}`,
        isAuthenticated: req.session.isLoggedIn,
      })
    )
    .catch((err) => console.log(err))
}

export const postCart = (req, res, next) => {
  const productId = req.body.productId
  console.log("Cart ID:", req.body.productId)
  let fetchedCart
  let newQuantity = 1
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart
      return cart.getProducts({ where: { id: productId } })
    })
    .then((products) => {
      let product
      if (products.length > 0) {
        product = products.at(0)
      }
      if (product) {
        const oldQuantity = product.cartItem.quantity
        newQuantity = oldQuantity + 1
        return product
      }

      return Product.findByPk(productId)
    })
    .then((product) =>
      fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      })
    )
    .then(() => res.redirect("/cart"))
    .catch((err) => console.log(err))
}

export const removeCartItem = (req, res, next) => {
  const productId = req.body.productId
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: productId } })
    })
    .then((products) => {
      const product = products.at(0)
      return product.cartItem.destroy()
    })
    .then(() => res.redirect("/cart"))
    .catch((err) => console.log(err))
}

export const postAddProduct = (req, res, next) => {
  const title = req.body.title
  const product = new Product({
    title: title,
  })
  product
    .save()
    .then((result) => {
      console.log("Added product!")
      return res.redirect("/")
    })
    .catch((err) => console.log(err))
}

export const postEditProduct = (req, res, next) => {
  const productId = req.body.productId
  const updatedTitle = req.body.title

  Product.findById(productId)
    .then((product) => {
      product.title = updatedTitle
      return product.save()
    })
    .then(() => {
      console.log("Updated product")
      res.redirect("/")
    })
    .catch((err) => console.error(err))
}

export const deleteProduct = (req, res, next) => {
  const productId = req.body.productId
  Product.findByIdAndDelete(productId)
    .then(() => {
      return res.redirect("/")
    })
    .catch((err) => console.log(err))
}

export const getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      console.log(products)
      res.render("shop/product-listing", {
        data: products,
        pageTitle: "Shop",
        isAuthenticated: req.session.isLoggedIn,
      })
    })
    .catch((err) => console.log(err))
}

export const getCartProducts = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart
        .getProducts()
        .then((products) => {
          return res.render("shop/cart", {
            pageTitle: "My Cart",
            data: products,
          })
        })
        .catch((err) => console.log(err))
    })
    .catch((err) => console.log(err))
}
