const products = [];

export default class Product {
  constructor(title) {
    this.productTitle = title;
  }

  save() {
    products.push(this);
  }

  static fetchAll() {
    return products;
  }
}
