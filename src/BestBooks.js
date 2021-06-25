import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Update from './Update';
// import Carousel from 'react-bootstrap/Carousel';
const axios = require('axios');


// let serverURL = process.env.REACT_APP_SERVER;
// let serverURLBook = '${serverURL}/books?';

class BestBooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storebookData: [],
            email: '',
            displayBooks: true,
            displayModel: false,
            server: process.env.REACT_APP_SERVER,
            name: '',
            img: '',
            description: '',
            status: '',
            displayUpdate:false

        }
    }

    componentDidMount = async () => {
        const { user } = this.props.auth0;
        let bookFront = await axios.get(`{this.state.server}/books`, { params: { email: user.email } });

        this.setState({
            bookFront: bookFront.data,
            displayBooks: true,
        });
    }

    handleCloseForm = () => {
        this.setState({
            displayModel: false
        })
    }
    handleShowForm = () => {
        this.setState({ displayModel: true })
    }

    handleupdateNameNB = (event) => {
        this.setState({
            name: event.target.value
        })
    }
    handleUpdatedescription = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    handleUpdateURL = (event) => {
        this.setState({
            img: event.target.value
        })
    }
    handleUpdateStatus = (event) => {
        this.setState({
            status: event.target.value
        })
    }

    getBook = async (event) => {
        event.preventDefault();
        const BookDataForm = {
            email: this.props.user.email,
            name: this.state.name,
            description: this.state.description,
            img: this.state.img,
            status: this.state.status,
        }
        const newBook = await axios.post(`${this.state.server}/addBook`, BookDataForm)
        this.setState({
            bookFront: newBook.data
        })
    }
    deleteHandler = async (index) => {
        const email = {
            email: this.props.auth0.user.email,
        }

        let newBook = await axios.delete(`${this.state.server}/deleteBook/${index}`, { params: email })
        this.setState({
            bookFront: newBook.data
        })
    }
    updateHandler=(idx)=>{
        const pickABook=this.stste.storebookData.filter((item,index)=>{
            return idx===index;
        })

        this.setState({
            displayUpdate: true,
            index:idx,
            name:pickABook[0].name,
            description: pickABook[0].description,
            img: pickABook[0].img,
            status: pickABook[0].status,
        })

    }
    updateBook=async(event)=>{
        event.preventDefault();
        const bookData={
            email:this.props.auth0.user.email,
            name:this.state.name,
            description:this.state.description,
            img:this.state.img,
            status:this.state.status,
        }
        let bookUpdateData=await axios.put(`${this.state.server}/updateBook/${this.state.index}`,bookData)
   this.setState({
    storebookData:bookUpdateData.data

   })
    }



    render() {
        return (
            <>
                <Button variant="primary" onClick={this.handleShowForm}>Add New Books</Button>
<Update 

    handleShowUpdate={this.handleShowUpdate}
    handleCloseModel={this.handleCloseModel}
    
    img={this.state.img}
    name={this.state.name}
    description={this.state.description}
    status={this.state.status}

        updateBook={this.updateBook}       
        handleupdateNameNB={this.handleupdateNameNB}
        handleUpdatedescription={this.handleUpdatedescription}
        handleUpdateURL={this.handleUpdateURL}
        handleUpdateStatus={this.handleUpdateStatus}
        displayUpdate={this.displayUpdate}  
               />
               
               
               
                <Modal show={this.state.displayModel} onHide={this.handleCloseForm}>
                    <Modal.Header closeButton>
                        <Modal.Title>Book Form</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>Woohoo,

                        <Form onSubmit={(event) => this.getBook(event)}>
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
                            <Button variant="primary" onClick={this.handleShowForm}>Submit</Button>
                        </Form>
                    </Modal.Body>

                </Modal>

                {this.state.storebookData.length !== 0 &&
                    this.state.storebookData.map((item, idx) => {
                        return (
                            <Card key={idx} style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="{item.img}" />
                                <Card.Body>
                                    <Card.Title>{item.name}</Card.Title>
                                    <Card.Text>
                                        <h3>{item.name}</h3>
                                        <p>Book Description : {item.description} </p>
                                        <p> Book Status:{item.status}</p>
                                    </Card.Text>
                                    <Button onClick={() => this.deleteHandler(idx)} variant="primary">Delete Books</Button>
                                </Card.Body>
                            </Card>

                        )

                    })
                }

            </>
        )

    }

}

export default withAuth0(BestBooks);



