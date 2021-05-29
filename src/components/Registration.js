import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import AuthApiService from "../services/auth-api-service";
import TokenService from "../services/token-service.js";

export class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      params: {
        signUpEmail: "",
        signUpPassword: "",
      },
    };
  }

  formatQueryParams(params) {
    const queryNotes = Object.keys(params).map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    );
    return queryNotes.join("&");
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
    let { signUpEmail, signUpPassword, verifyPassword } = data;
    if (this.validateEmail(signUpEmail) === "") {
      this.setState({
        error: "email is not valid",
      });
    } else if (this.validatePassword(signUpPassword) === "") {
      this.setState({
        error:
          "password must include at least one number, one lowercase and one uppercase letter, and be at least at least eight characters that are letters, numbers or the underscore",
      });
    } else if (signUpPassword != verifyPassword) {
      this.setState({
        error: "passwords do not match",
      });
    } else {
      //assigning the object from the form data to params in the state
      this.setState({
        params: data,
      });

      //check if the state is populated with the search params data
      // console.log(this.state.params);

      AuthApiService.postUser({
        email: signUpEmail,
        password: signUpPassword,
      })

        .then((response) => {
          // console.log("user:", response);
          TokenService.saveAuthToken(response.authToken);
          TokenService.saveUserId(response.id);
          window.location = "/dashboard-page";
        })

        .catch((res) => {
          this.setState({ error: res.error });
        });
    }
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
        <section className="registration">
          {/* <div className="alert alert-success">
            <i className="fas fa-check"></i> <strong>Success</strong> Account
            Activated Sucessfully!!
          </div>

          <div className="alert alert-warning">
            <i className="fas fa-exclamation"></i> <strong>Warning</strong>{" "}
            Password does not meet complexity requirements!!
          </div>

          <div className="alert alert-failure">
            <i className="fas fa-times"></i> <strong>Failure</strong>{" "}
            Registration Failed!! Please see System Adminstrator!!
          </div> */}

          <form className="registration-form" onSubmit={this.handleSubmit}>
            <h1>NotePad Registration</h1>
            <fieldset className="welcome-fieldset">
              <div className="create-user-message">
                <h3>Sign Up for an Account </h3>
                {errorMessage}
              </div>
              <label htmlFor="signUpEmail">Enter Email Address: </label>
              <input
                name="signUpEmail"
                type="text"
                placeholder="Email"
                required
              />
              <label htmlFor="signUpPassword">Enter Password: </label>
              <input
                name="signUpPassword"
                type="password"
                placeholder="Password"
                required
              />
              <label htmlFor="verifyPassword">Re-enter Password: </label>
              <input
                name="verifyPassword"
                type="password"
                placeholder="Re-enter Password"
                required
              />
              {/* <label htmlFor="getStarted">Let's Get Started!</label> */}
              <div className="form-note">
                <input
                  name="getStarted"
                  type="submit"
                  value="REGISTER"
                  className="myButton"
                />
                <p>
                  Already have an account?{" "}
                  <NavLink to="/sign-in" className="new-user-cta">
                    Sign In Here...
                  </NavLink>
                </p>
                {/* <a href="placeholder">Returning User? Log In Here...</a> */}
              </div>
            </fieldset>
          </form>
        </section>
      </div>
    );
  }
}

export default Registration;
