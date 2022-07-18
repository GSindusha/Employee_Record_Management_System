import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import Dashboard from "./Dashboard";

function MyProfile(props) {
  const [data, setData] = useState([]);
  const apiUrl = "https://localhost:44329//api/Employee/EmployeeList";
  const[empId, setEmpId] = useState('');

  useEffect(() => {
    debugger
    const data = {
        EmailId: localStorage.getItem("loggedUser"),
        Type: 'I',
    };
    axios.post(apiUrl, data).then((result) => {
        debugger
      if (result.data.length > 0) {
        setData(result.data);
        setEmpId(result.data[0].EmployeeId);
      } else {
        alert("No data available.");
      }
    });
  }, []);

  return (
    <div className="animated fadeIn">
      <Dashboard />
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> <h3> Employee Details Page</h3>
              <br></br>
              <h3>Employee ID : {empId}</h3>
            </CardHeader>
            <CardBody>
              <Table hover bordered striped responsive size="sm">
                <thead>
                  <tr>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>Salary</th>
                    <th>Phone</th>
                    <th>EmailId</th>
                    <th>Password</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.length > 0 &&
                    data.map((item, idx) => {
                      return (
                        <tr key={idx}>
                          <td>{item.EmployeeId}</td>
                          <td>{item.Name}</td>
                          <td>{item.Gender}</td>
                          <td>{item.Age}</td>
                          <td>{item.Salary}</td>
                          <td>{item.Phone}</td>
                          <td>{item.EmailId}</td>
                          <td>{item.Password}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default MyProfile;
