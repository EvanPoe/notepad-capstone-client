import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export class LandingPage extends Component {
  render() {
    return (
      <div>
        <section className="landing-page">
            <h1>NotePad</h1>

            <div className="item-wrapper">
                <h3 className="item-title">Welcome to NotePad!</h3>
                <p className="item-notes">Here you can create and save notes for literally anything!</p>
            </div>
            {/* <div className="form-item">
                <a href="#" className="myButton">Sign-In</a>
            </div> */}
            <NavLink to='/registration' className="new-user-cta"> Create an Account Here...</NavLink>
            {/* <div className="form-item">
                <a href="#" className="myButton">Register</a>
            </div> */}
            <p>
                  Already have an account?{" "}
                  <NavLink to="/sign-in" className="new-user-cta">
                    Sign In Here...
                  </NavLink>
                </p>
        </section>
      </div>
    );
  }
}

export default LandingPage;
