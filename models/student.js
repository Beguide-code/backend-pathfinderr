const { query } = require("../config/database");
const bcrypt = require("bcryptjs");

class Student{

    static async hashPassword(plainPassword){
        const saltRounds = 10;
        return await bcrypt.hash(plainPassword,saltRounds);
    }

    static async verifyPassword(enteredPassword, storedHash){
        return await bcrypt.compare(enteredPassword,storedHash);
    }

    static async create(studentData){
         const {first_name,surname,country,email,password,date_of_birth,cellphone,address_street,address_postal_code,address_city} = studentData;
         const password_hash = await this.hashPassword;
         const result = await query(
            `INSERT INTO students
            (first_name,surname,country,email,password,date_of_birth,cellphone,address_street,address_postal_code,address_city)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
            RETURNING id, first_name, surname, email, country, created_at `,
            [first_name,surname,country,email,password_hash,date_of_birth,cellphone,address_street,address_postal_code,address_city]
        );
        return result.rows[0];
    }

    static async findByEmailAndPassword(email,plainPassword){
        const result = await query(`
            SELECT * FROM students WHERE email = $1`,[email]);
        if(result.rows.length === 0)
            return null;
        const student = result.rows[0];
        const isPasswordValid = await this.verifyPassword(plainPassword, student.password_hash)
        if(!isPasswordValid)
            return null;
        const { password_hash, ...studentWithoutPassword } = student;
        return studentWithoutPassword;
    }

    static async findById(id){
        const result = await query(`SELECT first_name,surname,country,email,created_at FROM students WHERE id = $1`,
            [id]);
            return result.rows[0];
    }

    static async findByEmail(email){
        const result = await query(`SELECT first_name,surname,country,email,created_at FROM students WHERE email = $1`,
            [email]);
            return result.rows[0];
    }

    static async update(id,updateData){
        const {first_name,surname,country,email,date_of_birth,cellphone,address_street,address_postal_code,address_city}= updateData;
        const result = await query(
        `UPDATE students
         SET first_name = $1,surname = $2,country = $3,email = $4 ,date_of_birth = $5,cellphone = $6,address_street = $7,address_postal_code = $8,address_city = $9
         WHERE id = $10
         RETURNING id, first_name, surname, email, country, created_at`,
         [first_name,surname,country,email,date_of_birth,cellphone,address_street,address_postal_code,address_city,id]
        );
       
        return result.rows[0];
    }


}

module.exports = Student;