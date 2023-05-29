import mysql from "mysql2";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "comet",
  password: "password",
});

const promisePool = pool.promise();

export default promisePool;
