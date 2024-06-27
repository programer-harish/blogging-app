import React, {useEffect,useState} from 'react'
import Base from '../components/Base'
import { Button, Card, CardBody, CardText, CardTitle, Col, Container, Input, Row } from 'reactstrap'
import { Link, useParams } from 'react-router-dom'
import { loadPost } from '../services/post-service'
import { BASE_URL } from '../services/helper'
import { createComment } from '../services/comment-service'
import { toast } from 'react-toastify'
import { isLoggedIn } from '../components/auth'

const PostPage = () => {

    const {postId} =useParams()
    const [post, setPost] = useState({})
    const [comment,setComment]= useState({
        content:''
    })

    useEffect(() => {
      loadPost(postId).then(response=>{
        setPost(response.data)
      }).catch(error=>{
        console.log(error)
      })
    }, [])

    const printDate=(date)=>{
        return new Date(date).toLocaleString()
    }
    
    const handleChange=(event)=>{
        setComment({content:event.target.value})
    }

    const submitComment=()=>{
        if(!isLoggedIn())
        return toast.error("Please login to comment")
        else if(comment.content.trim()==='')
        return;
        createComment(comment,postId).then((response)=>{
            toast.success("Comment added")
            setPost({
                ...post,
                comments:[...post.comments,response.data]})
            setComment({content:''})
        }).catch(error=>{
            console.log(error)
        })
    }

  return (
    <Base>
    <Container>
        <Link to="/">Home</Link>/{post&& (<Link to="">{post.title}</Link>)}
        <Row>
            <Col md={{
                size:12
            }}>
                <Card className='mt-3 ps-2'>
                    <CardBody>
                        <CardText>Posted By <b>{post.user?.name}</b> on <b>{printDate(post.addDate)}</b></CardText>
                        <CardText className='text-muted'>{post.category?.title}</CardText>
                        <div className="divider" 
                        style={{
                            width:"100%",
                            height:"1px",
                            background:"#e2e2e2"
                        }}/>

                        <CardTitle className='mt-3' tag="h3"> {post.title}</CardTitle>

                        <div className="image-container mt-4" >

                            {post.imageName&&<img src={BASE_URL+'post/download/image/'+post.imageName}
                            className='shadow'
                            style={{width:'50%'}}
                            />}
                        </div>
                        <CardText className='mt-5' dangerouslySetInnerHTML={{__html:post.content}} />
                        


                    </CardBody>
                </Card>
            </Col>
        </Row>
        <Row className='my-4'>
                            <Col md={{
                                size:9,
                                offset:1
                            }}>
                                <h3>Comments({post.comments? post.comments.length:0})</h3>

                                {
                                    post && post.comments?.map((c,index)=>(
                                        <Card className='mt-2 border-1' key={index}>
                                            <CardBody>
                                                <CardText>
                                                    {c.content}
                                                </CardText>
                                            </CardBody>
                                        </Card>
                                    ))
                                }

                                <Card className='mt-4 border-0'>
                                    <CardBody>
                                        <Input type='textarea' onChange={(e)=>handleChange(e)}
                                        value={comment.content}
                                        placeholder='Enter comment..'/>
                                        <Button className='mt-2' color='primary' 
                                        onClick={submitComment}>Add Comment</Button>
                                    </CardBody>
                                </Card>

                            </Col>
                        </Row>
    </Container>
    </Base>
  )
}

export default PostPage