import express from "express"
import bodyParser from "body-parser"
import path from "path"

import adminRoutes from "./routes/admin.js"
import shopRoutes from "./routes/shop.js"
import * as errorController from "./controllers/errors.js"
import { connect } from "mongoose"

const __dirname = path.resolve()
const PORT = 3000
const app = express()
const URI = "mongodb://127.0.0.1:27017/comet2"

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

connect(URI)
  .then((result) => {
    app.listen(PORT, () => console.log(`server is listening on ${PORT}...`))
  })
  .catch((err) => console.log(err))
