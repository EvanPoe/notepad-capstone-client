import React, { Component } from "react";
import config from "../config";
import TokenService from "../services/token-service";
import { Link } from "react-router-dom";

export class EditNotePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notesByUserId: [],
      error: null,
      // databaseWorkouts: [],
      currentNote: {},
    };
  }

  componentDidMount() {
    // let currentUser = TokenService.getUserId();
    let currentUser = 1;
    // console.log(currentUser);

    //if the user is not logged in, send him to landing page
    // if (!TokenService.hasAuthToken()) {
    //   window.location = "/";
    // }

    const noteId = this.props.match.params.noteId;

    // console.log(noteId);

    let url = `${config.API_ENDPOINT}/notes/${noteId}`;

    // console.log(url)

    fetch(url)
      .then((response) => response.json())

      .then((data) => {
        // console.log(data);

        this.setState({
          currentNote: data,
        });
      })

      .catch((err) => {
        // console.log(err);
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    //create an object to store the search filters
    const userInputData = {};

    //get all the form data from the form component
    const formData = new FormData(e.target);

    //for each of the keys in form data populate it with form value
    for (let value of formData) {
      userInputData[value[0]] = value[1];
    }
    // console.log(userInputData);
    // let { difficulty, type } = data;

    let payload = {
      user_id: TokenService.getUserId(),
      keyword: userInputData.keyword,
      notes: userInputData.notes,
    };

    // console.log("the payload: ", payload);
    //define the API call parameters
    const options = {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    const noteId = this.props.match.params.noteId;

    //useing the url and parameters above make the api call
    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, options)
      // if the api returns data ...
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong, please try again later.");
        }
        // ... convert it to json
        return res.json();
      })
      // use the json api output
      .then((data) => {
        //check if there is meaningfull data
        // console.log(data);
        // check if there are no results
        if (data.totalNotes === 0) {
          throw new Error("No data found");
        }
        window.location.href = "/dashboard-page";
      })
      .catch((err) => {
        // this.setState({
        //   error: err.message,
        // });
      });
  };

  render() {
    //if there is an error message display it
    const errorMessage = this.state.error ? (
      <div className="alert alert-info">
        <i className="fas fa-info"></i> <strong>Info</strong>
        {this.state.error}
      </div>
    ) : (
      false
    );

    return (
      <div>
        <section className="add-note-page">
          <h1>Edit Note</h1>
          <form className="create-new-note" onSubmit={this.handleSubmit}>
            {errorMessage}
            <div className="add-note">
              <label htmlFor="keyword-search">Enter a Title</label>
              <input
                type="text"
                placeholder="keyword"
                name="keyword"
                required
                id="keyword-search"
                defaultValue={this.state.currentNote.keyword}
              />
            </div>
                        
            

            <div className="form-note">
              <label htmlFor="personal-notes">Notes:</label>
              <input
                type="text"
                placeholder="Notes:"
                name="notes"
                id="personal-notes"
                defaultValue={this.state.currentNote.notes}
              />
            </div>

            <div className="form-note">
                    <Link to="/dashboard-page" className="myButton">
                    <i class="fas fa-edit"></i>Cancel
                    </Link>
                  </div>
            

            <div className="form-note">
              <input
                type="submit"
                value="CONFIRM CHANGES"
                className="myButton"
              />
            </div>
          </form>
        </section>
      </div>
    );
  }
}

export default EditNotePage;
