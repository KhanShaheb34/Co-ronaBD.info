import React from "react";
import BDMap from "./components/BdMap";
import SideBox from "./components/sideBox";
import { Container, Row, Col } from "react-bootstrap";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import useWindowDimensions from "./utils/useWindowDimensions";

function App() {
  const { width } = useWindowDimensions();
  const [highLightCity, setHighLightCity] = React.useState("");
  const isPhone = width < 768;
  return (
    <Container fluid className="App">
      <Row style={{ backgroundColor: "#fff" }}>
        <Col
          md={8}
          style={{ height: isPhone ? "70vh" : "100vh", margin: 0, padding: 0 }}
        >
          <BDMap highLightCity={highLightCity} width={width} />
        </Col>
        <Col
          md={4}
          className="p-5 pr-4"
          style={{
            overflowY: isPhone ? null : "scroll",
            backgroundColor: "white",
            height: isPhone ? "100%" : "100vh",
            boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.3)",
          }}
        >
          <SideBox selectOnMap={(cityName) => setHighLightCity(cityName)} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
