const Opportunity = require("../models/opportunity");

 
    const getOpportunities = async (req,res)=>{

        try{
            const opportunities = await Opportunity.findAll();
            res.json({
                success: true,
                count: opportunities.length,
                data: opportunities
            });
        }
        catch(error){
            console.error("Error",error);
            res.status(500).json({
                success: false,
                error: "Server error"
            });
        }
    };
    