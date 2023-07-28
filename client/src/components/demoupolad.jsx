import { Container, Form, Row, Col,Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import AXIOS from 'axios';
import CategoryForm from './category';

export default function demoform(){
  const formdata = new FormData();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [productName, setProductName] = useState('');
  const [productDisc, setProductDisc] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productStock, setProductStock] = useState('');
  // Add other product form state variables here

  useEffect(() => {
    // Fetch categories from the backend when the component mounts
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    AXIOS.get('http://localhost:9000/catgetdata')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleData = (event) => {
    event.preventDefault();

    // Append data to the FormData object
    formdata.append("pname", productName);
    formdata.append("disc", productDisc);
    formdata.append("prodcategory", selectedCategory);
    formdata.append("prodprice", productPrice);
    formdata.append('stock', productStock);
    console.log([...formdata]);

    // Make the API call using FormData
    AXIOS.post('http://localhost:9000/addproduct', formdata, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((res) => {
        alert(res.data.msg);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  //const handleProductSubmit = (event) => {
  //  event.preventDefault();};
    return(
        <>
        <Container>
            <Row>
                <Col>
                <h1>Product Form</h1>
                    <Form onSubmit={handleData}  encType='multipart/form-data'>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text"
                                name="pname"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Desription</Form.Label>
                            <Form.Control type="text"
                                          name="disc"
                                          value={productDisc}
                                            onChange={(e) => setProductDisc(e.target.value)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="tele" 
                                          name="prodprice"
                                          value={productPrice}
                                            onChange={(e) => setProductPrice(e.target.value)}/>
                        </Form.Group>
                        <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedCategory}
                            onChange={handleCategoryChange}>
                            <option value="" className="prodcategory">Select a category</option>
                            {categories.map((category) => (
                            <option key={category._id} value={category.category}>
                              {category.category} 
                            </option>
                  ))}
                </Form.Control>
              </Form.Group>
                        <Form.Group>
                            <Form.Label>Stock</Form.Label>
                            <Form.Control ype="text"
                                name="stock"
                                value={productStock}
                                onChange={(e) => setProductStock(e.target.value)}/>
                        </Form.Group>
                    </Form>
                    <Form.Group>
                <Button className="mt-3"type="submit" variant="primary">
                  Submit
                </Button>
              </Form.Group>
                </Col>
                <Col>
                <CategoryForm/>
                </Col>
            </Row>
        </Container>
        </>
    )
}