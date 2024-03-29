import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Cart = sequelize.define("cart", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

export default Cart;
