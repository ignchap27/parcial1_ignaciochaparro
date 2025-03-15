import React from 'react';
import { Card, Image } from 'react-bootstrap';

function RobotCard({ robot }) {

  // Function to convert GitHub URLs to raw format
  const getRawImageUrl = (url) => {
    return url.replace('github.com', 'raw.githubusercontent.com')
                .replace('/blob/', '/');
  };

  const imageUrl = getRawImageUrl(robot.imagen);

  return (
    <Card className="h-100 mb-4">
      <Card.Header as="h5">{robot.nombre}</Card.Header>
      <Card.Body>
        <div className = "text-center mb-3">
          <Image src={imageUrl} alt={robot.nombre} fluid style={{ maxHeight: '250px', objectFit: 'contain' }} />
        </div>
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