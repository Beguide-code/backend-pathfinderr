const Application = require("../models/application");

const createApplication = async (req,res)=>{
    try{
        const { opportunity_id, status_application, notes } = req.body;
        const student_id = req.student.id;

        if(!opportunity_id){
            return res.status(400).json({
                success:false,
                error: "Opportunity ID is required"
            });
        }
        const exists = await Application.exists(student_id,opportunity_id);
        if(exists){
            return res.status(400).json({
                success:false,
                error: "You already have an application for this opportunity"
            });
        }

        const application = await Application.create(student_id,opportunity_id,status_application || "interested",notes || "");
        res.status(201).json({
            success:true,
            data: application
        });
    }
    catch(error){
        console.error("Create application error",error);
        res.status(500).json({
            success:false,
            error:"Server error while saving opportunity"
        });
    }
};

const getStudentApplications = async (req,res)=>{
    try{
        const applications = await Application.findByStudentId(req.student.id);
        res.json({
            success:true,
            count:applications.length,
            data:applications
        });
    }
    catch(error){
        console.error("Get applications error",error);
        res.status(500).json({
            success:false,
            error:"Server error fetching getting applications"
        });
    }
};


const updateApplication = async (req,res)=>{
    try{
        const { id } = req.params;
        const student_id = req.student.id

        const application = await Application.findById(id);
        if(!application){
            return res.status(404).json({
                success: false,
                error:"Application not found"
            });
        }

        if(application.student_id !== student_id){
            return res.status(403).json({
                success:false,
                error:"Not authorized to update this application"
            });
        }
        const updated = await Application.update(id,req.body);
        res.json({
            success:true,
            data:updated
        });
    }
    catch(error){
        console.error("Updated application error",error);
        res.status(500).json({
            success:false,
            error:"Server error while updating"
        });
    }
};

const deleteApplication = async (req,res)=>{
    try{
        const {id} = req.params;
        const student_id = req.student.id;

        const application = await Application.findById(id);
        if(!application){
            return res.status(404).json({
                success: false,
                error:"Application not found"
            });
        }
        if(application.student_id !== student_id){
            return res.status(403).json({
                success:false,
                error:"Not authorized to delete this application"
            });
        }

        const deleted = await Application.delete(id);
        res.json({
            success:true,
            data:deleted,
            message:"Application removed successfully"
        });
    }
    catch(error){
        console.error("Deletion Application error",error);
        res.status(500).json({
            sucess:false,
            error:"Server error while deleting"
        });
    }
};

module.exports = {
    createApplication,
    getStudentApplications,
    updateApplication,
    deleteApplication
};
