import express from "express";
import bodyParser from "body-parser";
import path from "path";

import adminRoutes from "./routes/admin.js";
import shopRoutes from "./routes/shop.js";
import * as errorController from "./controllers/errors.js";

import sequelize from "./db.js";
import Product from "./models/product.js";
import User from "./models/user.js";

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

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    return Product.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "John", email: "john@example.com" });
    }
    return user;
  })
  .then((user) => {
    // console.log(user);
    app.listen(PORT, () => {
      // console.log(result);
    });
    console.log(`server is listening on port ${PORT}...`);
  })
  .catch((err) => console.log(err));
