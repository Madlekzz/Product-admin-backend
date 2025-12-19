import request from 'supertest'
import server from '../../server'

const validId = 1
const nonExistantId = 69

describe('POST /api/products', () => {
    test('Should display validation errors', async () => {
        const response = await request(server).post('/api/products').send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(4)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })
    test('Should validate that price is greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: "Monitor - Testing",
            price: 0
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })
    test('Should validate that price is a number and greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: "Monitor - Testing",
            price: "Hola"
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(2)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(1)
    })
    test('should create a new product', async () => {
        const response = await request(server).post('/api/products').send({
            name: "Mouse - Testing",
            price: 300
        })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('errors')
    })
})

describe('GET /api/products', () => {
    test('Should check if /api/products url exists', async () => {
        const response = await request(server).get('/api/products')

        expect(response.status).not.toBe(404)
    })
    test('Should return a list of all the products', async () => {
        const response = await request(server).get('/api/products')

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)
        expect(response.body).not.toHaveProperty('errors')
        expect(response.status).not.toBe(404)
    })
})
describe('GET /api/products/:id', () => {
    test('Should return the properties of specified product', async () => {
        const response = await request(server).get(`/api/products/${validId}`)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')

        expect(response.body).not.toHaveProperty('errors')
        expect(response.status).not.toBe(404)
    })
    test('Should check if product id exists', async () => {
        const response = await request(server).get(`/api/products/${nonExistantId}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no Encontrado')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
    test('Should check if specified id is valid', async () => {
        const response = await request(server).get('/api/products/not-valid-id')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID no válido')

        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty('data')
    })
})

describe('PUT /api/products/:id', () => {
    test('Should display validation errors', async () => {
        const response = await request(server).put(`/api/products/${validId}`).send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(4)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })
    test('Should check if specified id is valid', async () => {
        const response = await request(server).put('/api/products/not-valid-id').send({
            name: 'Monitor que ya no es curvo',
            price: 150
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('ID no válido')
        
        expect(response.status).not.toBe(200)
    })
    test('Should check if specified id exists', async () => {
        const response = await request(server).put(`/api/products/${nonExistantId}`).send({
            name: 'Monitor que ya no es curvo',
            price: 150,
            availability: true
        })
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no Encontrado')
        
        expect(response.status).not.toBe(200)
    })
    test('Should return the properties of the updated product', async () => {
        const response = await request(server).put(`/api/products/${validId}`).send({
            name: 'Monitor que ya no es curvo',
            price: 150,
            availability: true
        })
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        
        expect(response.status).not.toBe(400)
    })
    test('Should check if price is numeric', async () => {
        const response = await request(server).put(`/api/products/${validId}`).send({
            name: 'Monitor que ya no es curvo',
            price: "hola"
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        
        expect(response.status).not.toBe(404)
    })
    test('Should check if price is greater than 0', async () => {
        const response = await request(server).put(`/api/products/${validId}`).send({
            name: 'Monitor que ya no es curvo',
            price: 0
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('El precio debe ser mayor a 0')
        
        expect(response.status).not.toBe(404)
    })
    test('Should check if availability has valid value', async () => {
        const response = await request(server).put(`/api/products/${validId}`).send({
            name: 'Monitor que ya no es curvo',
            price: 100,
            availability: 'hola'
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('Valor para disponibilidad no válido')
        
        expect(response.status).not.toBe(404)
    })
})

describe('PATCH /api/products/:id', () => {
    test('Should check if specified id is valid', async () => {
        const response = await request(server).patch('/api/products/not-valid-id')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('ID no válido')
        
        expect(response.status).not.toBe(200)
    })
    test('Should check if specified id exists', async () => {
        const response = await request(server).patch(`/api/products/${nonExistantId}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no Encontrado')
        
        expect(response.status).not.toBe(200)
    })
    test('Should return the properties of the updated product', async () => {
        const response = await request(server).patch(`/api/products/${validId}`)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        
        expect(response.status).not.toBe(400)
    })
})

describe('DELETE /api/products/:id', () => {
    test('Should check if specified id is valid', async () => {
        const response = await request(server).delete('/api/products/not-valid-id')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('ID no válido')
    })
    test('Should check if specified id exists', async () => {
        const response = await request(server).delete(`/api/products/${nonExistantId}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no Encontrado')
    })
    test('Should return feedback when product is succesfully deleted', async () => {
        const response = await request(server).delete(`/api/products/${validId}`)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toBe('Producto eliminado de la base de datos.')
    })
})