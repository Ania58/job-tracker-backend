const pg = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const db = new pg.Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    ssl: process.env.HOST !== 'localhost' ? { rejectUnauthorized: false } : false
});

db.connect();

module.exports = db;