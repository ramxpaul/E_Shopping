import bcrypt from 'bcrypt';
import { UsersModel } from '../models/users'
import database from '../database'
import supertest from 'supertest'
import app from '../server';

const request = supertest(app)
const store = new UsersModel()

describe('User Model Test', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have an create method', () => {
        expect(store.create).toBeDefined();
    });

    it('should have an update method', () => {
        expect(store.edit).toBeDefined();
    });

    it('should have an delete method', () => {
        expect(store.delete).toBeDefined();
    });

    //testing create method
    it('create method should add a new User', async () => {
        const result = await store.create({
            first_name: "ramy",
            last_name: "nassem",
            password: "123"
        })
        const pepper: string = process.env.BCRYPT_PASSWORD
        const conn = await database.connect()
        const sql = 'SELECT password_digest FROM users WHERE first_name=($1) AND last_name=($2)'
        const test = await conn.query(sql, [result.first_name, result.last_name])
        if (test.rows.length) {
            const user = test.rows[0]
            if (bcrypt.compareSync(result.password + pepper, user.password_digest)) {
                expect(result).toEqual({
                    id: 1,
                    first_name: "ramy",
                    last_name: "nassem",
                    password: user.password_digest
                })
            }

        }
    })

    //testing index method
    it('index method should return a list of Users', async () => {
        const result = await store.index()
        const pepper: string = process.env.BCRYPT_PASSWORD
        const conn = await database.connect()
        const sql = 'SELECT password_digest FROM users WHERE first_name=($1) AND last_name=($2)'
        const test = await conn.query(sql, [result[0].first_name, result[0].last_name])
        if (test.rows.length) {
            const user = test.rows[0]
            if (bcrypt.compareSync(result[0].password + pepper, user.password_digest)) {
                expect(result).toEqual([{
                    id: 1,
                    first_name: "ramy",
                    last_name: "nassem",
                    password: user.password_digest
                }])
            }

        }
    });

    //testing show method
    it('show method should return the correct User', async () => {
        const result = await store.show('1')
        const conn = await database.connect()
        const sql = 'SELECT password_digest FROM users WHERE id=1'
        const test = await conn.query(sql)
        if (test.rows.length) {
            const user = test.rows[0]
            if (bcrypt.compareSync(test.rows[0].password_digest, user.password_digest)) {
                expect(result).toEqual({
                    id: 1,
                    first_name: "ramy",
                    last_name: "nassem",
                    password: user.password_digest
                })
            }

        }
    });

    //testing update
    it('update method should update a User', async () => {
        const result = await store.edit({
            first_name: "ramy2",
            last_name: "nassem2",
            password: "123"
        })
        const conn = await database.connect()
        const sql = 'SELECT password_digest FROM users WHERE id=1'
        const test = await conn.query(sql)
        if (test.rows.length) {
            const user = test.rows[0]
            if (bcrypt.compareSync(test.rows[0].password_digest, user.password_digest)) {
                expect(result).toEqual({
                    id: 1,
                    first_name: "ramy2",
                    last_name: "nassem2",
                    password: user.password_digest
                })
            }

        }
    })

})

//Testing Orders API Endpoints
describe('Testing Users API Endpoints', () => {
    it('Expect returning list of Users', async () => {
        const response = await request.get('/users')
        expect(response.status).toBe(200)
    })

    it('Expect returning Specific User', async () => {
        const response = await request.get('/users/1')
        expect(response.status).toBe(200)
    })

    it('Expect Creating a New User', async () => {
        const response = await request.post('/users')
        expect(response.status).toBe(200)
    })

})
