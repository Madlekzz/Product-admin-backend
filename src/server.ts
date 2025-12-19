import express from 'express'
import colors from 'colors'
import cors, { CorsOptions} from 'cors'
import morgan from 'morgan'
import { Express } from 'express'
import router from './router'
import db from './config/db'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec, { swaggerUiOptions } from './config/swagger'

// Conexion a base de datos
export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log( colors.green.bold('Conexion exitosa a la BDD'))
    } catch (error) {
        console.log( colors.red.bold('Hubo un error al conectar a la BDD'))
    }
}
connectDB()

const server: Express = express()

const corsOptions : CorsOptions = {
    origin: function(origin, callback) {
        if (origin === `${process.env.FRONTEND_URL}`) {
            callback(null, true)
        } else {
            callback(new Error('Error de CORS'))
        }
    }
}
server.use(cors(corsOptions))

server.use(morgan('dev'))
server.use(express.json())

server.use('/api/products', router)

server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))
export default server