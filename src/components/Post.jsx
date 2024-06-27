import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardText } from 'reactstrap'
import { getCurrentUserDetail, isLoggedIn } from './auth'

const  Post = ({post={title:"Default title",id:'1',content:"Default content data"},deletePost}) => {

  
  return (
    <Card className='border-0 shadow-sm mt-3'>
        <CardBody>
            <h3>{post.title}</h3>
            <CardText
            dangerouslySetInnerHTML={{__html:post.content.substring(0,50)+"..."}}
            >
               {/* {post.content.substring(0,10)+"..."} */}
            </CardText>

            <div>
              <Link to={"/post/"+post.id} className='btn btn-secondary'>Read More</Link>
              {
                
                // isLoggedIn()? getCurrentUserDetail().id===post.user.id?(
                <><Button tag={Link} to={"/user/updatepost/"+post.id} className='ms-2' color='primary'>Update</Button>
                <Button className='ms-2' onClick={()=>deletePost(post.id)} color='danger'>Delete</Button></>
                // ):'':''
                }
            </div>
        </CardBody>
    </Card>
  )
}

export default Post