import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Carousel from 'react-bootstrap/Carousel';
const axios = require('axios');
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

let serverURL = process.env.REACT_APP_SERVER;
let serverURLBook = '${serverURL}/books?';

class BestBooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storebookData: [],
            email: '',

        }
    }

    componentDidMount = async () => {
        let bookFront = await axios.get(`{this.state.serverURl}/books, { params : ${this.props.auth0.user.email}}`);
        
        this.setState({
            bookFront: bookFront.data,
        });
    }
    render() {
        return (
            <div>
                <Carousel>
                {this.state.bookFront.map((item) => (
                    <Carousel.Item>
                       
                        <img
                            className="d-block w-100"
                            src={item.status}
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))
    }
                </Carousel>
            </div>
        )
    }

}



export default withAuth0(BestBooks);



