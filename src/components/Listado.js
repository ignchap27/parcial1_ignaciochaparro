import React, { useState, useEffect } from 'react';
import { Table, Container, Alert, Spinner, Row, Col } from 'react-bootstrap';
import RobotDetail from './RobotDetail';
import { FormattedMessage } from 'react-intl';

function Listado() {
    const [robots, setRobots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRobot, setSelectedRobot] = useState(null);

    useEffect(() => {
        const fetchRobots = async () => {
            try {
                const response = await fetch('http://localhost:3001/robots');
                
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                
                const data = await response.json();
                setRobots(data);
                setLoading(false);
            } catch (error) {
                setError(`Error al cargar los robots: ${error.message}`);
                setLoading(false);
            }
        };

        fetchRobots();
    }, []);

    const handleRowClick = async (robot) => {
        const responde = await fetch(`http://localhost:3001/robots/${robot.id}`);   
        const data_robot = await responde.json();
        setSelectedRobot(data_robot);
    };

    if (loading) {
        return (
            <Container className="mt-4 text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-4">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            {robots.length === 0 ? (
                <Alert variant="info">No hay robots disponibles</Alert>
            ) : (
                <Row>
                    <Col md={6}>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th><FormattedMessage id="ID"/></th>
                                    <th><FormattedMessage id="Name"/></th>
                                    <th><FormattedMessage id="Model"/></th>
                                    <th><FormattedMessage id="Company"/></th>
                                </tr>
                            </thead>
                            <tbody>
                                {robots.map((robot) => (
                                    <tr 
                                        key={robot.id}
                                        onClick={() => handleRowClick(robot)}
                                        className={selectedRobot && selectedRobot.id === robot.id ? "table-primary" : ""}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <td>{robot.id}</td>
                                        <td>{robot.nombre}</td>
                                        <td>{robot.modelo}</td>
                                        <td>{robot.empresaFabricante}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>

                    <Col md={4}>
                        {selectedRobot && (
                            <RobotDetail robot={selectedRobot} />
                        )}
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default Listado;