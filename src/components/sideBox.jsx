import React, { Component } from "react";
import AllData from "../CollectData/data";
import { Spinner, Table } from "react-bootstrap";

export default class SideBox extends Component {
  state = {
    loaded: false,
    data: null,
  };

  componentDidMount() {
    AllData().then((data) => {
      this.setState({
        ...this.state,
        data: data,
        loaded: true,
      });
    });
  }

  render() {
    if (this.state.loaded)
      return (
        <div>
          <h3 align="center">District Wise Data</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>District</th>
                <th>Count</th>
              </tr>
            </thead>
            {this.state.data.districts.map((dist) => (
              <tbody>
                <td>{dist.name}</td>
                <td>{dist.count}</td>
              </tbody>
            ))}
          </Table>
        </div>
      );
    else
      return (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Spinner
            animation="border"
            role="status"
            style={{
              height: "100px",
              width: "100px",
            }}
            variant="danger"
          >
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      );
  }
}
