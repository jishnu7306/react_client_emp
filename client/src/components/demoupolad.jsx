import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
import AXIOS from 'axios';
import CategoryForm from './category';

export default function RegisterForm(){
    const [image, setImage] = useState({ preview: "", data: "" });
    const [fn,setfn]=useState("");
    const [eml,seteml]=useState("");
    const [pswd,setps]=useState("");
    const formdata = new FormData();

    const handleFile = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

  const handleData = (e) => {
    formdata.append("fname",fn);
    formdata.append("email",eml);
    formdata.append("password",pswd);
    formdata.append('file', image.data);
    AXIOS.post('http://localhost:9000/uploadform', formdata, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then((res) => {
      alert(res.data.msg);
    })
    .catch((error) => {
      console.error(error);
    })
  }
   return(
   <>
      <Container className="bg-body-primary">
        <h1>Registeration  Form</h1>
        <Row>
          <Col >
            <Form  >
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text"
                 name="fn"  
                 onChange={(e)=>{
                            setfn(e.target.value)}}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email"     onChange={(e)=>{
                            seteml(e.target.value)

                    }}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="pswd"   onChange={(e)=>{
                            setps(e.target.value)

                    }} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Upload photo</Form.Label>
                <Form.Control type="file" name="file"  required onChange={handleFile}/>
              </Form.Group>
              <Form.Group>
                <Button variant="primary" onClick={()=>{handleData()}} >Submit</Button>
              </Form.Group>
            </Form>
          </Col>
          <Col>
          <CategoryForm/>
          </Col>
        </Row>
      </Container>
    </>
   )
}