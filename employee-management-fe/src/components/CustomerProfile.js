import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import DashboardAdmin from "./DashboardAdmin";

function CustomerProfile(props) {
  const [data, setData] = useState([]);
  const [empId, setEmpId] = useState("");
  const apiUrl = "https://localhost:44329//api/Employee/EmployeeList";

  useEffect(() => {
    debugger;
    const data = {
      EmailId: "",
      Type: "All",
    };
    axios.post(apiUrl, data).then((result) => {
      debugger;
      if (result.data.length > 0) {
        setData(result.data);
      } else {
        alert("No data available.");
      }
    });
  }, []);

  const handleSearch = () => {
    const data = {
      EmailId: empId,
      Type: empId.length > 0 ? "SE" : "All",
    };
    axios.post(apiUrl, data).then((result) => {
      debugger;
      if (result.data.length > 0) {
        setData(result.data);
      } else {
        alert("No data available.");
      }
    });
  };
  const DeleteEmployee = (id) => {
    const data = {
      EmployeeId: id,
    };
    axios.post('https://localhost:44329//api/Employee/Delete', data).then((result) => {
      const getData = {
        EmailId: "",
        Type: "All",
      };
      axios.post(apiUrl, getData).then((result) => {
        if (result.data.length > 0) {
          setData(result.data);
        } else {
          alert("No data available.");
        }
      });
      alert(result.data);
    });
    
  };

  return (
    <div className="animated fadeIn">
      <DashboardAdmin />
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> <h3> Employee Details</h3>
              <br></br>
              <input
                type="text"
                placeholder="Enter Employee ID"
                onChange={(e) => setEmpId(e.target.value)}
              />
              &nbsp;&nbsp;&nbsp;
              <button onClick={() => handleSearch()}>Search</button>
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
                    <th>Action</th>
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
                          <td>
                            <div className="btn-group">
                              <button
                                className="btn btn-warning"
                                onClick={() => DeleteEmployee(item.EmployeeId)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
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

export default CustomerProfile;
