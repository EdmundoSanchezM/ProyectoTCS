import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { graph } from "./graph/graph";
import {
  convolucionar,
  suma,
  resta,
  Amplifi,
  Atenua,
  Relfexion,
  Despla,
  Diezma,
  Interpola,
  DFT,
} from "./graph/graph";
import "./App.css";

export default class MainSignal extends Component {
  Graficar(Element) {
    graph(Element);
  }
  Convolucion() {
    convolucionar();
  }
  Suma() {
    suma();
  }
  Resta() {
    resta();
  }
  Amplificar() {
    Amplifi();
  }
  Atenu() {
    Atenua();
  }
  Reflejo() {
    Relfexion();
  }
  Deplazamiento() {
    Despla();
  }
  Diezmaciaon() {
    Diezma();
  }
  Inperpolacion() {
    Interpola();
  }
  FFT() {
    DFT();
  }
  render() {
    return (
      <Container fluid>
        <h1 className="header">Proyecto Final</h1>
        <Row>
          <Col>
            <Form.Group controlId="formBasicEmail">
              <h3>Señal 1</h3>
              <Form.Text className="text-muted">Señal 1</Form.Text>
              <Form.Control type="text" id="sSignal1" placeholder="Señal 1" />
              <Form.Text className="text-muted">Centro de señal 1</Form.Text>
              <Form.Control
                type="text"
                id="csSignal1"
                placeholder="Centro de señal 1"
              />
              <Form.Text className="text-muted"></Form.Text>
              <Form.Check id="psSignal1" type="checkbox" label="Periodica" />
              <Button
                variant="success"
                type="submit"
                onClick={() => this.Graficar("Signal1")}
              >
                Graficar
              </Button>
            </Form.Group>
          </Col>
          <Col>
            <canvas ref="canvas" id="graph1" />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="formBasicEmail">
              <h3>Señal 2</h3>
              <Form.Text className="text-muted">Señal 2</Form.Text>
              <Form.Control type="text" id="sSignal2" placeholder="Señal 2" />
              <Form.Text className="text-muted">Centro de señal 2</Form.Text>
              <Form.Control
                type="text"
                id="csSignal2"
                placeholder="Centro de señal 2"
              />
              <Form.Text className="text-muted"></Form.Text>
              <Form.Check id="psSignal2" type="checkbox" label="Periodica" />
              <Button
                variant="success"
                type="submit"
                onClick={() => this.Graficar("Signal2")}
              >
                Graficar
              </Button>
            </Form.Group>
          </Col>
          <Col>
            <canvas ref="canvas" id="graph2" />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              as="input"
              type="button"
              variant="info"
              value="Suma"
              onClick={() => this.Suma()}
            />{" "}
            <Button
              as="input"
              type="button"
              variant="info"
              value="Resta"
              onClick={() => this.Resta()}
            />{" "}
            <Button
              as="input"
              type="button"
              variant="info"
              value="Amplificación"
              onClick={() => this.Amplificar()}
            />{" "}
            <Button
              as="input"
              type="button"
              variant="info"
              value="Atenuación"
              onClick={() => this.Atenu()}
            />{" "}
            <Button
              as="input"
              type="button"
              variant="info"
              value="Reflejo"
              onClick={() => this.Reflejo()}
            />{" "}
            <Button
              as="input"
              type="button"
              variant="info"
              value="Desplazamiento"
              onClick={() => this.Deplazamiento()}
            />{" "}
            <Button
              as="input"
              type="button"
              variant="info"
              value="Diezmación"
              onClick={() => this.Diezmaciaon()}
            />{" "}
            <Button
              as="input"
              type="button"
              variant="info"
              value="Interpolación"
              onClick={() => this.Inperpolacion()}
            />{" "}
            <br></br>
            <br></br>
            <Button
              as="input"
              type="button"
              variant="info"
              value="Convolución"
              onClick={() => this.Convolucion()}
            />{" "}
            <Button
              as="input"
              type="button"
              variant="info"
              value="FFT"
              onClick={() => this.FFT()}
            />{" "}
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="formBasicEmail">
              <h3>Señal Resultado</h3>
              <p id="t3">--.--</p>
              <p id="s3">--.--</p>
              <p id="ps3">--.--</p>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
            <Button href="resources/iniciar.exe" download>Quieres hacer esto pero con tu voz? Haz clic aqui para descargar el programa =)</Button>{' '}
            <br>
            </br>Por el momento solo esta para windows :c
            </Form.Group>
          </Col>
          <Col>
            <canvas ref="canvas" id="graph3" />
          </Col>
        </Row>
      </Container>
    );
  }
}
