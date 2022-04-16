import React, { useState } from 'react'
import Posts from '../../components/posts/Posts'
import { Container } from 'react-bootstrap';
import CreatePost from '../../components/createPost/CreatePost';

import styles from './home.module.scss'
import { useDispatch } from 'react-redux';
import { searchPostAction } from '../../store/actions/postActions';

const MainPage = () => {
    const dispatch = useDispatch()
    const [searchData, setSearchData] = useState('')

    const searchHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        dispatch(searchPostAction(searchData))
    }

  return (
    <Container className={styles.container}>
        <div className={styles.searchBar}>


         <form className="form-inline my-2 my-lg-0">
         <input className="form-control mr-sm-2" type="search" placeholder="Search" 
         aria-label="Search"
         onChange={(e) => setSearchData(e.target.value)}
         />

        <button className="btn btn-outline-success my-2 my-sm-0" type="submit"
        onClick={searchHandler}
        >Search</button>
        </form>


        </div>
        <CreatePost/>
        <Posts/>
    </Container>
  )
}

export default MainPage