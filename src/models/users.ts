import database from '../database'
import bcrypt from 'bcrypt'

const pepper: string = process.env.BCRYPT_PASSWORD
const salt: string = process.env.SALT_ROUND

export type User = {
    id?: Number;
    first_name: string;
    last_name: string;
    password: string;
}

export class UsersModel {
    //get all users
    async index(): Promise<User[]> {
        try {
            const conn = await database.connect()
            const sql = 'SELECT * FROM users'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(`Cannot get Users ${error}`)
        }
    }

    //create new user function
    async create(u: User): Promise<User> {
        try {
            const conn = await database.connect()
            const sql = 'INSERT INTO users(first_name,last_name,password_digest)VALUES($1,$2,$3) RETURNING *'
            const hash = bcrypt.hashSync(u.password + pepper, parseInt(salt))
            const result = await conn.query(sql, [u.first_name, u.last_name, hash])
            const user = result.rows[0]
            conn.release()
            return user
        } catch (error) {
            throw new Error(`unable to create user (${u.first_name} ${u.last_name}) : ${error}`)
        }

    }

    //get specific user
    async show(id: string): Promise<User> {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)'
            const conn = await database.connect()
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`could not found user id : ${id} Error: ${error}`)
        }
    }


    //update user
    async edit(u: User): Promise<User> {
        try {
            const conn = await database.connect()
            const sql = 'UPDATE users SET first_name=($2),last_name=($3),password_digest=($4) WHERE id=($1) RETURNING *'
            const hash = bcrypt.hashSync(u.password + pepper, parseInt(salt))
            const result = await conn.query(sql, [u.id, u.first_name, u.last_name, hash])
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`could not update user: ${u.first_name} Error: ${error}`)
        }
    }

    //delete user
    async delete(id: string): Promise<User> {
        try {
            const conn = await database.connect()
            const sql = 'DELETE FROM users WHERE id=($1)'
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`could not delete user: ${id} Error: ${error}`)
        }
    }

    //sign in function
    async authenticate(first_name: string, last_name: string, password: string): Promise<User> {
        try {
            const conn = await database.connect()
            const sql = 'SELECT password_digest FROM users WHERE first_name=($1) AND last_name=($2)'
            const result = await conn.query(sql, [first_name, last_name])
            if (result.rows.length) {
                const user = result.rows[0]
                if (bcrypt.compareSync(password + pepper, user.password_digest)) {
                    return user
                }
            }
            throw new Error('First Name or Last Name or Password you used are Wrong')
        } catch (error) {
            throw new Error(`Error Occurred Please Try Again Shortly`)
        }
    }
}