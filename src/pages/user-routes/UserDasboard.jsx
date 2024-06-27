import React, { useState,useEffect } from 'react'
import Base from '../../components/Base'
import AddPost from '../../components/AddPost'
import { Container } from 'reactstrap'
import { deleteUserPost, getPostsOfUser } from '../../services/post-service'
import { getCurrentUserDetail } from '../../components/auth'
import Post from '../../components/Post'
import { toast } from 'react-toastify'

const UserDasboard = () => {

  const [posts, setPosts] = useState([{
    id:'1',
    title:'',
    user:'',
    content:''
  }])
  const [renderFlag, setRenderFlag] = useState(1)

  const getUserPosts=()=>{
    let currentUser=getCurrentUserDetail();
    getPostsOfUser(currentUser.id).then(response=>{
      setPosts(response.data)
    }).catch(error=>console.log(error))
  }
  useEffect(() => {
    getUserPosts()
  }, [renderFlag])

  const renderUserDashboard=()=>{
    setRenderFlag(renderFlag+1)
  }
  const deletePost=(postId)=>{
    deleteUserPost(postId).then(response=>{
      toast.success("post deleted Successfully")
      let newPosts= posts.filter(p=>p.id!==postId)
      setPosts(newPosts)
    }).catch(error=>console.log(error))
  }
  return (
    <Base>
      <Container>
        {/* creating render dashboard and giving to AddPost
        to render UserDashboard after add new post to list */}
        <AddPost renderUserDashboard={renderUserDashboard} />
        <h1>Your Posts({posts.length}) </h1>
        {
          posts&&(posts.map(post=>{
            return(
              <Post post={post} key={post.id} deletePost={deletePost} />
            )
          }))
        }
      </Container>

    </Base>
  )
}

export default UserDasboard