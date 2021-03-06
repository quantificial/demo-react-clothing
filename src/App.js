import React from "react";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-sign-up/sign-in-sign-up.component";
import { Switch, Route, Redirect } from "react-router-dom";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user.action';

class App extends React.Component {

  unsubscribeFormAuth = null;

  componentDidMount() {

    const {setCurrentUser} = this.props;

    this.unsubscribeFormAuth = auth.onAuthStateChanged(async userAuth => {
      //this.setState({ currentUser: userAuth });

      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          //console.log(snapShot.data())
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          })
        })
      }else{
        setCurrentUser(userAuth)
      }
      
    });
  }

  componentWillUnmount() {
    this.unsubscribeFormAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/signin" render={()=> this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect (mapStateToProps, mapDispatchToProps)(App);
