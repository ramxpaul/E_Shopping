import { OrdersModel } from '../models/orders'
import supertest from 'supertest';
import app from '../server';

const request = supertest(app)
const store = new OrdersModel()

describe('Testing Orders API Endpoints', () => {
    it('Expect returning list of Orders', async () => {
        const response = await request.get('/orders')
        expect(response.status).toBe(200)
    })

    it('Expect returning Specific Order', async () => {
        const response = await request.get('/orders/1')
        expect(response.status).toBe(200)
    })
})

describe('Order Model Test', () => {
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
        expect(store.remove).toBeDefined();
    });

    //testing create method
    it('create method should add a new Order', async () => {
        const result = await store.create({
            p_id: 1,
            u_id: 1,
            o_status: "test"
        });
        expect(result).toEqual({
            id: 1,
            p_id: 1,
            u_id: 1,
            o_status: "test"
        })
    })

    //testing index method
    it('index method should return a list of Orders', async () => {
        const result = await store.index()
        expect(result).toEqual([{
            id: 1,
            p_id: 1,
            u_id: 1,
            o_status: "test"
        }])
    });

    //testing show method
    it('show method should return the correct Order', async () => {
        const result = await store.show("1")
        expect(result).toEqual({
            id: 1,
            p_id: 1,
            u_id: 1,
            o_status: "test"
        })
    });

    //testing update
    it('update method should update a Order', async () => {
        const result = await store.edit({
            id: 1,
            p_id: 1,
            u_id: 1,
            o_status: "test2"
        });
        expect(result).toEqual({
            id: 1,
            p_id: 1,
            u_id: 1,
            o_status: "test2"
        })
    })

    //testing delete method
    it('delete method should remove the correct Order', async () => {
        store.remove("1")
        const result = await store.index()
        expect(result).toEqual([])
    });
})

//Testing orders API Endpoints
describe('Testing Orders API Endpoints', () => {
    it('Expect returning list of Orders', async () => {
        const response = await request.get('/orders')
        expect(response.status).toBe(200)
    })

    it('Expect returning Specific Order', async () => {
        const response = await request.get('/orders/1')
        expect(response.status).toBe(200)
    })

    it('Expect Creating a New Order', async () => {
        const response = await request.post('/users')
        const token = 'Bearer ' + response.body
        const cOrder = await request.post('/orders').set('Authorization', token)
        expect(cOrder.status).toBe(200)
    })

})