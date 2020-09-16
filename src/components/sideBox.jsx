import React, { Component } from "react";
import allData from "../CollectData/data";
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
import moment from "moment";
import AdSense from "react-adsense";

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
      dailyData: null,
      showTimeChart: true,
    };

    this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
    this.searchResults = this.searchResults.bind(this);
    this.sortDistrict = this.sortDistrict.bind(this);
    this.sortByCount = this.sortByCount.bind(this);
    this.sortByName = this.sortByName.bind(this);
  }

  componentDidMount() {
    allData()
      .then((data) => {
        let distData = [];
        data.districts.map((district) => {
          const increment = district.count - district.prev_count;

          const color =
            increment > 0 ? "danger" : increment === 0 ? "warning" : "success";
          const sign = increment > 0 ? "+" : increment === 0 ? "" : "-";
          return distData.push({
            ...district,
            increment,
            color,
            sign,
          });
        });

        this.setState({
          data,
          distData,
        });

        return fetch("https://pomber.github.io/covid19/timeseries.json");
      })
      .then((response) => response.json())
      .then((res) => {
        let bdData = res["Bangladesh"];
        bdData.splice(0, 46);

        let dailyData = bdData.map((val, index, data) => {
          if (index === 0) {
            return val;
          }
          return {
            date: val.date,
            confirmed: val.confirmed - data[index - 1].confirmed,
            deaths: val.deaths - data[index - 1].deaths,
            recovered: val.recovered - data[index - 1].recovered,
          };
        });

        this.setState({
          timeData: bdData,
          dailyData,
          loaded: true,
        });
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
    const {
      data,
      distData,
      loaded,
      sortedField,
      sortAscending,
      timeData,
      dailyData,
      showTimeChart,
    } = this.state;
    const sentData = showTimeChart ? timeData : dailyData;
    if (loaded) {
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
                href="https://github.com/KhanShaheb34/Co-ronaBD.info"
                data-icon="octicon-star"
                data-size="small"
                aria-label="Star KhanShaheb34/Co-ronaBD.info on GitHub"
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
                  Deaths
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
                  Tests
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
          {data.updated_on && (
            <small style={{ color: "grey" }}>
              • Updated {moment(data.updated_on).fromNow()}
            </small>
          )}

          <AdSense.Google
            client="ca-pub-1319935021353805"
            slot="2650934712"
            style={{ display: "block" }}
            format="auto"
            responsive="true"
          />

          <Button
            className="mt-4 mb-2"
            size="sm"
            variant="outline-secondary"
            block
            onClick={() => {
              this.setState({ showTimeChart: !this.state.showTimeChart });
            }}
          >
            {showTimeChart ? "Show Daily Cases" : "Show Cumulative Data"}
          </Button>
          <TimeChart data={sentData} />

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
                        {dist.sign} {Math.abs(dist.increment)}
                      </Badge>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          {data.districtDataUpdatedOn && (
            <small style={{ color: "grey" }}>
              • Updated {moment(data.districtDataUpdatedOn).fromNow()}
            </small>
          )}
        </div>
      );
    } else {
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
}
