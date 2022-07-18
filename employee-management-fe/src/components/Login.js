import React, { useState } from "react";
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

function Login(props) {
  const [userDetails, setUserDetails] = useState({
    EmailId: "",
    Password: "",
  });
  const apiUrl = "https://localhost:44329//api/Employee/Login";

  const LoginUser = (e) => {
    debugger;
    e.preventDefault();
    const data = {
      EmailId: userDetails.EmailId,
      Password: userDetails.Password,
    };
    axios.post(apiUrl, data).then((result) => {
      if (result.data === "Login successful.") {
        // alert(result.data);
        localStorage.setItem("loggedUser", userDetails.EmailId);
        if (userDetails.EmailId === "admin" && userDetails.Password === "admin")
          props.history.push("/DashboardAdmin");
        else props.history.push("/Dashboard");
        //window.location.href = "/Dashboard";
      } else {
        alert(result.data);
      }
      setUserDetails({ EmailId: "", Password: "" });
    });
  };

  const onChange = (e) => {
    e.persist();
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleRegistration = () => {
    props.history.push("/Registration");
  };

  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="12" lg="10" xl="8">
            <Card className="mx-4">
              <CardBody className="p-4">
                <Form onSubmit={LoginUser}>
                  <h1>Login</h1>
                  <InputGroup className="mb-3">
                    <Input
                      type="text"
                      name="EmailId"
                      id="EmailId"
                      placeholder="Email Id"
                      onChange={onChange}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <Input
                      type="password"
                      placeholder="Password"
                      name="Password"
                      id="Password"
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
                          <span>Login</span>
                        </Button>
                      </Col>
                      <Col xs="8" sm="4">
                        <Button
                          className="btn btn-info mb-1"
                          block
                          onClick={() => handleRegistration()}
                        >
                          <span>Go to Registration</span>
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

export default Login;
