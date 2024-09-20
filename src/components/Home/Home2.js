import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";
import Particle from "../Particle";
import {
  AiFillGithub,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Particle />
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              DÉJAME<span className="purple"> PRESENTARME </span> UN POCO
            </h1>
            <p className="home-about-body">
              Soy un apasionado del desarrollo de software, especializado en
              <i>
                <b className="purple"> Frontend </b>
              </i>
              con tecnologías como
              <i>
                <b className="purple"> React.js, Vue.js, Quasar </b>
              </i>
              y
              <i>
                <b className="purple"> Tailwind CSS.</b>
              </i>
              <br />
              <br />
              También tengo experiencia en
              <i>
                <b className="purple"> Backend </b>
              </i>
              utilizando
              <i>
                <b className="purple"> Node.js, Next.js y Express, </b>
              </i>
              así como en bases de datos como
              <i>
                <b className="purple"> MongoDB </b>
              </i>
              y
              <i>
                <b className="purple"> MySQL.</b>
              </i>
              <br />
              <br />
              Trabajo con herramientas como
              <i>
                <b className="purple"> Figma, GitHub y VSCode, </b>
              </i>
              aplicando metodologías ágiles como
              <i>
                <b className="purple"> Scrum </b>
              </i>
              y
              <i>
                <b className="purple"> Jira </b>
              </i>
              para gestionar proyectos de manera eficiente.
              <br />
              <br />
              Mi objetivo es siempre crear productos digitales que ofrezcan una
              excelente experiencia de usuario y soluciones tecnológicas
              innovadoras.
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>ÉNCUENTRAME EN</h1>
            <p>
              No dudes en <span className="purple">contactarte </span>conmigo
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                href="https://github.com/Plxyz08"
                target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                href="https://www.linkedin.com/in/sebastian-aparicio00"
                target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
