import React, {  useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  Row,
} from "reactstrap";

function Registration(props) {
  
  const [userDetails, setUserDetails] = useState({
    EmployeeID: "",
    Name: "",
    Gender: "",
    Age: "",
    Salary: "",
    Phone: "",
    EmailId: "",
    Password: "",
  });
  const apiUrl = "https://localhost:44329//api/Employee/Registration";

  const AddNewUser = (e) => {
    e.preventDefault();
    const data = {
      EmployeeID: userDetails.EmployeeID,
      Name: userDetails.Name,
      Gender: userDetails.Gender,
      Age: userDetails.Age,
      Salary: userDetails.Salary,
      Phone: userDetails.Phone,
      EmailId: userDetails.EmailId,
      Password: userDetails.Password,
    };
    axios.post(apiUrl, data).then((result) => {     
      alert(result.data);
      setUserDetails({
        EmployeeID: "",
        Name: "",
        Gender: "",
        Age: "",
        Salary: "",
        Phone: "",
        EmailId: "",
        Password: "",
      });
    });
  };

  const onChange = (e) => {
    e.persist();
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    props.history.push("/");
  };

  const handleGender =(value) => {
    setUserDetails({ ...userDetails, [userDetails.Gender] : value });
  }

  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="12" lg="10" xl="8">
            <Card className="mx-4">
              <CardBody className="p-4">
                <Form onSubmit={AddNewUser}>
                  <h1>Employee Registration</h1>
                  <InputGroup className="mb-3">
                    <Input
                      type="text"
                      name="EmployeeID"
                      id="EmployeeID"
                      placeholder="EmployeeID"
                      value={userDetails.EmployeeID}
                      onChange={onChange}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <Input
                      type="text"
                      name="Name"
                      id="Name"
                      placeholder="Name"
                      value={userDetails.Name}
                      onChange={onChange}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    Gender : &nbsp;
                    <Input
                      type="radio"
                      name="Gender"
                      id="rbtnMale"
                      value='male'
                      onChange={onChange}  
                    /> &nbsp;&nbsp;
                    Male&nbsp;&nbsp;
                    <Input
                      type="radio"
                      name="Gender"
                      id="rbtnFemale"
                      value='female'
                      onChange={onChange}
                    /> &nbsp;&nbsp;
                    Female
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <Input
                      type="text"
                      name="Age"
                      id="Age"
                      placeholder="Age"
                      value={userDetails.Age}
                      onChange={onChange}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <Input
                      type="text"
                      name="Salary"
                      id="Salary"
                      placeholder="Salary"
                      value={userDetails.Salary}
                      onChange={onChange}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <Input
                      type="text"
                      name="Phone"
                      id="Phone"
                      placeholder="Phone"
                      value={userDetails.Phone}
                      onChange={onChange}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <Input
                      type="text"
                      name="EmailId"
                      id="EmailId"
                      placeholder="EmailId"
                      value={userDetails.EmailId}
                      onChange={onChange}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <Input
                      type="password"
                      placeholder="Password"
                      name="Password"
                      id="Password"
                      value={userDetails.Password}
                      onChange={onChange}
                    />
                  </InputGroup>

                  <CardFooter className="p-4">
                    <Row>
                      <Col xs="8" sm="4">
                        <Button
                          type="submit"
                          className="btn btn-info mb-1"
                          block
                        >
                          <span>Submit</span>
                        </Button>
                      </Col>
                      <Col xs="8" sm="4">
                        <Button
                          className="btn btn-info mb-1"
                          block
                          onClick={() => handleLogin()}
                        >
                          <span>Go to Login</span>
                        </Button>
                      </Col>
                      <Col xs="8" sm="4">
                        <Button className="btn btn-info mb-1" block>
                          <span>Cancel</span>
                        </Button>
                      </Col>
                    </Row>
                  </CardFooter>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Registration;
