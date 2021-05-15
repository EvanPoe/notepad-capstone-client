import React, { Component } from "react";
import config from "../config";
import TokenService from "../services/token-service";
import { Link } from "react-router-dom";

export class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsByUserId: [],
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

    let getItemsByUserIdUrl = `${config.API_ENDPOINT}/items/user/${currentUser}`;

    fetch(getItemsByUserIdUrl)
      .then((itemsInList) => itemsInList.json())
      .then((itemsInList) => {
        // console.log(itemsInList);
        this.setState({
          itemsByUserId: itemsInList,
        });
        // console.log(this.state);
      })

      .catch((error) => this.setState({ error }));
  }

  deleteItem(event) {
    event.preventDefault();

    const data = {};

    const formData = new FormData(event.target);

    for (let value of formData) {
      data[value[0]] = value[1];
    }

    // console.log(data);

    let { itemId } = data;
    // console.log(itemId);

    fetch(`${config.API_ENDPOINT}/items/${itemId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    }).then((response) => {
      window.location = `/dashboard-page`;
    });
  }

  changeItemCategory(event) {
    event.preventDefault();

    const data = {};

    const formData = new FormData(event.target);

    for (let value of formData) {
      data[value[0]] = value[1];
    }

    // console.log(data);

    let { itemId, newItemCategory } = data;
    // console.log(itemId, newItemCategory);

    let payload = {
      category: newItemCategory,
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
        window.location = `/dashboard-page`;
      })
      .catch((err) => {
        // this.setState({
        //   error: err.message,
        // });
      });
  }

  render() {
    let showItemByUserId = "";

    if (this.state.itemsByUserId.length == 0) {
      showItemByUserId = <p>No Items</p>;
    } else {
      showItemByUserId = this.state.itemsByUserId.map((item, key) => {
        let editItemUrl = `/edit-item-page/${item.id}`;



        

        return (
          <div className="item-wrapper" key={key}>
              <h3 className="item-title">{item.keyword}</h3>
              <p className="item-notes">{item.notes}</p>
              <ul className="item-details">
                <li className="item-actions">
                  <div className="form-item">
                    <Link to={editItemUrl} className="myButton">
                    <i class="fas fa-edit"></i>EDIT
                    </Link>
                  </div>
                  <div className="form-item">
                    <form className="deleteItemForm" onSubmit={this.deleteItem}>
                      <input
                        type="hidden"
                        name="itemId"
                        defaultValue={item.id}
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
          {showItemByUserId}
        </section>
      </div>
    );
  }
}

export default DashboardPage;
