import React, { Component } from "react";
import AllData from "../CollectData/data";
import { Map, GeoJSON } from "react-leaflet";
import { Spinner, Modal, Button } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

import "leaflet/dist/leaflet.css";

export default class SimpleExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 23.685,
      lng: 90.3563,
      zoom: 6.5,
      map: null,
      loaded: false,
      data: null,
      max: -1,
      min: 9999999999,
      selctedName: "",
      selectedCount: "",
      modalShow: false,
    };
    this.style = this.style.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
    this.setModalShowFalse = this.setModalShowFalse.bind(this);
  }

  componentDidMount() {
    fetch("/bd.json")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          ...this.state,
          map: data,
        });
        return AllData();
      })
      .then((data) => {
        let max = -1;
        let min = 9999999999;
        data.districts.forEach((district) => {
          if (max < district.count) max = district.count;
          if (min > district.count) min = district.count;
        });
        this.setState({
          ...this.state,
          data: data,
          max: max,
          min: min,
          loaded: true,
        });
      });
  }

  scale(num, in_min, in_max, out_min, out_max) {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  }

  getCount(name) {
    const found = this.state.data.districts.find((district) => {
      return district.name.toLowerCase() === name.toLowerCase();
    });
    if (!found) return 0;
    return found.count;
  }

  getFillOpacity(name) {
    const count = this.getCount(name);
    if (!count) return 0;
    return this.scale(
      Math.log10(count),
      Math.log10(this.state.min),
      Math.log10(this.state.max),
      0.3,
      1
    );
  }

  style(feature) {
    const fillOpacity = this.getFillOpacity(feature.properties.NAME_2);

    return {
      fillColor: "#e74c3c",
      weight: 1,
      opacity: 0.5,
      color: "#2c3e50",
      fillOpacity: fillOpacity,
    };
  }

  setModalShowFalse() {
    this.setState({ ...this.state, modalShow: false });
  }

  handleMapClick(feature) {
    const name = feature.layer.feature.properties.NAME_2;
    const count = this.getCount(name);
    this.setState({
      ...this.state,
      selectedName: name,
      selectedCount: count,
      modalShow: true,
    });
    this.setState({
      ...this.state,
      modalShow: true,
    });
    console.log({ name, count });
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    if (this.state.loaded)
      return (
        <React.Fragment>
          <Map
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#ecf0f1",
            }}
            center={position}
            zoom={this.state.zoom}
          >
            <GeoJSON
              data={this.state.map}
              style={this.style}
              onClick={this.handleMapClick}
            ></GeoJSON>
          </Map>
          <Modal
            show={this.state.modalShow}
            size="sm"
            aria-labelledby="data-modal"
            onHide={this.setModalShowFalse}
            centered
          >
            <Modal.Body style={{ textAlign: "center" }}>
              <h5>Total Positive in {this.state.selectedName}</h5>
              <h4>{this.state.selectedCount}</h4>
              <Button onClick={this.setModalShowFalse}>Close</Button>
            </Modal.Body>
          </Modal>
        </React.Fragment>
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
          ></Spinner>
          <span className="sr-only">Loading...</span>
          <p
            align="center"
            style={{ transform: "translateX( -25%)", color: "grey" }}
            className="mt-4"
          >
            Please wait while map loads
            <br />
            Thank You
          </p>
        </div>
      );
  }
}
