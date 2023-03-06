import express from "express";
import bodyParser from "body-parser";

import adminRoutes from "./routes/admin.js";
import shopRoutes from "./routes/shop.js";

const PORT = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).send("<h2>Page not found</h2>");
});

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}...`);
});
