import express, { Request, Response } from 'express'
import { OP, Orders, OrdersModel } from '../models/orders'
import verifyAuthToken from '../middleware/auth'

const store = new OrdersModel()

//get all orders
const index = async (_req: Request, res: Response) => {
    try {
        const orders = await store.index()
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ "message": "Server Failure Cannot get Orders", "Error": error })
    }
}

//get a specific order
const show = async (req: Request, res: Response) => {
    try {
        const orders = await store.show(req.params.id)
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ "message": "Server Failure Cannot get Order or maybe its not found", "Error": error })
    }
}

//create a new order
const create = async (req: Request, res: Response) => {
    verifyAuthToken
    try {
        const order: Orders = {
            p_id: req.body.p_id,
            u_id: req.body.u_id,
            o_status: req.body.o_status
        }
        const orders = await store.create(order)
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ "message": "Server Failure Cannot Create New Order", "Error": error })
    }
}

//creat a new order's product 
const createOrderProduct = async (req: Request, res: Response) => {
    verifyAuthToken
    try {
        const op: OP = {
            quantity: req.body.quantity
        }
        const pp: Orders = {
            p_id: req.body.product_id,
            id: req.body.order_id
        }
        const ordersProduct = await store.addProducts(pp.p_id, pp.id, op.quantity)
        res.status(200).json(ordersProduct)
    } catch (error) {
        res.status(500).json({ "message": "Server Failure Cannot Create Order's Product Maybe Product not exist or Order not found", "Error": error })
    }
}

//update existed order
const edit = async (req: Request, res: Response) => {
    verifyAuthToken
    try {
        const order: Orders = {
            id: req.body.id,
            p_id: req.body.p_id,
            u_id: req.body.u_id,
            o_status: req.body.o_status
        }
        const orders = await store.edit(order)
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ "message": "Server Failure Cannot Edit Order Information", "Error": error })
    }
}

//remove existed order
const remove = async (req: Request, res: Response) => {
    verifyAuthToken
    try {
        const deleted = await store.remove(req.params.id)
        res.status(200).json(deleted)
    } catch (error) {
        res.status(500).json({ "message": "Server Failure Cannot Delete Order or maybe it not exist", "Error": error })
    }
}

//orders endpoints
const orders_routes = (app: express.Application) => {
    app.get('/orders', index)
    app.get('/orders/:id', show)
    app.post('/orders', verifyAuthToken, create)
    app.put('/orders', verifyAuthToken, edit)
    app.delete('/orders/:id', verifyAuthToken, remove)
    app.post('/orders_products', verifyAuthToken, createOrderProduct)
}

export default orders_routes