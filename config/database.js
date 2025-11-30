const { Pool } = require("pg");
const path = require("node:path");
const fs = require("fs");

const pool= new Pool({
    user: process.env.BD_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
});

const initializeDatabase = async () =>{
    try{
        const schemaPath = path.join(__dirname, "../database/schema.sql");
        const schemaSQL = fs.readFileSync(schemaPath, "utf8");
        await pool.query(schemaSQL);
        console.log("Database schema created successfully");

        const seedPath = path.join(__dirname, "../database/seed.sql");
        const seedSQL = fs.readFileSync(seedPath, "utf8");
        await pool.query(seedSQL);
        console.log("Sample data inserted successfully");

    }
    catch(error){
        console.error("Database initialization failed:",error);
    }
};

module.exports = {
    query: (text,params) => pool.query(text,params),
    pool,
    initializeDatabase
};