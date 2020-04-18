import React, { Component } from "react";
import { Map, GeoJSON } from "react-leaflet";
import AllData from "../CollectData/data";

import "leaflet/dist/leaflet.css";

export default class SimpleExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 23.685,
      lng: 90.3563,
      zoom: 7,
      map: null,
      loaded: false,
      data: null,
      max: -1,
      min: 9999999999,
    };
    this.style = this.style.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
  }

  componentDidMount() {
    fetch("/bd.geojson")
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
    // const count = found.count;
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

  handleMapClick(feature) {
    const name = feature.layer.feature.properties.NAME_2;
    const count = this.getCount(name);
    console.log({ name, count });
  }

  map() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map
        style={{ width: "100vw", height: "100vh", backgroundColor: "#ecf0f1" }}
        center={position}
        zoom={this.state.zoom}
      >
        {/* <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        /> */}
        <GeoJSON
          data={this.state.map}
          style={this.style}
          onClick={this.handleMapClick}
        ></GeoJSON>
      </Map>
    );
  }

  loading() {
    return <h1>Loading...</h1>;
  }

  render() {
    return this.state.loaded ? this.map() : this.loading;
  }
}
