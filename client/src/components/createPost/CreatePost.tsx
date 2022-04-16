import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import styles from './create.module.scss'
import { useDispatch } from 'react-redux';
import { createPostAction } from '../../store/actions/postActions';

const CreatePost = () => {
    const dispatch = useDispatch()

    const info = localStorage.getItem('userTask')
    const user = info !== null ? JSON.parse(info) : ''

    const [postData, setPostData] = useState({
        text: '',
        author: user ? user.userData._id : '',
    })

    const createPostHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        dispatch(createPostAction(postData))
        setPostData({
            ...postData,
            text: ''
        })
    }

  return (
    <div className={styles.container}>
        {user ? (
            <>
            <Form.Group className={styles.area} controlId="exampleForm.ControlTextarea1">
            <Form.Control 
            value={postData.text}
            onChange={(e) => setPostData({
                ...postData,
                text: e.target.value
            })}
            placeholder='Write a post' as="textarea" rows={3} />
            </Form.Group>
            <Button onClick={createPostHandler}>Create post</Button>
            </>
        ) : (
            <div>Log in to create a post</div>
        )}
    </div>
  )
}

export default CreatePost