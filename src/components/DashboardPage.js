import React, { Component } from "react";
import config from "../config";
import TokenService from "../services/token-service";
import { Link } from "react-router-dom";

export class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notesByUserId: [],
    };
  }

  componentDidMount() {
    let currentUser = TokenService.getUserId();
    // let currentUser = 1;

    console.log(currentUser);

    //if the user is not logged in, send him to landing page
    if (!TokenService.hasAuthToken()) {
      window.location = "/";
    }

    let getNotesByUserIdUrl = `${config.API_ENDPOINT}/notes/user/${currentUser}`;

    fetch(getNotesByUserIdUrl)
      .then((notesInList) => notesInList.json())
      .then((notesInList) => {
        console.log(notesInList);
        this.setState({
          notesByUserId: notesInList,
        });
        console.log(this.state);
      })

      .catch((error) => this.setState({ error }));
  }

  deleteNote(event) {
    event.preventDefault();

    const data = {};

    const formData = new FormData(event.target);

    for (let value of formData) {
      data[value[0]] = value[1];
    }

    console.log(data);

    let { noteId } = data;
    console.log(noteId);

    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    }).then((response) => {
      window.location = `/dashboard-page`;
    });
  }

  changeNoteCategory(event) {
    event.preventDefault();

    const data = {};

    const formData = new FormData(event.target);

    for (let value of formData) {
      data[value[0]] = value[1];
    }

    console.log(data);

    let { noteId, newNoteCategory } = data;
    console.log(noteId, newNoteCategory);

    let payload = {
      category: newNoteCategory,
    };

    console.log("the payload: ", payload);
    //define the API call parameters
    const options = {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    };

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
        console.log(data);
        // check if there are no results
        if (data.totalNotes === 0) {
          throw new Error("No data found");
        }
        window.location = `/dashboard-page`;
      })
      .catch((err) => {
        this.setState({
          error: err.message,
        });
      });
  }

  render() {
    let showNoteByUserId = "";

    if (this.state.notesByUserId.length == 0) {
      showNoteByUserId = <p>No Notes</p>;
    } else {
      showNoteByUserId = this.state.notesByUserId.map((note, key) => {
        let editNoteUrl = `/edit-note-page/${note.id}`;



        

        return (
          <div className="note-wrapper" key={key}>
              <h3 className="note-title">{note.title}</h3>
              <p className="note-notes">{note.content}</p>
              <ul className="note-details">
                <li className="note-actions">
                  <div className="form-note">
                    <Link to={editNoteUrl} className="myButton">
                    <i className="fas fa-edit"></i>EDIT
                    </Link>
                  </div>
                  <div className="form-note">
                    <form className="deleteNoteForm" onSubmit={this.deleteNote}>
                      <input
                        type="hidden"
                        name="noteId"
                        defaultValue={note.id}
                      ></input>
                      <button type="submit" className="myButton">
                        <i className="fas fa-trash-alt"></i> DELETE
                      </button>
                    </form>
                  </div>
                </li>
              </ul>
          </div>
        );
      });
    }

    return (
      <div>
        <section className="dashboard-page">
          <h1>NotePad Dashboard</h1>
          {showNoteByUserId}
        </section>
      </div>
    );
  }
}

export default DashboardPage;
