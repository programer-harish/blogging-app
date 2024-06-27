import React, { useState, useEffect } from 'react'
import { Col, Row } from 'reactstrap'
import { deleteUserPost, getAllPostByPage } from '../services/post-service'
import Post from './Post'
import InfiniteScroll from 'react-infinite-scroll-component'
import { toast } from 'react-toastify'

const NewFeed = () => {
    const [posts, setPosts] = useState({
        content: [],
        totalPage: '',
        totalElements: '',
        pageSize: '',
        lastPage: false,
        pageNumber: ''
    })

    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        changePage(currentPage)
    }, [currentPage])

    const changePage=(pageNumber=0,pageSize=5)=>{
        if (pageNumber===posts.totalPage) {
            return;
        }
        else if (pageNumber<0) {
            return;
        }
        getAllPostByPage(pageNumber,pageSize).then(response => {
            setPosts({
                content: [...posts.content,...response.data.content],
                totalPage: response.data.totalPage,
                totalElements: response.data.totalElements,
                pageSize: response.data.pageSize,
                lastPage: response.data.lastPage,
                pageNumber: response.data.pageNumber
            })
        }).catch(error => {
            console.log(error)
        })
    }

    const onScrollPage=()=>{
        // console.log("scrolled")
        setCurrentPage((currentPage+1))
    }

    const deletePost=(postId)=>{
        deleteUserPost(postId).then(response=>{
          toast.success("post deleted Successfully")
          let newPosts= posts.content.filter(p=>p.id!==postId)
          setPosts({...posts,content:newPosts})
        }).catch(error=>console.log(error))
      }
    return (
        <div className="container-fluid">
            <Row>
                <Col md={
                    {
                        size: 12
                    }
                }>

                    <h1>Blogs Count ({posts?.totalElements})</h1>

                    <InfiniteScroll
                    dataLength={posts.content.length}
                    next={onScrollPage}
                    hasMore={!posts.lastPage}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p className="mt-2" style={{ textAlign: 'center' }}>
                          <b>Yay! You have seen it all</b>
                        </p>
                      }
                    >
                    {posts.content?.map(post => {
                        return <Post post={post} key={post?.id} deletePost={deletePost} />
                    })}

                    </InfiniteScroll>
                    
                    {/* <Container className='mt-3'>
                        <Pagination>
                            <PaginationItem disabled={posts.pageNumber===0}
                            onClick={()=>changePage(posts.pageNumber-1)}>
                                <PaginationLink previous>Previous</PaginationLink>

                            </PaginationItem>
                            {
                                [...Array(posts.totalPage)].map((item, index) => (
                                    
                                    <PaginationItem key={index+1} active={posts.pageNumber===index}
                                    onClick={()=>changePage(index)}>
                                        <PaginationLink >{index + 1}</PaginationLink>
                                    </PaginationItem>
                                    ))
                            }

                            <PaginationItem disabled={posts.lastPage}
                            onClick={()=>changePage(posts.pageNumber+1)}
                            >
                                <PaginationLink next>Next</PaginationLink>
                            </PaginationItem>
                        </Pagination>
                    </Container> */}
                </Col>
            </Row>


        </div>
    )
}

export default NewFeed