import express from "express";
import bodyParser from "body-parser";
import path from "path";

import adminRoutes from "./routes/admin.js";
import shopRoutes from "./routes/shop.js";

const __dirname = path.resolve();
const PORT = 3000;
const app = express();

app.set("view engine", "pug");
app.set("views", "views"); // By default its /views, no need to add it explicity if path is same

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}...`);
});
