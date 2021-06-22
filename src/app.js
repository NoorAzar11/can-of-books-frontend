import React from 'react';
import Header from './header';
import IsLoadingAndError from './IsLoadingAndError';
import Footer from './footer';

import { withAuth0 } from '@auth0/auth0-react'; 

import LogoutButton from './LogoutButton';


import LoginButton from './LoginButton';
import Profile from './profile';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import MyFavoriteBooks from './myFavoriteBooks';


class App extends React.Component {

  render() {
    console.log('app', this.props)
    return(
      <>
        <Router>
          {/* <IsLoadingAndError> */}
            <Header />
              <Switch>
                <Route exact path="/">
                  {/* TODO: if the user is logged in, render the `MyFavoriteBooks` component, if they are not, render the `Login` component */}
{this.props.auth0.isAuthenticated ?< MyFavoriteBooks/> : <login/>}
                </Route>
                
                {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
                <Route exact path="/profile">
                <Profile />
                </Route>
              </Switch>
              
              <LoginButton />
              

              <LogoutButton />
            <Footer />
          {/* </IsLoadingAndError> */}
        </Router>
      </>
    )
  }
}

export default App;
