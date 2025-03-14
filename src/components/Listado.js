import React, { useState, useEffect } from 'react';
import { Table, Container, Alert, Spinner, Card } from 'react-bootstrap';
import RobotDetail from './RobotDetail';

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

    const handleRowClick = (robot) => {
        setSelectedRobot(robot);
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
            <h1 className="mb-4">Listado de Robots</h1>
            {robots.length === 0 ? (
                <Alert variant="info">No hay robots disponibles</Alert>
            ) : (
                <>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Modelo</th>
                                <th>Compañía</th>
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

                    {selectedRobot && (
                        <RobotDetail robot={selectedRobot} />
                    )}
                </>
            )}
        </Container>
    );
}

export default Listado;