const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("node:path");
const opportunityRouter = require("./routes/opportunityRoutes");
const studentRouter = require("./routes/studentRoutes");
const authRouter = require("./routes/authRoutes");
const applicationRouter = require("./routes/applicationRoutes");
 
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/opportunities", opportunityRouter);
app.use("/api/students", studentRouter);
app.use("/api/auth",authRouter);
app.use("/api/applications",applicationRouter);

//route check 
app.get("/api/health",(req,res)=>{
    res.json({
        message: "Pathfinderr backend is running",
        timeStamp: new Date().toISOString()
    });
});

app.listen(PORT, (error)=>{
    if(error){
        throw error;
    }
    console.log(`The server is runnning live on PORT ${PORT}`);
});

 