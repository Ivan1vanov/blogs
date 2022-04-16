import express, {Request, Response} from 'express'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose';
import log from './loger/index';
import config from 'config'
import { routes } from './routes/routes';
import cors from 'cors'

dotenv.config({path: __dirname+'/.env'})
const app = express()
app.use(cors({
    origin: '*'
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const PORT = process.env.PORT || config.get<number>('port')
const dbUrl = config.get<string>('dbUrl')
app.get('/', (req: Request, res: Response) => {
    res.send('hello')
})
mongoose.connect(dbUrl).then(() => {
    app.listen(PORT, () => {
        log.info('Database connected')
        log.info(`server startde on http://localhost:${PORT}`)
    })

    routes(app)
}).catch((e) => {
    log.error(e)
    process.exit(1)
})

