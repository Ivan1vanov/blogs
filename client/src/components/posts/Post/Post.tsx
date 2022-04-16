import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import styles from './post.module.scss'
import {AiOutlineHeart} from 'react-icons/ai'
import { IPost } from '../../../store/types/postTypes';
import axios from 'axios';

import {AiFillDelete} from 'react-icons/ai'
import { useDispatch } from 'react-redux';
import { deletePostAction, likePostAction } from '../../../store/actions/postActions';

interface IPostProp {
    post: IPost
}


const Post: React.FC<IPostProp> = ({post}) => {

    const [userName, setUserName] = useState('')
    const dispatch = useDispatch()

    const info = localStorage.getItem('userTask')
    const user = info !== null ? JSON.parse(info) : ''

    useEffect(() => {
        const getName = async() => {
            const {data} = await axios.get(`http://localhost:5001/api/user/author/${post?.author}`)
        setUserName(data)
        }
        getName()
    }, [post])

    const deletePostHandler = (e: React.MouseEvent<HTMLElement>) => {
        dispatch(deletePostAction(post._id))
    }

    const likePostHandler = (e: React.MouseEvent<HTMLElement>) => {
        dispatch(likePostAction(post._id))
    }   

  return (
    <div>
        <Card className={styles.card}>
            <div className={styles.postInfoBlock}>
                {userName}
            </div>
            <div className={styles.postInfoBlock}>
                {post.text}
            </div>
            <div className={styles.actionContainer}>

            {user ? (
                <div className={styles.actionBlock} 
                onClick={likePostHandler}
                >
                    {post.likes?.find((liker: string) => liker === user?.userData._id) ? (
                        <AiOutlineHeart className={styles.likedButton}/>
                    ) : (
                    <AiOutlineHeart className={styles.unlikeButton}/>
                    )}
                    
                </div>
            ): (
                <div className={styles.actionBlock}>
                <span>Log in to like it</span>
                <AiOutlineHeart className={styles.likedButton}/>
                
                </div>
                )
            }

               
 
                <div className={styles.actionBlock}
                >
                    Likes: {post.likes ? post.likes.length : 0}
                </div>


                {post.author === user?.userData?._id && (
                <div className={styles.actionBlock}>
                <Button 
                onClick={deletePostHandler}
                variant='danger'>
                 <AiFillDelete/> DELETE
                </Button>
                </div>
                )}

               
               
            </div>
        </Card>

    </div>
  )
}

export default Post