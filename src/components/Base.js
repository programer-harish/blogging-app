import { Card, CardBody, CardText } from "reactstrap";
import CustomNavbar from "./CustomNavbar";

const Base=({title="Welcome! To our blogging app:)",children})=>{
    return(
        <div className="container-fluid p-0 m-0">
            <CustomNavbar/>

            {children}

            {/* below is footer */}
            <Card style={{backgroundColor:'#212529', minHeight:'50px', position:'absolute', width:'100%'}}>
                <CardBody>
                    <CardText style={{color:'white',textAlign:'center'}}>Blogg App</CardText>
                </CardBody>

            </Card>
        </div>
    )
}

export default Base;