import React, { Component } from "react";
// import AllData from "../CollectData/data";
import DistrictData from "../CollectData/districtData";
import { Map, GeoJSON } from "react-leaflet";
import { Spinner, Modal, Button } from "react-bootstrap";
import MouseTooltip from "react-sticky-mouse-tooltip";

import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import { LatLngBounds, LatLng } from "leaflet";

export default class SimpleExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 23.685,
      lng: 90.3563,
      zoom: props.width < 768 ? 6 : 7,
      map: null,
      loaded: false,
      data: null,
      max: -1,
      min: 9999999999,
      selctedName: "",
      selectedCount: "",
      modalShow: false,
      tooltipShow: false,
      tooltipName: "",
    };
    this.style = this.style.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
    this.setModalShowFalse = this.setModalShowFalse.bind(this);
    this.handleMapMouseOut = this.handleMapMouseOut.bind(this);
    this.handleMapMouseOver = this.handleMapMouseOver.bind(this);
  }

  componentDidMount() {
    fetch("/bd.min.json")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          ...this.state,
          map: data,
        });
        return DistrictData();
      })
      .then((data) => {
        let max = -1;
        let min = 9999999999;
        data.data.forEach((district) => {
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
    const found = this.state.data.data.find((district) => {
      return district.name.toLowerCase() === name.toLowerCase();
    });
    if (!found) {
      return 0;
    }
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
  }

  handleMapMouseOver(feature) {
    this.setState({
      tooltipShow: true,
      tooltipName: feature.layer.feature.properties.NAME_2,
    });
  }
  handleMapMouseOut(feature) {
    this.setState({ tooltipShow: false, tooltipName: "" });
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    const southwest = new LatLng(20.7, 87.9);
    const northeast = new LatLng(26.5, 92.6);
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
            maxZoom={10}
            minZoom={this.state.zoom}
            maxBounds={new LatLngBounds(southwest, northeast)}
          >
            <GeoJSON
              data={this.state.map}
              style={this.style}
              onClick={this.handleMapClick}
              onMouseOver={this.handleMapMouseOver}
              onMouseOut={this.handleMapMouseOut}
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
              <h5>Positive Cases in {this.state.selectedName}</h5>
              <h4>{this.state.selectedCount}</h4>
              <Button size="sm" onClick={this.setModalShowFalse}>
                Close
              </Button>
            </Modal.Body>
          </Modal>
          <MouseTooltip
            visible={this.state.tooltipShow}
            offsetY={20}
            className="rounded px-1"
            style={{
              opacity: 1,
              backgroundColor: "#000",
              color: "#fff",
              zIndex: 1000,
            }}
          >
            <div align="center">
              <span>
                <b>{this.state.tooltipName}</b>
                <br />
                Positive Cases: <b>{this.getCount(this.state.tooltipName)}</b>
              </span>
            </div>
          </MouseTooltip>
        </React.Fragment>
      );
    else
      return (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-25%, -50%)",
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
            style={{
              transform: "translateX(-25%)",
              color: "grey",
            }}
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
