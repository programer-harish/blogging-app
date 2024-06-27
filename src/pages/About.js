import React,{useContext, useEffect} from 'react'
import Base from '../components/Base';
import userContext from '../context/userContext';

const About = () => {
  const {user,setUser} = useContext(userContext);

  useEffect(() => {
    setUser({name:"Durgesh"})
  }, [])
  
  
  return (
    <Base>
    <div>This is About page</div>
    <div>Welcome {user.name}</div>
    </Base>    
  )
}

export default About;