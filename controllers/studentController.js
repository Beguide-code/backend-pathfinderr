const Student = require("../models/student");

const registerStudent = async (req,res) =>{
    try{
        const {first_name,surname,country,email,password,confirm_password,date_of_birth,cellphone,address_street,address_postal_code,address_city} = req.body;
        if(password !== confirm_password){
            return res.status(400).json({
                success: false,
                error: 'Passwords do not match'
            });
        }

        const existingStudent = await Student.findByEmail(email);
        if(existingStudent){
            return res.status(400).json({
                success: false,
                error: 'Student with is email already exist'
            });
        }

        const student = await Student.create({first_name,surname,country,email,password,date_of_birth,cellphone,address_street,address_postal_code,address_city});
        res.status(201).json({
            success: true,
            data: student
        });
    }
    catch(error){
        console.error('error in registerStudent',error);
        res.status(500).json({
                success: false,
                error: 'Server error while registering student'
    });
    }
};


const getStudentProfile = async (req,res) =>{
    try{
        const student = await Student.findById(req.params,id);
        if(!student){
            return res.status(404).json({
                success: false,
                error: 'Student not found'
            });
        }

        res.json({
            success: true,
            data: student
        });
    }
    catch(error){
        console.error('error in getStudentProfile',error);
        res.status(500).json({
                success: false,
                error: 'Server error while fetching student profile'
    });
}

};



const updateStudentProfile = async (req,res)=>{
    try{
        const student = await Student.update(req.params.id, req.body);
         if(!student){
            return res.status(404).json({
                success: false,
                error: 'Student not found'
            });
        }
        res.json({
            success: true,
            data: student
        });
    }
    catch(error){
        console.error('error in updateStudentProfile',error);
        res.status(500).json({
                success: false,
                error: 'Server error while updating student profile'
        });
    }
};

module.exports = {
    getStudentProfile,
    updateStudentProfile,
    registerStudent
};