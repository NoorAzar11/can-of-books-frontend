import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Carousel from 'react-bootstrap/Carousel';
const axios = require('axios');
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

// let serverURL = process.env.REACT_APP_SERVER;
// let serverURLBook = '${serverURL}/books?';

class BestBooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storebookData: [],
            email: '',
            displayBooks: true,
            displayModel:false,
            server:process.env.REACT_APP_SERVER,
            name:'',
            img:'',
            description:'',
            status:''

        }
    }

    componentDidMount = async () => {
        const {user}=this.props.auth0;
        let bookFront = await axios.get(`{this.state.server}/books`, { params :{email:user.email}} );
        
        this.setState({
            bookFront: bookFront.data,
            displayBooks:true,
        });
    }

    handleCloseForm= () => {
        this.setState({
            displayModel:false
        })
    }
    handleShowForm= () =>{
        this.setState({displayModel:true})
    }

    handleupdateNameNB=(event)=> {
this.setState({
    name:event.target.value
})
    }
    handleUpdatedescription=(event)=> {
        this.setState({
            description:event.target.value
        })
    }
    handleUpdateURL=(event) =>
    {
        this.setState({
            img:event.target.value
        })
    }
    handleUpdateStatus=(event) => {
        this.setState({
            status:event.target.value
        })
    }

    getBook=async(event) =>
    {
        event.preventDefault();
        const BookDataForm = {
            email:this.props.user.email,
            name:this.state.name,
            description:this.state.description,
            img:this.state.img,
            status:this.state.status,
        }
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



