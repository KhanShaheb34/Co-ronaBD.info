import React from "react";
import SimpleExample from "./components/BdMap";
import SideBox from "./components/sideBox";
import { Container, Row, Col } from "react-bootstrap";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Container fluid className="App">
      <Row style={{ height: "100vh", backgroundColor: "#ecf0f1" }}>
        <Col md={8} style={{ height: "100vh" }}>
          <SimpleExample />
        </Col>
        <Col
          md={4}
          className="p-5 pr-4"
          style={{
            overflowY: "scroll",
            backgroundColor: "white",
            height: "100vh",
            boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.3)",
          }}
        >
          <SideBox></SideBox>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
