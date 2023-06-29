import express from "express"
import bodyParser from "body-parser"
import path from "path"

import adminRoutes from "./routes/admin.js"
import shopRoutes from "./routes/shop.js"
import * as errorController from "./controllers/errors.js"
import { mongoConnect } from "./db.js"

const __dirname = path.resolve()
const PORT = 3000
const app = express()

app.set("view engine", "pug")
app.set("views", "views") // By default its /views, no need to add it explicity if path is same

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))

app.use((req, res, next) => {
  // User.findByPk(1)
  //   .then((user) => {
  //     req.user = user;
  //     next();
  //   })
  //   .catch((err) => console.log(err));
  next()
})

app.use("/admin", adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404Page)

mongoConnect(() => {
  app.listen(PORT, () => console.log(`server is listening on ${PORT}...`))
})
