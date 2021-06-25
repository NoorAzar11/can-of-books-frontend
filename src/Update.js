import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';



export class Update extends React.Component {
    render() {
        return (
            <div>
                <Modal show={this.state.displayUpdate} onHide={this.handleCloseForm}>
                    <Modal.Header closeButton>
                        <Modal.Title>Book Form</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>Woohoo,

                        <Form onSubmit={(event) => this.updateBook(event)}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Book Name :</Form.Label>
                                <Form.Control onChange={(event) => this.handleupdateNameNB(event)} type="text" placeholder="Books" />
                            </Form.Group>


                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Book Description :</Form.Label>
                                <Form.Control onChange={(event) => this.handleUpdatedescription(event)} type="text" placeholder="Books Description " />
                            </Form.Group>


                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Book Status :</Form.Label>
                                <Form.Control onChange={(event) => this.handleUpdateStatus(event)} type="text" placeholder="Books Status " />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Book Images:</Form.Label>
                                <Form.Control onChange={(event) => this.handleUpdateURL(event)} type="text" placeholder="Books Images " />
                            </Form.Group>
                            <Button variant="primary">Submit</Button>
                        </Form>
                    </Modal.Body>

                </Modal>


            </div>
        )
    }
}

export default Update
