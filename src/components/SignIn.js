import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import TokenService from '../services/token-service';
import AuthApiService from '../services/auth-api-service';

export class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      params: {
        loginEmail: "",
        loginPassword: "",
      },
    };
  }

    //take the query parameters and format them for the api call
  formatQueryParams(params) {
    const queryItems = Object.keys(params).map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    );
    return queryItems.join("&");
  }

  validateEmail(inputEmail) {
    let outputEmail = inputEmail;
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!inputEmail.match(mailformat)) {
      outputEmail = "";
    }
    return outputEmail;
  }

  validatePassword(inputPassword) {
    let outputPassword = inputPassword;
    // at least one number, one lowercase and one uppercase letter
    // at least eight characters that are letters, numbers or the underscore
    let passwordformat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,}$/;
    if (!inputPassword.match(passwordformat)) {
      outputPassword = "";
    }
    return outputPassword;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    //create an object to store the search filters
    const data = {};

    //get all the from data from the form component
    const formData = new FormData(e.target);

    //for each of the keys in form data populate it with form value
    for (let value of formData) {
      data[value[0]] = value[1];
    }
    // console.log(data);
    let { loginEmail, loginPassword } = data;
    if (this.validateEmail(loginEmail) === "") {
      this.setState({
        error: "email is not valid",
      });
    }
    if (this.validatePassword(loginPassword) === "") {
      this.setState({
        error: "password is not correct",
      });
    }
    //assigning the object from the form data to params in the state
    this.setState({
      params: data,
    });

    //check if the state is populated with the search params data
    // console.log(this.state.params);

    AuthApiService.postLogin({
      email: loginEmail, 
      password: loginPassword,
    })

    .then(response => {
      // console.log("response ID", response)
      TokenService.saveAuthToken(response.authToken)
      TokenService.saveUserId(response.userId)
      window.location ='/dashboard-page'
    })
    .then(response => {
      // console.log("response:",response)
    })
    .catch(err => {
      // console.log(err);
    });   
  };

  render() {
    //if there is an error message display it
    const errorMessage = this.state.error ? (
      <p className="error-message">{this.state.error}</p>
    ) : (
      false
    );
    return (
      <div>
        <section className="sign-in">
          {/* <div className="alert alert-info">
            <i className="fas fa-info"></i> <strong>Info</strong> Please enter
            username and password!
          </div>

          <div className="alert alert-warning">
            <i className="fas fa-exclamation"></i> <strong>Warning</strong>{" "}
            Username or password incorrect!!
          </div> */}


          <form className="sign-in-form" onSubmit={this.handleSubmit}>
          <h1>NotePad Sign-In</h1>
          <fieldset className="welcome-fieldset">
            {errorMessage}
            <div className="login-message">
              <h3>Log In</h3>
            </div>
            <label htmlFor="loginEmail">Email Address: </label>
            <input
              name="loginEmail"
              type="text"
              placeholder="test@gmail.com"
              required
            />
            <label htmlFor="loginPassword">Password: </label>
            <input
              name="loginPassword"
              type="password"
              placeholder="TestPassword123"
              required
            />
            {/* <label htmlFor="get-started">Let's Get Going!</label> */}
            <input name="get-started" type="submit" value="LOG-IN" className="myButton"/>
            <p className="login-demo">Demo Email: test@gmail.com<br/>Demo Password: TestPassword123</p>
            <p>
              Need to create an account?<NavLink to='/registration' className="new-user-cta"> Create an Account Here...</NavLink>
            </p>
            
            {/* <a href="placeholder">New User? Create an Account Here...</a> */}
          </fieldset>
        </form>
        </section>
      </div>
    );
  }
}

export default SignIn;
