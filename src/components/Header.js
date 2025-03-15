import React from "react";
import { Image, Container } from "react-bootstrap";
import banner from "../banner.png";

function Header() {
  return (
    <Container fluid className="p-0">
      <div className="text-center mb-4">
        <h1 className="py-3">Adopta un Robot con Robo Lovers!</h1>
        <hr></hr>
        <div className="banner-container">
          <Image 
            src={banner}
            style={{ 
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              objectPosition: 'center'
            }}
            alt="Banner de Robo Lovers"
          />
        </div>
        <hr></hr>
      </div>
    </Container>
  );
}

export default Header;