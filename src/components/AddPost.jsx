import React, { useState, useEffect, useRef } from 'react'
import { Button, Card, CardBody, Container, Form, Input, Label } from 'reactstrap'
import { loadAllCategories } from '../services/category-service'
import JoditEditor from 'jodit-react'
import { toast } from 'react-toastify'
import { getCurrentUserDetail } from './auth'
import { createPost, uploadPostImage } from '../services/post-service'

const AddPost = ({renderUserDashboard}) => {

    const [categories, setCategories] = useState([])
    const [post, setPost] = useState({
        title:'',
        content:'',
        category:0
    })
    const [image, setImage] = useState(null)
    const [user, setUser] = useState()
    const editor = useRef(null)
    const config ={
        placeholder:"Enter your thought..."
    }
    useEffect(() => {
        loadAllCategories().then((response) => {
            setCategories(response)
        })
        setUser(getCurrentUserDetail)
    }, [])

    const fieldChanged = (event)=>{
        setPost({...post, [event.target.name]:event.target.value})
    }

    const contentFieldChanged =(content)=>{
        setPost({...post,'content':content})
    }

    const submitPost=(event)=>{
        event.preventDefault();
        if(post.title.value==='')
        return alert("Title cannot be empty")
        else if(post.content==='')
        return alert("Content cannot be empty")
        else if(post.category===0)
        return alert("Category cannot be empty")
        post['userId']=user.id
        
        createPost(post).then((response)=>{            
            toast.success("Post saved successfully")
            setPost({
                title:'',
                content:'',
                category:0
            })
            
            renderUserDashboard()            
            if (image!==null) {
                uploadPostImage(image,response.data.id).then(response=>{
                    toast.success("Image successfully Uploaded")
                    setImage(null)
                }).error(error=>{
                    toast.error("Image upload failure")
                    console.log(error)
                })
            }
        }).catch(error=>{
            toast.error(error.response)
        })
    }
    const handleImageChange=(event)=>{
        setImage(event.target.files[0])
    }
    
    return (
        <div className="wrapper my-2">
            <Card className='shadow'>
                <CardBody>
                    <h3>Whats in your mind ?</h3>
                    {/* {JSON.stringify(post)} */}
                    <Form onSubmit={submitPost}>
                        <div className='my-3'>
                            <Label for='title'>Post Title</Label>
                            <Input type='text' id='title'
                            name='title'
                                placeholder='Enter title'
                                onChange={fieldChanged}
                                value={post.title}
                                />
                        </div>
                        <div className='my-3'>
                            <Label for='content'>Post Content</Label>
                            {/* <Input type='textarea' id='content'
                            placeholder='Enter content...'/> */}
                            <JoditEditor
                                id='content'
                                ref={editor}
                                value={post.content}
                                // config={config}
                                onChange={contentFieldChanged}
                            />

                        </div>
                        <div className="mt-3">
                            <Label for="image">Select image</Label>
                            <Input type='file' id='image' onChange={handleImageChange}></Input>
                        </div>
                        <div className='my-3'>
                            <Label for='category'>Post Category</Label>
                            <Input type='select' id='category'
                            name='category'
                             onChange={fieldChanged}
                             value={post.category}
                             >
                                <option disabled value={0}>--Select Category--</option>
                                {
                                    categories?.map((category) => {
                                        return (<option key={category.categoryId} value={category.categoryId}>
                                            {category.title}
                                        </option>)
                                    })
                                }
                            </Input>

                        </div>

                        <Container className='text-center'>
                            <Button color='primary' className='rounded-4 mx-1'>Add Post</Button>
                            <Button color='danger' className='rounded-4'>Reset Data</Button>
                        </Container>
                    </Form>
                </CardBody>
            </Card>
        </div>

    )
}

export default AddPost