import {Request, Response} from 'express'
import { Post, PostInputData } from '../models/post.model';
import log from '../loger/index';



class PostController {
    async createPost(req: Request, res: Response) {
        const data: PostInputData = req.body

        try {
            
            const newPost = await Post.create({text: data.text, author: data.author})
            await newPost.save()

            res.status(201).send({
                post: newPost
            })

        } catch (error) {
            log.error(error)
        }
    }

    async getAllPosts(req: Request, res: Response) {
        const {page} = req.query
        try {

            const LIMIT: number = 3
            const startIndex: number = (Number(page) - 1) * LIMIT
            const total = await Post.countDocuments()

            const posts = await Post.find({}).sort({_id: -1}).limit(LIMIT * Number(page))

            res.status(200).send({
                posts,
                currentPage: Number(page), 
                numberOfPages: Math.ceil(total / LIMIT)
            })
        } catch (error) {
            log.error(error)
        }
    }

    async deletePost(req: Request, res: Response) {
        const {id} = req.params

        try {
            const post = await Post.findByIdAndDelete(id)

            res.status(200).send({post: post})
        } catch (error) {
            log.error(error)
        }
    }

    async updatePost(req: Request, res:Response) {
        const {text} = req.body
        const {id} = req.params

        try {
            
            const post = await Post.findByIdAndUpdate(id, {text: text}, {new: true})

            res.status(200).send({post: post})
        } catch (error) {
            log.error(error)
        }
    }

    async searchPosts(req: Request, res: Response) {

        interface Query {
            text: string
        }

        const {text} = req.query as unknown as Query
        console.log(text)
        const textExp = new RegExp(text, 'i')

        try {
            const posts = await Post.find({text: {$regex: textExp}})

            res.status(200).send({
                posts: posts
            })


        } catch (error) {
            log.error(error)
        }
    }

    async likePost(req: any, res: Response) {
        const {id} = req.params
        try {
            
            if(!req.userId) {
                res.status(400).json({message: 'Unauthenticated'})
            } else {
                const post = await Post.findById(id)
                const index = await post.likes.findIndex((id: string) => id === String(req.userId))
    
                if(index === -1) {
                    post.likes.push(req.userId)
                } else {
                    post.likes = post.likes.filter((id: string) => id !== String(req.userId))
                }
    
                const updatedPost = await Post.findByIdAndUpdate(id, post, {new: true})
    
                res.status(201).json(updatedPost)
            }

        } catch (error) {
            console.log(error)
        }
    }

}

export default new PostController()