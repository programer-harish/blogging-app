import React, {  useState } from 'react'
import { toast } from 'react-toastify'
import { Button, Card, CardBody, CardHeader, FormFeedback, Col, Container, FormGroup, Input, Label, Row } from 'reactstrap'
import { login } from '../services/user-service';
import { doLogin } from '../components/auth';
import { useNavigate } from 'react-router-dom';
import Base from '../components/Base';


const Login = () => {

  const navigate = useNavigate();

  const [userCredentials, setUserCredentials] = useState({ username: '', password: '' });
  const [inputError, setInputError] = useState({ username: '', password: '' });

  const handleChange = (event, property) => {
    setInputError({
      username: '', password: ''
    })
    setUserCredentials({ ...userCredentials, [property]: event.target.value })
  }
  const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const validateInputs = () => {
    let valid = true;
    if (!isEmail(userCredentials.username)) {
      valid = false
      setInputError({ ...inputError, username:"Please enter a valid email!"})
    }
    else if (userCredentials.password.trim().length < 8) {
      valid = false
      setInputError({ ...inputError, password:"Password must be of 8 characters!"})
    }
    return valid;
  }
  
  const handleSubmit=(event)=>{
    event.preventDefault();
    if (validateInputs()) {
      login(userCredentials).then((data) => {
        toast.success("User Login Successfully!");
        doLogin(data,()=>{
          navigate("/user/dashboard")
        })
      }).catch((error) => {
        toast.error("Failure" + error.response.data.message)
      })
    }
  }
  const resetData = () => {
    setUserCredentials({username: '', password: ''})
  }

  return (<Base>
    <Container>
      <Row className="mt-4">
        <Col sm={{ size: 6, offset: 3 }}>
          <Card color=''>
            <CardHeader>
              <h3> Login to continue !!</h3>
            </CardHeader>

            <CardBody>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" placeholder="abc123@email.com" id="email" 
                onChange={(e) => handleChange(e, 'username')} invalid={ inputError.username !==''} value={userCredentials.username}/>
                <FormFeedback>
                  {inputError.username !== '' ? inputError.username : ""}
                </FormFeedback>
              </FormGroup>


              <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" placeholder="password" id="password" 
                onChange={(e) => handleChange(e, 'password')} invalid={ inputError.password !==''} value={userCredentials.password}/>
                <FormFeedback>
                  {inputError.password !== '' ? inputError.password : ""}
                </FormFeedback>
              </FormGroup>

              <Container className="text-center">
                <Button color="dark" onClick={handleSubmit}>Login</Button>
                <Button color="secondary" className="ms-2" onClick={resetData}>Reset</Button>
              </Container>
            </CardBody>

          </Card>
        </Col>
      </Row>

    </Container>
    </Base>
  )
}

export default Login