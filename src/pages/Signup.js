import React, {  useState } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Container, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap'
import { signUp } from '../services/user-service';
import { toast } from 'react-toastify';
import Base from '../components/Base';

const Signup = () => {

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    about: ''
  });
  const handleChange = (event, property) => {
    setInputError({
      name: '',
      email: '',
      password: '',
      about: ''
    })
    setData({ ...data, [property]: event.target.value })
  }

  const [inputError, setInputError] = useState({
    name: '',
    email: '',
    password: '',
    about: ''
  })
  const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const validateInputs = () => {
    let valid = true;
    if (data.name.trim().length < 4) {
      valid = false
      setInputError({ ...inputError, name: "Name must be minimum of 4 characters!!" })
    }
    if (!isEmail(data.email)) {
      valid = false
      setInputError({ ...inputError, email:"Please enter a valid email!"})
    }
    if (data.password.trim().length < 8) {
      valid = false
      setInputError({ ...inputError, password:"Password must be of 8 characters!"})
    }
    return valid;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateInputs()) {
      signUp(data).then((resp) => {
        toast.success("User registered Successfully!");
        resetData();
      }).catch((error) => {
        console.log(error)
        toast.error("Failure" + JSON.stringify(error.response.data))
      })
    }
  }
  const resetData = () => {
    setData({
      name: '',
      email: '',
      password: '',
      about: ''
    })
  }

  return (
    <Base>
    <Container>
      <Row className="mt-4">
        <Col sm={{ size: 6, offset: 3 }}>
          <Card color=''>
            <CardHeader>
              <h3> Fill Information to Register !!</h3>
            </CardHeader>

            <CardBody>

              <FormGroup>
                <Label for="name">Name</Label>
                <Input type="text" placeholder="Name" id="name" onChange={(e) => handleChange(e, 'name')}
                  value={data.name} invalid={ inputError.name !==''} />
                  <FormFeedback>
                    { inputError.name !==''?inputError.name:""}
                  </FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" placeholder="abc123@email.com" id="email" onChange={(e) => handleChange(e, 'email')}
                  value={data.email} invalid={ inputError.email !==''} />
                  <FormFeedback>
                    { inputError.email !==''?inputError.email:""}
                  </FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label for="name">Password</Label>
                <Input type="password" placeholder="password" id="password" onChange={(e) => handleChange(e, 'password')}
                  value={data.password} invalid={ inputError.password !==''} />
                  <FormFeedback>
                    { inputError.password !==''?inputError.password:""}
                  </FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label for="about">About</Label>
                <Input type="textarea" placeholder="about...." id="about" onChange={(e) => handleChange(e, 'about')}
                  value={data.about} style={{ height: "100px" }} />
              </FormGroup>

              <Container className="text-center">
                <Button color="dark" onClick={handleSubmit}>Register</Button>
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

export default Signup