import express from "express";
import bodyParser from "body-parser";
import path from "path";

import adminRoutes from "./routes/admin.js";
import shopRoutes from "./routes/shop.js";
import * as errorController from "./controllers/errors.js";

import sequelize from "./db.js";
import Product from "./models/product.js";
import User from "./models/user.js";
import Cart from "./models/cart.js";
import CartItem from "./models/cart-item.js";

const __dirname = path.resolve();
const PORT = 3000;
const app = express();

app.set("view engine", "pug");
app.set("views", "views"); // By default its /views, no need to add it explicity if path is same

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404Page);

// Associations
// User Product
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

// User Cart
User.hasOne(Cart);
Cart.belongsTo(User); // Optional, which is reverse of the above association

// Product Cart, Many-To-Many using intermediate table
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    return Product.findByPk(1);
  })
  .then((user) => {
    console.log("User found", user);
    if (!user) {
      return User.create({ name: "John", email: "john@example.com" });
    }
    return user;
  })
  .then((user) => {
    return user.createCart();
    // console.log(user);
  })
  .then((cart) => {
    app.listen(PORT, () => {
      // console.log(cart);
    });
    console.log(`server is listening on port ${PORT}...`);
  })
  .catch((err) => console.log(err));
