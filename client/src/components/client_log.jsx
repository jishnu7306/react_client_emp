import { Container, Row,Form,Button,Col, FormGroup, FormLabel, FormControl,Spinner } from 'react-bootstrap'; 
import pic from "../images/client_bird.jpg"
 
 
function Clog() { 
  return ( 
    <>
<Container>
    <div class="row justify-content-center mt-2">
        <Row>
            <Col lg={4}>
            <img src={pic} style={{'width':'500px','height':'500px','borderRadius':'40% 40% 40% 40%'}}></img>

            </Col>
            <Col lg={4}>
                <Form>
                    <h3 className="text-center mb-5"><b>Client login</b></h3>
                    <FormGroup>
                        <FormLabel>e-mail</FormLabel>
                        <FormControl type='email' name='em' placeholder='Enter mail id'></FormControl>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Password</FormLabel>
                        <FormControl type='password' name='pd' placeholder='Enter password'></FormControl>
                    </FormGroup>
                    <FormGroup align='right'>
                     <Button type="submit" className='btn btn-outlinr-info-mt-3' size="lg" variant="success">Login </Button>
                    </FormGroup>
                </Form>
            </Col>

        </Row>
    </div>
</Container>
</>
  ); 
} 
 
export default Clog;