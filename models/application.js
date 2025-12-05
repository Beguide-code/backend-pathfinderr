const { query } = require("../config/database");

class Application{
    static async create(studentId, opportunityId, status = "interested",notes = " "){
        const result = await query(`
            INSERT INTO applications (student_id, opportunity_id, status_application, notes)
            VALUES ($1,$2,$3,$4)
            RETURNING *
            `,[studentId,opportunityId,status,notes]);
            return result.rows[0];
    }

    static async findByStudentId(studentId){
        const result = await query(`
            SELECT a.*,o.title,o.organization,o.deadline,o.type_opportunity,o.link
            FROM applications a
            JOIN opportunities o ON a.opportunity_id = o.id
            WHERE a.student_id = $1
            ORDER BY a.created_at DESC
            `,[studentId]);
            return result.rows;
    }

    static async findById(id){
        const result = await query(`
            SELECT a.*,o.title,o.organization 
            FROM applications a
            JOIN opportunities o ON a.opportunity_id = o.id
            WHERE a.id = $1
            `,[id]);
            return result.rows[0];
    }

    static async update(id,updateData){
        const {status_application, notes, application_date} = updateData;
        const result = await query(`
            UPDATE applications
            SET status_application = COALESCE($1,status_application),
                notes = COALESCE($2,notes),
                application_date = COALESCE($3, application_date),
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $4
            RETURNING *
            `,[status_application, notes, application_date,id]);
            return result.rows[0];
    }

    static async delete(id){
        const result = await query(`
            DELETE FROM applications WHERE id = $1
            RETURNING *
            `,[id]);
            return result.rows[0];
    }

    static async exists(studentId,opportunityId){
        const result = await query(`
            SELECT id FROM applications WHERE student_id = $1 AND opportunity_id = $2
            `,[studentId,opportunityId]);
        return result.rows.length > 0;
    }
}

module.exports = Application;