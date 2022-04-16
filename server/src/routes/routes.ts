import {Express, Request, Response} from 'express'
import postControler from '../controllers/post.controler'
import userController from '../controllers/user.controller'
import { isAuth } from '../midleware/isAuth';


export const routes = (app: Express) => {
    app.get('/', (req: Request, res: Response) => res.send('hello world'))
    //user
    app.post('/api/user/register', userController.registerUser)
    app.post('/api/user/login', userController.loginUser)
    app.get('/api/user/author/:id', userController.findUser)

    //post
    app.post('/api/posts', postControler.createPost)
    app.get('/api/posts', postControler.getAllPosts)
    app.put('/api/posts/:id', postControler.updatePost)

    app.put('/api/posts/like/:id', isAuth, postControler.likePost)
    app.delete('/api/posts/:id', postControler.deletePost)
    app.get('/api/posts/search', postControler.searchPosts)
}