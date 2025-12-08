const { query } = require("../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


class Student{
 
    static async hashPassword(plainPassword){
        const saltRounds = 10;
        return await bcrypt.hash(plainPassword,saltRounds);
    }

    // static async verifyPassword(enteredPassword, storedHash){
    //     return await bcrypt.compare(enteredPassword,storedHash);
    // }

   

    static async create(studentData){
         const {first_name,surname,country,email,password,date_of_birth,cellphone,address_street,address_postal_code,address_city} = studentData;
         const password_hash = await this.hashPassword(password);
         const result = await query(
            `INSERT INTO students
            (first_name,surname,country,email,password_hash,date_of_birth,cellphone,address_street,address_postal_code,address_city)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
            RETURNING id, first_name, surname, email, country, created_at `,
            [first_name,surname,country,email,password_hash,date_of_birth,cellphone,address_street,address_postal_code,address_city]
        );
        return result.rows[0];
    }

    // static async findByEmailAndPassword(email,plainPassword){
    //     const result = await query(`
    //         SELECT * FROM students WHERE email = $1`,[email]);
    //     if(result.rows.length === 0)
    //         return null;
    //     const student = result.rows[0];
    //     const isPasswordValid = await this.verifyPassword(plainPassword, student.password_hash)
    //     if(!isPasswordValid)
    //         return null;
    //     const { password_hash, ...studentWithoutPassword } = student;
    //     return studentWithoutPassword;
    // }

     static async login(email,password){
        const result = await query(`
            SELECT * FROM students WHERE email = $1  
            `,[email]);
            if(result.rows.length === 0){
                throw new Error("Invalid credentials");
            }

            const student = result.rows[0];
            const isPasswordValid = await bcrypt.compare(password, student.password_hash);
           
            if(!isPasswordValid){
                throw new Error("Invalid credentials");
            }
            const token = jwt.sign({ id: student.id,email: student.email },process.env.JWT_SECRET,{ expiresIn:"30d" });
            const { password_hash, ...studentWithoutPassword } = student;
            return{
                ...studentWithoutPassword,token
            };
}

    static async findById(id){
        const result = await query(`SELECT id,first_name,surname,country,email,created_at FROM students WHERE id = $1`,
            [id]);
            return result.rows[0];
    }

    static async findByEmail(email){
        const result = await query(`SELECT first_name,surname,country,email,created_at FROM students WHERE email = $1`,
            [email]);
            return result.rows[0];
    }

    static async update(id,updateData){
        const updates = [];
        const values = [];
         
        const allowedFields = [
            'first_name','surname','country','date_of_birth','cellphone','address_street','address_postal_code','address_city'
        ];

        Object.keys(updateData).forEach((key,index)=>{
            if(allowedFields.includes(key)){

                updates.push(`${key} = $${index + 1}`);
                if(key === 'gpa')
                    values.push(parseFloat(updateData[key]));
                else if(key === 'graduation_year')
                    values.push(parseInt(updateData[key]))
                else if(key === 'interests')
                    values.push(Array.isArray(updateData[key]) ? updateData[key] : [updateData[key]]);
                else
                    values.push(updateData[key]);
            }

        });

        if(updates.length === 0){
            return await this.findById(id);
        }

        values.push(id);

        const sql = `
        UPDATE students
        SET ${updates.join(', ')}
        WHERE id = $${values.length}
        RETURNING id, first_name, surname, email, country, created_at
        `;

        const result = await query(sql,values);
        return result.rows[0];
    }


}

module.exports = Student;

