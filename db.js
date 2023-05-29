import { Sequelize } from "sequelize";

const DATABASE = "sqlize";
const USER = "root";
const PASSWORD = "password";
const HOST = "localhost";
const SERVER = "mysql";

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
  dialect: SERVER,
  host: HOST,
});

export default sequelize;
