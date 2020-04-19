import React, { Component } from "react";
import AllData from "../CollectData/data";
import { Spinner, Table } from "react-bootstrap";
import GitHubButton from "react-github-btn";

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
          <h3 align="center" className="mb-2">
            nCov-19
            <br />
            Interactive Dashboard for Bangladesh
          </h3>

          <div className="info mb-2" align="center">
            <div className="m-1 d-inline-block">
              <GitHubButton
                href="https://github.com/KhanShaheb34/nCov19-InteractiveDashboard-BD"
                data-icon="octicon-star"
                data-size="small"
                aria-label="Star KhanShaheb34/nCov19-InteractiveDashboard-BD on GitHub"
              >
                Star
              </GitHubButton>
            </div>
            <div className="m-1 d-inline-block">
              <GitHubButton
                href="https://github.com/KhanShaheb34/nCov19-InteractiveDashboard-BD/issues"
                data-icon="octicon-issue-opened"
                aria-label="Issue KhanShaheb34/nCov19-InteractiveDashboard-BD on GitHub"
              >
                Issue
              </GitHubButton>
            </div>
            <div className="m-1 d-inline-block">
              <GitHubButton
                href="https://github.com/KhanShaheb34"
                data-size="small"
                aria-label="Follow @KhanShaheb34 on GitHub"
              >
                Follow @KhanShaheb34
              </GitHubButton>
            </div>
          </div>

          <Table striped bordered hover size="sm" className="mb-0">
            <tbody align="center">
              <tr>
                <th colSpan={2} align="center">
                  Positive Cases
                </th>
              </tr>
              <tr>
                <td>
                  <h5 className="m-1">
                    {this.state.data.test_positive_24_hour}
                  </h5>
                  <small style={{ color: "grey" }}>In 24 Hours</small>
                </td>
                <td>
                  <h5 className="m-1">{this.state.data.test_positive_total}</h5>
                  <small style={{ color: "grey" }}>Till Now</small>
                </td>
              </tr>
              <tr>
                <th colSpan={2} align="center">
                  Recovered
                </th>
              </tr>
              <tr>
                <td>
                  <h5 className="m-1">{this.state.data.recovered_24_hour}</h5>
                  <small style={{ color: "grey" }}>In 24 Hours</small>
                </td>
                <td>
                  <h5 className="m-1">{this.state.data.recovered_total}</h5>
                  <small style={{ color: "grey" }}>Till Now</small>
                </td>
              </tr>
              <tr>
                <th colSpan={2} align="center">
                  Death
                </th>
              </tr>
              <tr>
                <td>
                  <h5 className="m-1">{this.state.data.death_24_hour}</h5>
                  <small style={{ color: "grey" }}>In 24 Hours</small>
                </td>
                <td>
                  <h5 className="m-1">{this.state.data.death_total}</h5>
                  <small style={{ color: "grey" }}>Till Now</small>
                </td>
              </tr>
              <tr>
                <th colSpan={2} align="center">
                  Test Conducted
                </th>
              </tr>
              <tr>
                <td>
                  <h5 className="m-1">
                    {this.state.data.test_conducted_24_hour}
                  </h5>
                  <small style={{ color: "grey" }}>In 24 Hours</small>
                </td>
                <td>
                  <h5 className="m-1">
                    {this.state.data.test_conducted_total}
                  </h5>
                  <small style={{ color: "grey" }}>Till Now</small>
                </td>
              </tr>
            </tbody>
          </Table>
          <small className="mb-4" style={{ color: "grey" }}>
            * Updated On:{" "}
            {new Date(this.state.data.lastUpdateTime).toLocaleString()}
          </small>

          <Table striped bordered hover className="mt-4">
            <tbody>
              <tr align="center">
                <th colSpan={2}>District Wise Data</th>
              </tr>
              <tr>
                <th>District</th>
                <th>Count</th>
              </tr>
              {this.state.data.districts.map((dist) => (
                <tr>
                  <td>{dist.name}</td>
                  <td>{dist.count}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <small className="mb-4" style={{ color: "grey" }}>
            * Updated On:{" "}
            {new Date(
              this.state.data.district_data_updated_on
            ).toLocaleString()}
          </small>
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
              height: "50px",
              width: "50px",
            }}
            variant="danger"
          >
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      );
  }
}
