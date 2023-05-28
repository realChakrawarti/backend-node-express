import path from "path";
import fs from "fs";

const filePath = path.join(path.resolve(), "data", "cart.json");

export default class Cart {
  static addProduct(id) {
    fs.readFile(filePath, (err, fileContent) => {
      let cart = [];
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      const existingProductIndex = cart.findIndex((item) => item.id === id);
      const existingProduct = cart[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.quantity = updatedProduct.quantity + 1;
        cart[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, quantity: 1 };
        cart.push(updatedProduct);
      }
      fs.writeFile(filePath, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
  static removeItem(id) {
    fs.readFile(filePath, (err, fileContent) => {
      let cart = [];
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      const updatedCartItems = cart.filter((item) => item.id !== id);
      fs.writeFile(filePath, JSON.stringify(updatedCartItems), (err) => {
        console.log(err);
      });
    });
  }

  static getCart(cb) {
    fs.readFile(filePath, (err, fileContent) => {
      let cart = [];
      if (!err) {
        cart = JSON.parse(fileContent);
        cb(cart);
      }
    });
  }
}
