import  express  from 'express';
import colors from 'colors';
import cors, { CorsOptions} from 'cors'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express';
import swaggerSpec, {swaggerUiOptions} from './config/swagger'
import router from './router';
import db from './config/db'

export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        //console.log(colors.blue('Conección Exisitosa a la DB'))        
    } catch (error) {
        //console.log(error)
        console.log(colors.red.bold('Error al conectar a la DB'))
    }
     
}

connectDB()

//Instancia de Express
const server = express()

//Permitir conexiones

const corsOption: CorsOptions ={
    origin: function(origen, callback){
        if(origen === process.env.FRONTEND_URL){
            callback(null, true)
        } else { 
            callback(new Error('Error de cors'))
        }
    }
}
server.use(cors(corsOption))

//Leera Datos
server.use(express.json())

server.use(morgan('dev'))

server.use('/api/products', router)

//Docs 
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))


export default server