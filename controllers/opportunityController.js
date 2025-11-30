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

const getOpportunityById = async (req,res)=>{
    try{
            const opportunity =  await Opportunity.findById(req.params.id);
            if (!opportunity){
                return res.status(404).json({
                        success: false,
                        error: "Opportunity not found"
                    });
            }
            res.json({
                success: true,
                data: opportunity
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

const getOpportunitiesByFilters = async (req,res) =>{
        try{
            const opportunities = await Opportunity.findByFilters(req.query);
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

module.exports  = {
    getOpportunities,
    getOpportunityById,
    getOpportunitiesByFilters
};
    