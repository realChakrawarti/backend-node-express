import db from "../db.js";

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
    return db.execute("INSERT INTO products (title) VALUES(?)", [
      this.productTitle,
    ]);
  }

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  static findById(id) {
    return db.execute("SELECT * from products WHERE products.id = ?", [id]);
  }
}
