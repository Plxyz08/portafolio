import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";

function ProjectCards(props) {
  return (
    <Card className="project-card-view" style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.7)", 
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#ffffff", 
          fontSize: "1.5rem",
          fontWeight: "bold",
          zIndex: 2,
        }}
      >
        Pronto se agregarán más proyectos
      </div>

      <Card.Img
        variant="top"
        src={props.imgPath}
        alt="card-img"
        style={{ filter: "blur(3px)" }}
      />
      <Card.Body style={{ filter: "blur(4px)" }}>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text style={{ textAlign: "justify" }}>{props.description}</Card.Text>
        <Button variant="primary" href={props.ghLink} target="_blank" disabled>
          <BsGithub /> &nbsp;
          {props.isBlog ? "Blog" : "GitHub"}
        </Button>
        {"\n"}
        {"\n"}
        {!props.isBlog && props.demoLink && (
          <Button
            variant="primary"
            href={props.demoLink}
            target="_blank"
            style={{ marginLeft: "10px" }}
            disabled
          >
            <CgWebsite /> &nbsp;
            {"Demo"}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProjectCards;
