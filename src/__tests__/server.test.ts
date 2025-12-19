import request from 'supertest'
import server from '../server'
import db from '../config/db'
import { connectDB } from '../server'

describe('GET /api', () => {
    test('Should send back a json response', async () => {
        const res = await request(server).get('/api')

        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.body.msg).toBe('Desde API')

        expect(res.status).not.toBe(404)
        expect(res.body.msg).not.toBe('desde api')
    })
})

jest.mock('../config/db.ts')

describe('connectDb', () => {
    test('should handle database connection error', async () => {
        jest.spyOn(db, 'authenticate').mockRejectedValueOnce(new Error('Hubo un error al conectar a la BDD'))
        const consoleSpy = jest.spyOn(console, 'log')

        await connectDB()

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Hubo un error al conectar a la BDD')
        )
    })
}) 