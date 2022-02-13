import database from "../database"

export type Orders = {
    id?: Number;
    p_id?: Number;
    u_id?: Number;
    o_status?: string;
}

export type OP = {
    quantity: Number;
}


export class OrdersModel {
    // get all orders
    async index(): Promise<Orders[]> {
        try {
            const conn = await database.connect()
            const sql = 'SELECT * FROM orders'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(`cannot get Orders ${error}`)
        }
    }

    // get specific order by id
    async show(id: string): Promise<Orders> {
        try {
            const conn = await database.connect()
            const sql = 'SELECT * FROM orders WHERE id=($1)'
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`could not found orders${id} Error:${error}`)
        }
    }

    //create new order
    async create(o: Orders): Promise<Orders> {
        try {
            const sql = 'INSERT INTO orders(p_id,u_id,o_status)VALUES($1,$2,$3) RETURNING *'
            const conn = await database.connect()
            const result = await conn.query(sql, [o.p_id, o.u_id, o.o_status])
            const orders = result.rows[0]
            conn.release()
            return orders
        } catch (error) {
            throw new Error(`could not add new orders ${o.id} of product ${o.p_id}. Error:${error}`)
        }
    }

    //Adding The Order's Products in The orders_products table
    async addProducts(product_id: Number, order_id: Number, quantity: Number): Promise<Orders | OP> {
        try {
            const conn = await database.connect()
            const sql = 'INSERT INTO products_orders(p_id,o_id,quantity)VALUES($1,$2,$3)RETURNING *'
            const result = await conn.query(sql, [product_id, order_id, quantity])
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`could not add new product ${product_id} of order ${order_id}. Error:${error}`)
        }
    }

    // update order
    async edit(o: Orders): Promise<Orders> {
        try {
            const conn = await database.connect()
            const sql = 'UPDATE orders SET p_id=($2),u_id=($3),o_status=($4) WHERE id=($1) RETURNING *'
            const result = await conn.query(sql, [o.id, o.p_id, o.u_id, o.o_status])
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`could not update Product ${o.id}. Error:${error}`)
        }
    }

    //delete exist order
    async remove(id: string): Promise<Orders> {
        try {
            const sql = 'DELETE FROM orders WHERE id=($1)'
            const conn = await database.connect()
            const result = await conn.query(sql, [id])
            const orders = result.rows[0]
            conn.release()
            return orders
        } catch (error) {
            throw new Error(`could not delete order ${id}. Error:${error}`)
        }
    }
}