import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsAction } from '../../store/actions/postActions'
import Post from './Post/Post'
import styles from './posts.module.scss'
import { IPost } from '../../store/types/postTypes';


const Posts = () => {

    const [currentPage, setCurrentPage] = useState({
        page: 1
    })
    const dispatch = useDispatch()

    const posts = useSelector((state: any) => state.posts)

    const clickToNextPage = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
      
        setCurrentPage({
            page: currentPage.page + 1
        })
    
    }

    useEffect(() => {
        // console.log(currentPage.page)
        dispatch(fetchPostsAction(currentPage.page))
    }, [currentPage])

  return (
    <Container className={styles.postsContainer}>
        {posts?.posts.map((post:IPost, index:number) => (
             <Post key={index} post={post}/>
        ))}
       
        <Button
        disabled={currentPage.page === posts?.numberOfPages}
        onClick={clickToNextPage}
        >More</Button>
    </Container>
  )
}

export default Posts