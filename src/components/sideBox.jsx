import React, { Component } from "react";
import AllData from "../CollectData/data";
import {
  Spinner,
  Table,
  Button,
  Badge,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import GitHubButton from "react-github-btn";
import TimeChart from "./timeChart";

export default class SideBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      data: null,
      distData: null,
      query: "",
      sortedField: "count",
      sortAscending: -1,
      timeData: null,
    };

    this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
    this.searchResults = this.searchResults.bind(this);
    this.sortDistrict = this.sortDistrict.bind(this);
    this.sortByCount = this.sortByCount.bind(this);
    this.sortByName = this.sortByName.bind(this);
  }

  componentDidMount() {
    AllData()
      .then((data) => {
        let distData = [];
        data.districts.map((district) => {
          const percent = Math.floor(
            ((district.count - district.prev_count) / district.prev_count) * 100
          );
          const color = percent > 0 ? "danger" : "success";
          const sign = percent > 0 ? "▲" : percent === 0 ? "=" : "▼";
          return distData.push({
            ...district,
            percent,
            color,
            sign,
          });
        });

        this.setState({
          data: data,
          distData: distData,
        });

        return fetch("https://pomber.github.io/covid19/timeseries.json");
      })
      .then((response) => response.json())
      .then((res) => {
        let bdData = res["Bangladesh"];
        bdData.splice(0, 46);

        let fixRecoverData = this.state.data;
        fixRecoverData.recovered.total = bdData[bdData.length - 1].recovered;
        fixRecoverData.recovered.last24 =
          bdData[bdData.length - 1].recovered -
          bdData[bdData.length - 2].recovered;

        this.setState({ timeData: bdData, data: fixRecoverData, loaded: true });
      });
  }
  selectOnMap = (distName) => {
    this.props.selectOnMap(distName);
  };

  handleSearchBarChange(event) {
    this.setState({ query: event.target.value });
  }

  searchResults(val) {
    const regex = RegExp(`${this.state.query}`, "i");
    return regex.test(val.name);
  }

  sortDistrict(a, b) {
    const { sortedField, sortAscending } = this.state;

    if (a[sortedField] < b[sortedField]) {
      return -1 * sortAscending;
    }
    if (a[sortedField] > b[sortedField]) {
      return 1 * sortAscending;
    }
    return 0;
  }

  sortByName() {
    if (this.state.sortedField === "name") {
      this.setState({
        sortAscending: this.state.sortAscending * -1,
      });
    } else {
      this.setState({ sortedField: "name", sortAscending: 1 });
    }
  }

  sortByCount() {
    if (this.state.sortedField === "count") {
      this.setState({
        sortAscending: this.state.sortAscending * -1,
      });
    } else {
      this.setState({ sortedField: "count", sortAscending: -1 });
    }
  }

  render() {
    const { data, distData, loaded, sortedField, sortAscending } = this.state;
    if (loaded)
      return (
        <div>
          <h3 align="center" className="mb-2">
            Covid-19
            <br />
            Interactive Dashboard for Bangladesh
          </h3>

          <div className="info mb-2" align="center">
            <div>
              <Button
                size="sm"
                as="a"
                href="/about"
                variant="outline-dark"
                className="p-0 px-1 mb-1"
              >
                <small className="p-0">
                  <b>About</b>
                </small>
              </Button>
            </div>
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
                  <h5 className="m-1">{data.positive.last24}</h5>
                  <small style={{ color: "grey" }}>In 24 Hours</small>
                </td>
                <td>
                  <h5 className="m-1">{data.positive.total}</h5>
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
                  <h5 className="m-1">{data.recovered.last24}</h5>
                  <small style={{ color: "grey" }}>In 24 Hours</small>
                </td>
                <td>
                  <h5 className="m-1">{data.recovered.total}</h5>
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
                  <h5 className="m-1">{data.death.last24}</h5>
                  <small style={{ color: "grey" }}>In 24 Hours</small>
                </td>
                <td>
                  <h5 className="m-1">{data.death.total}</h5>
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
                  <h5 className="m-1">{data.test.last24}</h5>
                  <small style={{ color: "grey" }}>In 24 Hours</small>
                </td>
                <td>
                  <h5 className="m-1">{data.test.total}</h5>
                  <small style={{ color: "grey" }}>Till Now</small>
                </td>
              </tr>
            </tbody>
          </Table>
          <small className="mb-4" style={{ color: "grey" }}>
            * Updated On: {new Date(data.updated_on).toUTCString()}
          </small>

          <TimeChart data={this.state.timeData} />

          <Table striped bordered hover className="mt-4 mb-0">
            <tbody>
              <tr align="center">
                <th colSpan={2}>District Wise Data</th>
              </tr>
              <tr>
                <th colSpan={2}>
                  <InputGroup className="m-0 p-0">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="search-bar">
                        <span role="img" aria-label="Search">
                          🔍
                        </span>
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      as="input"
                      onChange={this.handleSearchBarChange}
                      placeholder="Search"
                      aria-label="Search"
                      aria-describedby="search-bar"
                    />
                  </InputGroup>
                </th>
              </tr>
              <tr>
                <th onClick={this.sortByName} style={{ cursor: "pointer" }}>
                  District
                  {sortedField === "name" && sortAscending === -1 && (
                    <span style={{ float: "right" }}>⇈</span>
                  )}
                  {sortedField === "name" && sortAscending === 1 && (
                    <span style={{ float: "right" }}>⇊</span>
                  )}
                  {sortedField === "count" && (
                    <span style={{ float: "right", color: "grey" }}>⇵</span>
                  )}
                </th>
                <th onClick={this.sortByCount} style={{ cursor: "pointer" }}>
                  Positive
                  {sortedField === "count" && sortAscending === -1 && (
                    <span style={{ float: "right" }}>⇈</span>
                  )}
                  {sortedField === "count" && sortAscending === 1 && (
                    <span style={{ float: "right" }}>⇊</span>
                  )}
                  {sortedField === "name" && (
                    <span style={{ float: "right", color: "grey" }}>⇵</span>
                  )}
                </th>
              </tr>
              {distData
                .filter(this.searchResults)
                .sort(this.sortDistrict)
                .map((dist) => (
                  <tr
                    key={dist.name}
                    onMouseOver={() => this.selectOnMap(dist.name)}
                    onMouseOut={() => this.selectOnMap("")}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{dist.name}</td>
                    <td>
                      {dist.count}{" "}
                      <Badge
                        style={{
                          float: "right",
                          cursor: "pointer",
                        }}
                        variant={dist.color}
                        title={`Previous Count: ${dist.prev_count}`}
                      >
                        {dist.sign} {dist.percent}%
                      </Badge>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <small className="mb-4 mt-0" style={{ color: "grey" }}>
            * Updated On:{" "}
            {new Date(data.district_data_updated_on).toUTCString()}
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
