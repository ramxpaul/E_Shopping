import express, { Request, Response } from 'express'
import { User, UsersModel } from '../models/users'
import jwt from 'jsonwebtoken'
import verifyAuthToken from '../middleware/auth'

const store = new UsersModel()

// get all users 
const index = async (_req: Request, res: Response) => {
    try {
        const users = await store.index()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ "message": "Server Failure Cannot get Users", "Error": error })
    }
}

//get a specific user
const show = async (req: Request, res: Response) => {
    try {
        const user = await store.show(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ "message": "Server Failure or Maybe User not Found", "Error": error })
    }
}

// create a new user with token generate
const create = async (req: Request, res: Response) => {
    try {
        const user: User = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password
        }
        const newUser = await store.create(user)
        let token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET)
        res.status(200).json(token)
    } catch (error) {
        res.status(500).json({ "message": "Server Failure Cannot create new Users", "Error": error })
    }
}

//update user with token
const edit = async (req: Request, res: Response) => {
    verifyAuthToken
    try {
        const user: User = {
            id: req.body.id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password
        }
        const users = await store.edit(user)
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ "message": "Server Failure Cannot edit Users information", "Error": error })
    }
}

// delete user with token
const remove = async (req: Request, res: Response) => {
    verifyAuthToken
    try {
        const deleted = await store.delete(req.params.id)
        res.status(200).json(deleted)
    } catch (error) {
        res.status(500).json({ "message": "Server Failure Cannot delete User or maybe user not found", "Error": error })
    }
}

//login
const login = async (req: Request, res: Response) => {
    const user: User = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password
    }

    try {
        const log = await store.authenticate(user.first_name, user.last_name, user.password)
        let token = jwt.sign({ user: log }, process.env.TOKEN_SECRET)
        res.status(200).json(token)
    } catch (error) {
        res.status(500).json({ "message": "Server Failure Cannot login to the server", "Error": error })
    }
}

//user endpoints
const users_routes = (app: express.Application) => {
    app.get('/users', index)
    app.post('/users', create)
    app.get('/users/:id', show)
    app.put('/users', verifyAuthToken, edit)
    app.delete('/users/:id', verifyAuthToken, remove)
    app.post('/users/login', login)
}

export default users_routes
