import supertest from 'supertest'
import { ProductModel } from '../models/product'
import app from '../server'
import { UsersModel } from '../models/users'

const request = supertest(app)
const store = new ProductModel()
const storeUser = new UsersModel()

describe('Product Model Test', () => {
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
    it('create method should add a new product', async () => {
        const result = await store.create({
            p_name: 'test metal',
            price: 800,
            category: "test"
        });
        expect(result).toEqual({
            id: 1,
            p_name: 'test metal',
            price: 800,
            category: 'test'
        })
    })

    //testing index method
    it('index method should return a list of products', async () => {
        const result = await store.index()
        expect(result).toEqual([{
            id: 1,
            p_name: 'test metal',
            price: 800,
            category: 'test'
        }])
    });

    //testing show method
    it('show method should return the correct product', async () => {
        const result = await store.show("1")
        expect(result).toEqual({
            id: 1,
            p_name: 'test metal',
            price: 800,
            category: 'test'
        })
    });

    //testing update
    it('update method should update a product', async () => {
        const result = await store.edit({
            id: 1,
            p_name: 'test metal2',
            price: 500,
            category: "test2"
        });
        expect(result).toEqual({
            id: 1,
            p_name: 'test metal2',
            price: 500,
            category: 'test2'
        })
    })

})

//testing Product API Endpoints
describe('Testing Product API Endpoints', () => {
    it('Expect returning list of Products', async () => {
        const response = await request.get('/product')
        expect(response.status).toBe(200)
    })

    it('Expect returning Specific Product', async () => {
        const response = await request.get('/product/1')
        expect(response.status).toBe(200)
    })

    it('Expect Creating a New Product', async () => {
        const response = await request.post('/users')
        const token = 'Bearer ' + response.body
        const cProduct = await request.post('/product').set('Authorization', token)
        expect(cProduct.status).toBe(200)
    })
})