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

  static update(id, title) {
    if (!title) return;
    this.fetchAll((products) => {
      const productIndex = products.findIndex((item) => item.id === id);
      const updatedProduct = [...products];
      updatedProduct[productIndex].productTitle = title;
      fs.writeFile(filePath, JSON.stringify(updatedProduct), (err) => {
        console.log(err);
      });
    });
  }

  static delete(id) {
    if (!id) return;
    this.fetchAll((products) => {
      const updatedProduct = products.filter((item) => item.id !== id);
      fs.writeFile(filePath, JSON.stringify(updatedProduct), (err) => {
        console.log(err);
      });
    });
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
