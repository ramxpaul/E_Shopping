import database from "../database"

export type Product = {
    id?: Number;
    p_name: string;
    price: Number;
    category?: string;
}



export class ProductModel {
    // index mean that its going to get a list of all the items that we have in the database
    //get a List of All Products
    async index(): Promise<Product[]> {
        try {
            const conn = await database.connect() // connect to the database (open database connection) (i can now talk to the database or its tables and make sql commands into it )
            const sql = 'SELECT * FROM product' // next i will need to run this query on the database 
            const result = await conn.query(sql) // now i ran the query on the database
            conn.release() // when u open a DB connection and did whatever u need on that DB u need to close it after all
            return result.rows // return the rows (data) contained in the result from the DB query
        } catch (error) {
            throw new Error(`Cannot get Products ${error}`)
        }
    }

    //get A specific Product with id
    async show(id: string): Promise<Product> {
        try {
            const sql = 'SELECT * FROM product WHERE id=($1)'
            const conn = await database.connect()
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`could not found Product${id} Error:${error}`)
        }
    }

    //insert new Product
    async create(p: Product): Promise<Product> {
        try {
            const conn = await database.connect()
            const sql = 'INSERT INTO product(p_name,price,category)VALUES($1,$2,$3) RETURNING *'
            const result = await conn.query(sql, [p.p_name, p.price, p.category])
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`could not add new Product ${p.p_name}. Error:${error}`)
        }
    }

    // update product
    async edit(p: Product): Promise<Product> {
        try {
            const conn = await database.connect()
            const sql = 'UPDATE product SET p_name=($2),price=($3),category=($4) WHERE id=($1) RETURNING *'
            const result = await conn.query(sql, [p.id, p.p_name, p.price, p.category])
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`could not update Product ${p.id}. Error:${error}`)
        }
    }

    // delete product
    async delete(id: string): Promise<Product> {
        try {
            const sql = 'DELETE FROM product WHERE id=($1)'
            const conn = await database.connect()
            const result = await conn.query(sql, [id])
            const product = result.rows[0]
            conn.release()
            return product
        } catch (error) {
            throw new Error(`could not delete Product ${id}. Error:${error}`)
        }
    }

}

