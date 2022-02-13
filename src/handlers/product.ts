import express, { Request, Response, NextFunction } from 'express'
import { Product, ProductModel } from '../models/product'
import verifyAuthToken from '../middleware/auth'

const store = new ProductModel()

//get all products
const index = async (_req: Request, res: Response) => {
    try {
        const products = await store.index()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ "message": "Server Failure Cannot get products", "Error": error })
    }
}

//get a specific product
const show = async (req: Request, res: Response) => {
    try {
        const products = await store.show(req.params.id)
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ "message": "Server Failure Cannot get Product or Maybe That Product Not Found", "Error": error })
    }
}

//create new product
const create = async (req: Request, res: Response) => {
    verifyAuthToken
    try {
        const product: Product = {
            p_name: req.body.p_name,
            price: req.body.price,
            category: req.body.category,
        }
        const products = await store.create(product)
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ "message": "Server Failure Cannot Create New Product", "Error": error })
    }
}

//update existed product
const edit = async (req: Request, res: Response) => {
    verifyAuthToken
    try {
        const product: Product = {
            id: req.body.id,
            p_name: req.body.p_name,
            price: req.body.price,
            category: req.body.category,
        }
        const products = await store.edit(product)
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ "message": "Server Failure Cannot Edit Product Information", "Error": error })
    }
}

//delete existed product
const remove = async (req: Request, res: Response) => {
    verifyAuthToken
    try {
        const deleted = await store.delete(req.params.id)
        res.status(200).json(deleted)
    } catch (error) {
        res.status(500).json({ "message": "Server Failure Cannot Delete Product or it maybe not exist", "Error": error })
    }
}

//product endpoints
const product_routes = (app: express.Application) => {
    app.get('/product', index)
    app.get('/product/:id', show)
    app.post('/product', verifyAuthToken, create)
    app.put('/product', verifyAuthToken, edit)
    app.delete('/product/:id', verifyAuthToken, remove)
}

export default product_routes