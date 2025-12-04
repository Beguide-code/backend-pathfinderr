const Student = require("../models/student");

const loginStudent = async (req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                sucsess:false,
                error: "please provide email and password"
            });
        }
        const student = await Student.login(email,password);
        res.json({
            success:true,
            data:student
        });
    }
    catch(error){
        console.error("Login error",error);
        res.status(401).json({
            success:false,
            error: error.message || "Invalid credentials"
        });
    }
};


const getMe = async (req,res)=>{
    try{
        res.json({
            success:true,
            data: req.student
        });
    }
    catch(error){
        console.error("Get me error",error);
        res.status(500).json({
            success:false,
            error:"server error"
        });
    }
};

module.exports = {
loginStudent,
getMe
};