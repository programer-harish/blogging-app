import React, { useState,useEffect } from 'react'
import { Col, Container, Row } from 'reactstrap'
import Base from '../components/Base'
import NewFeed from '../components/NewFeed'
import CategorySideMenu from '../components/CategorySideMenu'
import { useParams } from 'react-router-dom'
import { getPostsByCategory } from '../services/post-service'
import Post from '../components/Post'

const Categories = () => {
    const {categoryId}=useParams()
    const [posts, setPosts] = useState(null)

    useEffect(() => {
        getPostsByCategory(categoryId).then(response=>{
            console.log(response.data)
            setPosts(response.data)
        }).catch(error=>{
            console.log(error)
        })
    }, [categoryId])
    

  return (
    <Base>
      <Container className='mt-3'>
        <Row>
          <Col md={2} className='pt-5'>
            <CategorySideMenu/>
          </Col>
          <Col md={10}>
          <h1>Blogs Count ({posts?.length})</h1>
            {posts&&posts.map(post=>{
                return(
                    <Post post={post} key={post?.id} />
                )
            })}
          </Col>
        </Row>
      </Container>

    </Base>
  )
}

export default Categories