import React, { useState,useEffect } from 'react'
import Base from '../../components/Base'
import { Card, CardBody, Col, Container, Row, Table } from 'reactstrap'
import { getCurrentUserDetail } from '../../components/auth'

const ProfileInfo = () => {
const [user, setUser] = useState(null)

useEffect(() => {
  setUser(getCurrentUserDetail())
}, [])



  return (
    <Base>
    <Row>
      <Col md={{size:8,offset:2}}>
      <Card className='mt-2 border-0 rounded-1 shadow-sm'>
        <CardBody>
          <h3 className='test-uppercase'>User Information</h3>
          <Container className='text-center'>
            <img style={{maxWidth:'200px',maxHeight:'200px'}} className='img-fluid rounded-circle' src='https://wallpapers.com/images/hd/default-profile-picture-finding-the-unfound-tyhvtmi1l0p3wueq.jpg' alt='loading image'/>
          </Container>
          {user?(<Table responsive striped hover className='mt-5' bordered={true}>
            <tbody className='text-center'>
              <tr>
                <th>User Id</th>
                <td>{user.id}</td>
              </tr>
              <tr>
                <th>Name</th>
                <td>{user.name}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{user.email}</td>
              </tr>
              <tr>
                <th>About</th>
                <td>{user.about}</td>
              </tr>
              <tr>
                <th>Role</th>
                <td>{user.roles.map(role=>{
                  return (
                    <span key={role.id}>{role.name}</span>
                    )
                })}</td>
              </tr>
            </tbody>
          </Table>):"Loading User profile"
          }
        </CardBody>
      </Card>
      </Col>
    </Row>
    </Base>
  )
}

export default ProfileInfo