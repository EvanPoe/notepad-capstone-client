import React, { Component } from "react";
import config from "../config";
import TokenService from "../services/token-service";
import { Link } from "react-router-dom";

export class EditItemPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsByUserId: [],
      error: null,
      // databaseWorkouts: [],
      currentItem: {},
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

    const itemId = this.props.match.params.itemId;

    // console.log(itemId);

    let url = `${config.API_ENDPOINT}/items/${itemId}`;

    // console.log(url)

    fetch(url)
      .then((response) => response.json())

      .then((data) => {
        // console.log(data);

        this.setState({
          currentItem: data,
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

    const itemId = this.props.match.params.itemId;

    //useing the url and parameters above make the api call
    fetch(`${config.API_ENDPOINT}/items/${itemId}`, options)
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
        if (data.totalItems === 0) {
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
        <section className="add-item-page">
          <h1>Edit Item</h1>
          <form className="create-new-item" onSubmit={this.handleSubmit}>
            {errorMessage}
            <div className="add-item">
              <label htmlFor="keyword-search">Enter a Title</label>
              <input
                type="text"
                placeholder="keyword"
                name="keyword"
                required
                id="keyword-search"
                defaultValue={this.state.currentItem.keyword}
              />
            </div>
                        
            

            <div className="form-item">
              <label htmlFor="personal-notes">Notes:</label>
              <input
                type="text"
                placeholder="Notes:"
                name="notes"
                id="personal-notes"
                defaultValue={this.state.currentItem.notes}
              />
            </div>

            <div className="form-item">
                    <Link to="/dashboard-page" className="myButton">
                    <i class="fas fa-edit"></i>Cancel
                    </Link>
                  </div>
            

            <div className="form-item">
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

export default EditItemPage;
