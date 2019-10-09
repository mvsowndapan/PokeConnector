import React, { Component } from 'react';
//store
import { Provider } from 'react-redux';
import store from './store';

import jwt_decode from 'jwt-decode';//jwt-decode fro checking the user is logged in
import setAuthToken from './utils/setAuthToken';//to get current user token from local storage
//to get current user details and to redirect user to same page if he had a token when refreshing
//actions
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
//css`
import './App.css';
//router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Component
//layout-component
import Navbar from './component/layout/Navbar'; //Navbar
import Footer from './component/layout/Footer'; //Footer
import Landing from './component/layout/Landing'; //Landing
//auth-component
import Login from './component/auth/Login';
import Register from './component/auth/Register';
// Dashboard -Component
import Dashboard from './component/dashboard/Dashboard';
//commen to get access to only private routers
import Private from './component/common/Private';
//create-profile -Component
import CreateProfile from './component/create-profile/CreateProfile';
//edit-profile - Component
import EditProfile from './component/edit-profile/EditProfile';
//add-exp-edu
import Experience from './component/add-exp-edu/Experience';
import Education from './component/add-exp-edu/Education';
//profiles
import Profiles from './component/profiles/Profile';
//profile
import Profile from './component/profile/Profile';
//notFound
import NotFound from './component/not-found/NotFound';
//posts
import Posts from './component/posts/Posts';
//post
import Post from './component/post/Post';

//check for token
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);   //set Auth header with token
  let decoded = jwt_decode(localStorage.jwtToken); //decode the token from the localstorage
  store.dispatch(setCurrentUser(decoded));
  //check for token expires
  let currentTime = Date.now / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser()); // logout the user
    store.dispatch(clearCurrentProfile());
    window.location.href = '/login'; // redirect him to the login page
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/trainers" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Switch><Private exact path="/dashboard" component={Dashboard} /></Switch>
              <Switch><Private exact path="/create-profile" component={CreateProfile}></Private></Switch>
              <Switch><Private exact path="/edit-profile" component={EditProfile}></Private></Switch>
              <Switch><Private exact path="/add-experience" component={Experience}></Private></Switch>
              <Switch><Private exact path="/add-education" component={Education}></Private></Switch>
              <Switch><Private exact path="/post" component={Posts}></Private></Switch>
              <Switch><Private exact path="/post/:id" component={Post}></Private></Switch>
              <Route exact path="/not-found" component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router >
      </Provider >

    )
  }
}

export default App;
