require("dotenv").config();
const { initializeDatabase } =  require("./database");

const initDB = async ()=>{
    try{
        console.log("starting initialization");
        await initializeDatabase();
        console.log("Database initialized successfully");
        process.exit(0);
    }
    catch(error){
        console.log("Database initialized failed", error);
        process.exit(1);
    }
};

initDB();

