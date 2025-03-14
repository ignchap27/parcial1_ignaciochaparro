import React from 'react';
import { Card, Image } from 'react-bootstrap';

function RobotCard({ robot }) {
  return (
    <Card className="h-100 mb-4">
      <Card.Header as="h5">{robot.nombre}</Card.Header>
      <Card.Body>
        <Image src={robot.imagen} alt={robot.nombre} fluid />
        <Card.Text>
          <strong>Año de fabricación:</strong> {robot.añoFabricacion}
          <br />
          <strong>Capacidad de Procesamiento:</strong> {robot.capacidadProcesamiento}
          <br />
          <strong>Humor:</strong> {robot.humor}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default RobotCard;