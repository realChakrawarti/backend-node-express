import path from "path";
import fs from "fs";

const filePath = path.join(path.resolve(), "data", "products.json");

export default class Product {
  constructor(title) {
    this.productTitle = title;
  }

  save() {
    let products = [];
    fs.readFile(filePath, (err, fileContent) => {
      console.log(err);
      if (!err) {
        products = JSON.parse(fileContent);
      }
      products.push(this);
      fs.writeFile(filePath, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    fs.readFile(filePath, { encoding: "utf8" }, (err, fileContent) => {
      if (err) return cb([]);
      cb(JSON.parse(fileContent));
    });
  }
}
