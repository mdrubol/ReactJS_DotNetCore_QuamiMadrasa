import React from 'react';
import { Alert, Button, ButtonGroup, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';

interface ToolbarParams {

}

function Toolbar(props: ToolbarParams) {
    return (
        <>
        <Container>
            <Row>
                <Col sm={12}>
                <div className="mt-2">
                <nav className="navbar navbar-light" >
                    <div className='pull-left'>
                        <InputGroup>
                            <Form.Control
                                placeholder="Filter records ..."
                                aria-label="any keyword that matches in any records"
                                aria-describedby="basic-addon2"
                            />
                            <InputGroup.Text id="basic-addon2">Search</InputGroup.Text>
                        </InputGroup>
                    </div>
                    <ButtonGroup aria-label="Basic example"  className='pull-right'>
                        <Button className='btn-space btn-primary'> <span className="bi bi-file-earmark-plus"></span></Button>
                        <Button className='btn-space btn-secondary'> <span className="bi bi-pencil-square"></span></Button>
                        <Button className='btn-space btn-danger'> <span className="bi bi-trash3"></span></Button>
                    </ButtonGroup>

                </nav>
            </div>
                </Col>
            </Row>
        </Container>



        </>
    );
}

export default Toolbar;