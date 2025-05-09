import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();
const db =  mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,  
  database: process.env.DB_DATABASE,
  waitForConnections:true,
  connectionLimit:10,
  maxIdle:10,
  idleTimeout:60000,
  enableKeepAlive:true,
  keepAliveInitialDelay:0,
});

export default db;
