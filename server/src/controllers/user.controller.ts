import {Request, Response} from 'express'
import { User, UserDataInput, UserInterface } from '../models/user.model';
import bcrypt from 'bcryptjs'
import log from '../loger/index';
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';

const jwtTokenGenerator = (id: mongoose.ObjectId, email: string, name: string):string => {
    return jwt.sign({id, email, name}, 'sdf', {expiresIn: '24h'})
}

class UserController {
    async registerUser(req: Request, res: Response){
        const userData: UserDataInput = req.body
        
        try {
            if(!userData.name && !userData.password) {
                res.status(500).send({
                    message: 'Invalid credentials'
                })
            }

            const isExists: UserInterface | null = await User.findOne({email: userData.email})

            if(isExists) {
                res.status(500).send({
                    message: 'User already exists'
                })
            } else {
                const hashPassword = bcrypt.hashSync(userData.password, 8)

                const newUser = await User.create({name: userData.name.trim(), email: userData.email.trim(), password: hashPassword.trim()})
                await newUser.save()

                const token = jwtTokenGenerator(newUser._id, newUser.email, newUser.name)

                res.status(200).send({userData: newUser,
                token
                })
            }

        } catch (error) {
            log.error(error)
        }
}


 async loginUser(req: Request, res: Response) {
        const userData: UserDataInput = req.body

        try {
            const user: UserInterface | null = await User.findOne({email: userData.email.trim()})

            if(user) {
                const isPassword = bcrypt.compareSync(userData.password.trim(), user.password)

                if(isPassword) {
                    const token = jwtTokenGenerator(user._id, user.email, user.name)

                    res.status(200).send({

                    userData: user,
                    token
                    })

                } else {
                    

                    res.status(500).send({
                        message: 'Invalid credentials'
                    })
                }

            } else {
                res.status(500).send({
                    message: 'User does not exist'
                })
            }

        } catch (error) {
            log.error(error)
        }
}

    async findUser(req: Request, res: Response) {
        const {id} = req.params
        try {
            
            const userName = await User.findById(id)

            res.send(userName.name)

        } catch (error) {
            
        }
    }

}

export default new UserController()