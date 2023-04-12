import path from "path";
import fs from "fs";

const filePath = path.join(path.resolve(), "data", "products.json");

// const readFromFile = () => {
//   fs.readFile(filePath, (err, fileContent) => {
//     if (err) return []
//     return JSON.parse(fileContent)
//   })
// }

export default class Product {
  constructor(title) {
    this.productTitle = title;
  }

  save() {
    this.id = Date.now().toString();
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

  static findById(id, cb) {
    fs.readFile(filePath, (err, fileContent) => {
      if (err) return cb([]);
      const parsedContent = JSON.parse(fileContent);
      const product = parsedContent.find((item) => item.id === id);
      cb(product);
    });
  }
}
