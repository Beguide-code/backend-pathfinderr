const { query } = require("../config/database");

class Opportunity{
    static async findAll(){
        const result = await query(`
            SELECT * FROM opportunities
            WHERE is_active = true
            ORDER BY deadline ASC`);
            return result.rows;
    }

    static async findById(id){
        const result = await query(`
            SELECT * FROM opportunities
            WHERE id = $1 AND is_active = true
            `,[id]);
            return result.rows[0];

    }
}

module.exports = Opportunity;