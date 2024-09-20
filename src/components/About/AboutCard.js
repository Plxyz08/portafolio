import React from "react";
import Card from "react-bootstrap/Card";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hola a todos, mi nombre es{" "}
            <span className="purple">Sebastián Muñoz </span>
            tengo 19 años y soy de{" "}
            <span className="purple">Bucaramanga, Santander, Colombia. </span>
            <br />
            Actualmente trabajo como desarrollador de frontend en{" "}
            <span className="purple">Trascender Global.</span>
            <br />
            Completé un tecnólogo en
            <span className="purple"> Análisis y Desarrollo de Software </span>
            y estoy por comenzar la carrera de Ingeniería de Software, donde espero
            fortalecer mis conocimientos en arquitectura de software y
            desarrollo de aplicaciones escalables.
            <br />
            <br />
            Además de codificar, ¡Hay otras actividades que me encanta hacer!
          </p>

          <ul>
            <li className="about-activity">
              - Leer
            </li>
            <li className="about-activity">
              - Hacer Deporte
            </li>
            <li className="about-activity">
              - Viajar
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Haz de cada día tu obra maestra"{" "}
          </p>
          <footer className="blockquote-footer">John Wooden</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
