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

    static async findByFilters(filters = {}){
        let sql = `SELECT * FROM opportunities WHERE is_active = true`;
        const values = [];
        let paramCount = 0;

        if(filters.type){
            paramCount++;
            sql += ` AND type_opportunity = $${paramCount}`;
            values.push(filters.type);
        }
        if(filters.country){
            paramCount++;
            sql += ` AND country_opportunity = $${paramCount}`;
            values.push(filters.country);
        }
        if(filters.major){
            paramCount++;
            sql += ` AND $${paramCount} = ANY(eligible_majors)`;
            values.push(filters.major);
        }
         if(filters.minGpa){
            paramCount++;
            sql += ` AND min_gpa <= $${paramCount}`;
            values.push(parseFloat(filters.minGpa));
        }
        sql += ' ORDER BY deadline ASC';
        const result = await query(sql,values);
        return result.rows;

    }

}

module.exports = Opportunity;