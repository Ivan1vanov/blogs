import {Request, Response, NextFunction} from 'express'
import {AnyZodObject} from 'zod'

const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse({
                query: req.query,
                body: req.body,
                params: req.params,
            })
        } catch (error: any) {
            console.log(error)
            res.status(400).send({
                message: error.message
            })
        }
}

export default validate