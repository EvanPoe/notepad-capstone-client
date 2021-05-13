import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import SignIn from "./components/SignIn";
import Registration from "./components/Registration";
import DashboardPage from "./components/DashboardPage";
import AddItemPage from "./components/AddItemPage";
import EditItemPage from "./components/EditItemPage";
import Footer from "./components/Footer";
import "./normalize.css";
import "./App.css";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workouts: [],
      error: null,
    };
  }


  render() {
    return (
      <div className="App">
    {/* <header className='clearfix'>
        <h4>NotePad</h4>
        <nav className="nav">
            <ul className='link'>
                <li>
                    <a className="nav-link-item" href="/log-in">
                        <i className="fas fa-edit"></i>
                        <span className='navlink-text'>Log-in</span>
                    </a>
                </li>
                <li>
                    <a className="nav-link-item" href="/register">
                        <i className="fas fa-sign-out-alt"></i>
                        <span className='navlink-text'>Register</span>
                    </a>
                </li>
                <li>
                    <a className="nav-link-item" href="/dashboard">
                        <i className="fas fa-question-circle"></i>
                        <span className='navlink-text'>Dashboard</span>
                    </a>
                </li>
                <li>
                    <a className="nav-link-item" href="/new-item">
                        <i className="fas fa-plus-circle"></i>
                        <span className='navlink-text'>New Item</span>
                    </a>
                </li>
                <li>
                    <a className="nav-link-item" href="/" onClick={this.logOutClick}>
                        <i className="fas fa-sign-out-alt"></i>
                        <span className='navlink-text'>Log-Out</span>
                    </a>
                </li>
            </ul>
        </nav>
    </header>

    <main className="container">

        <section className="registration">

            <div className="alert alert-success">
                <i className="fas fa-check"></i> <strong>Success</strong> Account Activated Sucessfully!!
            </div>

            <div className="alert alert-warning">
                <i className="fas fa-exclamation"></i> <strong>Warning</strong> Password does not meet complexity
                requirements!!
            </div>

            <div className="alert alert-failure">
                <i className="fas fa-times"></i> <strong>Failure</strong> Registration Failed!! Please see System
                Adminstrator!!
            </div>

            <form className="registration-form">
                <h1>NotePad Registration</h1>
                <div className="form-item">
                    <label htmlFor="register-email">Email</label>
                    <input type="text" placeholder="email" required="" id="register-email" />
                </div>
                <div className="form-item">
                    <label htmlFor="register-password">Password</label>
                    <input type="text" placeholder="password" required="" id="register-password" />
                </div>
                <div className="form-item">
                    <label htmlFor="register-confirm-password">Confirm Password</label>
                    <input type="text" placeholder="confirm-password" required="" id="register-confirm-password" />
                </div>
                <div className="form-item">
                    <a href="#" className="myButton">Register</a>
                    <p>Already have an account? <a href="#">Sign In</a></p>
                </div>
            </form>
        </section>



        <section className="sign-in">
            <div className="alert alert-info">
                <i className="fas fa-info"></i> <strong>Info</strong> Please enter username and password!
            </div>

            <div className="alert alert-warning">
                <i className="fas fa-exclamation"></i> <strong>Warning</strong> Username or password incorrect!!
            </div>

            <form className="sign-in-form">
                <h1>NotePad Sign-In</h1>

                <div className="form-item">
                    <label htmlFor="sign-in-email">Email</label>
                    <input type="text" placeholder="email" required="" id="sign-in-email" />
                </div>
                <div className="form-item">
                    <label htmlFor="sign-in-password">Password</label>
                    <input type="text" placeholder="password" required="" id="sign-in-password" />
                </div>
                <div className="form-item">
                    <a href="#" className="myButton">Sign-In</a>
                    <p>Need to create an account? <a href="#">Register</a></p>
                </div>
            </form>
        </section>




        <section className="landing-page">
            <h1>NotePad</h1>

            <div className="item-wrapper">
                <h3 className="item-title">Welcome to NotePad!</h3>
                <p className="item-notes">Here you can create and save notes for literally anything!</p>
            </div>
            <div className="form-item">
                <a href="#" className="myButton">Sign-In</a>
            </div>
            <div className="form-item">
                <a href="#" className="myButton">Register</a>
            </div>
        </section>






        <section className="dashboard-page">

            <h1>Welcome to Your Dashboard!</h1>
            <div className="alert alert-success">
                <i className="fas fa-check"></i> <strong>Success</strong> Note Deleted Sucessfully!!
            </div>
            <div className="item-wrapper">
                <h3 className="item-title">Note 1</h3>
                <p className="item-notes">Here are the user's notes</p>
                <button type="submit" className="myButton">
                    <i className="fas fa-trash-alt"></i> Edit
                </button>
                <button type="submit" className="myButton">
                    <i className="fas fa-trash-alt"></i> DELETE
                </button>
            </div>
            <div className="item-wrapper">
                <h3 className="item-title">Note 2</h3>
                <p className="item-notes">Here are the user's notes</p>
                <button type="submit" className="myButton">
                    <i className="fas fa-trash-alt"></i> Edit
                </button>
                <button type="submit" className="myButton">
                    <i className="fas fa-trash-alt"></i> DELETE
                </button>
            </div>
            <button type="submit" className="myButton">
                <i className="fas fa-trash-alt"></i> Add Note
            </button>
        </section>



        <section className="add-item-page">
            <h1>New Note</h1>
            <form className="create-new-item">
                <div className="alert alert-info">
                    <i className="fas fa-info"></i> <strong>Info</strong> Please enter a valid title!!
                </div>
                <div className="alert alert-info">
                    <i className="fas fa-info"></i> <strong>Info</strong> Please enter a valid note!!
                </div>
                <div className="add-item">
                    <label htmlFor="note-title">Enter a title</label>
                    <input type="text" placeholder="Title" required="" id="note-title" />
                </div>
                <div className="form-item">
                    <label htmlFor="personal-notes">Notes:</label>
                    <input type="text" placeholder="Notes:" name="personal-notes" id="personal-notes" />
                </div>
                <div className="form-item">
                    <a href="#" className="myButton">Cancel</a>
                </div>
                <div className="form-item">
                    <a href="#" className="myButton">Save</a>
                </div>
            </form>

        </section>

        <section className="edit-item-page">
            <h1>Edit Note</h1>
            <form className="create-new-item">
                <div className="alert alert-info">
                    <i className="fas fa-info"></i> <strong>Info</strong> Please enter a valid title!!
                </div>
                <div className="alert alert-info">
                    <i className="fas fa-info"></i> <strong>Info</strong> Please enter a valid note!!
                </div>
                <div className="add-item">
                    <label htmlFor="note-title">Title: </label>
                    <input type="text" placeholder="Old Title" required="" id="note-title" />
                </div>
                <div className="form-item">
                    <label htmlFor="personal-notes">Notes: </label>
                    <input type="text" placeholder="Old Notes:" name="personal-notes" id="personal-notes" />
                </div>
                <div className="form-item">
                    <a href="#" className="myButton">Cancel</a>
                </div>
                <div className="form-item">
                    <a href="#" className="myButton">Save</a>
                </div>
            </form>

        </section>

        <footer>
            <h4>© 2019-2021 Evan Poe</h4>
            <a href="#top">
                <i className="far fa-caret-square-up fa-2x"></i>
            </a>
        </footer>

    </main> */}
    
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path='/' component={LandingPage}/>
            <Route exact path='/sign-in' component={SignIn}/>
            <Route exact path='/registration' component={Registration}/>
            <Route exact path='/dashboard-page' component={DashboardPage}/>
            <Route exact path='/add-item-page' component={AddItemPage}/>
            <Route exact path='/edit-item-page/:itemId' component={EditItemPage}/>
          </Switch>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
