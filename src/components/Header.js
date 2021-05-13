import React, { Component } from "react";
import TokenService from "../services/token-service.js";
import { NavLink } from "react-router-dom";

export class Header extends Component {
  logOutClick = () => {
    // console.log("Logging out");
    TokenService.clearAuthToken();
    TokenService.getUserId = (id) => {
      // console.log(id)
    };

    window.location = "/";
  };
  render() {
    return (
      <div>
        <header className="clearfix">
          <h4>NotePad</h4>
          <nav className="nav">
            {TokenService.hasAuthToken() ? (
              <ul className="link">
                <li>
                  <a className="nav-link-item" href="/dashboard-page">
                    <i className="fas fa-question-circle"></i>
                    <span className="navlink-text">Dashboard</span>
                  </a>
                </li>
                <li>
                  <a className="nav-link-item" href="/add-item-page">
                    <i className="fas fa-plus-circle"></i>
                    <span className="navlink-text">New Note</span>
                  </a>
                </li>
                <li>
                  <a
                    className="nav-link-item"
                    href="/"
                    onClick={this.logOutClick}
                  >
                    <i className="fas fa-sign-out-alt"></i>
                    <span className="navlink-text">Log-Out</span>
                  </a>
                </li>
              </ul>
            ) : (
              <ul className="link">
                <li>
                  <a className="nav-link-item" href="/sign-in">
                    <i className="fas fa-edit"></i>
                    <span className="navlink-text">Sign-In</span>
                  </a>
                </li>
                <li>
                  <a className="nav-link-item" href="/registration">
                    <i className="fas fa-sign-out-alt"></i>
                    <span className="navlink-text">Registration</span>
                  </a>
                </li>
              </ul>
            )}
          </nav>
        </header>
      </div>
    );
  }
}

export default Header;
