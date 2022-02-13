import express, { Request, Response } from 'express'
import cors from 'cors'
import product_routes from './handlers/product'
import orders_routes from './handlers/orders'
import users_routes from './handlers/users'

const app: express.Application = express()
const address: string = 'localhost:8000'
const port = 8000 || process.env

const corsOption = {
    origin: 'http://someotherdomain.com',
    optionSuccessStatus: 200
}

app.use(express.json())
app.use(cors(corsOption))


app.get('/', (_req: Request, res: Response) => {
    res.send('Hello,World!')
})

product_routes(app)
orders_routes(app)
users_routes(app)

app.listen(port, () => {
    console.log(`starting app on:${address}`)
})

export default app