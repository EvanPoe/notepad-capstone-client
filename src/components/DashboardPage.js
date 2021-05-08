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
    let currentUser = TokenService.getUserId();
    // console.log(currentUser);

    //if the user is not logged in, send him to landing page
    if (!TokenService.hasAuthToken()) {
      window.location = "/";
    }

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
        let iFrameUrl = `https://maps.google.com/maps?q=${item.keyword}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
        let editItemUrl = `/edit-item-page/${item.id}`;
        let ratingOutput = "";
        if (item.rating == 1) {
          ratingOutput = (
            <li className="item-rating">
              <i className="fas fa-star selected-icon"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </li>
          );
        } else if (item.rating == 2) {
          ratingOutput = (
            <li className="item-rating">
              <i className="fas fa-star selected-icon"></i>
              <i className="fas fa-star selected-icon"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </li>
          );
        } else if (item.rating == 3) {
          ratingOutput = (
            <li className="item-rating">
              <i className="fas fa-star selected-icon"></i>
              <i className="fas fa-star selected-icon"></i>
              <i className="fas fa-star selected-icon"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </li>
          );
        } else if (item.rating == 4) {
          ratingOutput = (
            <li className="item-rating">
              <i className="fas fa-star selected-icon"></i>
              <i className="fas fa-star selected-icon"></i>
              <i className="fas fa-star selected-icon"></i>
              <i className="fas fa-star selected-icon"></i>
              <i className="fas fa-star"></i>
            </li>
          );
        } else if (item.rating == 5) {
          ratingOutput = (
            <li className="item-rating">
              <i className="fas fa-star selected-icon"></i>
              <i className="fas fa-star selected-icon"></i>
              <i className="fas fa-star selected-icon"></i>
              <i className="fas fa-star selected-icon"></i>
              <i className="fas fa-star selected-icon"></i>
            </li>
          );
        }

        let costOutput = "";
        if (item.cost == 1) {
          costOutput = (
            <li className="item-cost">
              <i className="fas fa-dollar-sign selected-icon"></i>
              <i className="fas fa-dollar-sign"></i>
              <i className="fas fa-dollar-sign"></i>
            </li>
          );
        } else if (item.cost == 2) {
          costOutput = (
            <li className="item-cost">
              <i className="fas fa-dollar-sign selected-icon"></i>
              <i className="fas fa-dollar-sign selected-icon"></i>
              <i className="fas fa-dollar-sign"></i>
            </li>
          );
        } else if (item.cost == 3) {
          costOutput = (
            <li className="item-cost">
              <i className="fas fa-dollar-sign selected-icon"></i>
              <i className="fas fa-dollar-sign selected-icon"></i>
              <i className="fas fa-dollar-sign selected-icon"></i>
            </li>
          );
        }

        let privacyOutput = "";
        if (item.is_public == 0) {
          privacyOutput = <li className="is-public">Private</li>;
        } else {
          privacyOutput = <li className="is-public">Public</li>;
        }

        let categoryButtonOutput = "";
        if (item.category == "Been There Done That!") {
          categoryButtonOutput = (
            <form
              className="changeItemCategoryForm"
              onSubmit={this.changeItemCategory}
            >
              <input type="hidden" name="itemId" defaultValue={item.id}></input>
              <input
                type="hidden"
                name="newItemCategory"
                defaultValue="On My List!"
              ></input>
              <button type="submit" className="myButton">
                <i className="fas "></i> ADD TO MY LIST!
              </button>
            </form>
          );
        } else {
          categoryButtonOutput = (
            <form
              className="changeItemCategoryForm"
              onSubmit={this.changeItemCategory}
            >
              <input type="hidden" name="itemId" defaultValue={item.id}></input>
              <input
                type="hidden"
                name="newItemCategory"
                defaultValue="Been There Done That!"
              ></input>
              <button type="submit" className="myButton">
                <i className="fas "></i> CROSS OFF MY LIST!
              </button>
            </form>
          );
        }

        let typeOutput = "";
        if (item.type == "Historical") {
          typeOutput = (
            <li className="item-type">
              <i className="type-icon fas fa-futbol"></i>
              <i className="type-icon fas fa-praying-hands"></i>
              <i className="type-icon fas fa-graduation-cap"></i>
              <i className="type-icon fas fa-heart"></i>
              <i className="type-icon fas fa-hiking"></i>
              <i className="type-icon fas fa-business-time"></i>
              <i className="type-icon fas fa-bus"></i>
              <i className="type-icon fas fa-landmark selected-icon"></i>{" "}
              Historical
            </li>
          );
        } else if (item.type == "Romantic") {
          typeOutput = (
            <li className="item-type">
              <i className="type-icon fas fa-futbol"></i>
              <i className="type-icon fas fa-praying-hands"></i>
              <i className="type-icon fas fa-graduation-cap"></i>
              <i className="type-icon fas fa-hiking"></i>
              <i className="type-icon fas fa-business-time"></i>
              <i className="type-icon fas fa-bus"></i>
              <i className="type-icon fas fa-landmark"></i>
              <i className="type-icon fas fa-heart selected-icon"></i> Romantic
            </li>
          );
        } else if (item.type == "Outdoor") {
          typeOutput = (
            <li className="item-type">
              <i className="type-icon fas fa-futbol"></i>
              <i className="type-icon fas fa-praying-hands"></i>
              <i className="type-icon fas fa-graduation-cap"></i>
              <i className="type-icon fas fa-heart"></i>
              <i className="type-icon fas fa-business-time"></i>
              <i className="type-icon fas fa-bus"></i>
              <i className="type-icon fas fa-landmark"></i>
              <i className="type-icon fas fa-hiking selected-icon"></i> Outdoor
            </li>
          );
        } else if (item.type == "Business") {
          typeOutput = (
            <li className="item-type">
              <i className="type-icon fas fa-futbol"></i>
              <i className="type-icon fas fa-praying-hands"></i>
              <i className="type-icon fas fa-graduation-cap"></i>
              <i className="type-icon fas fa-heart"></i>
              <i className="type-icon fas fa-hiking"></i>
              <i className="type-icon fas fa-bus"></i>
              <i className="type-icon fas fa-landmark"></i>
              <i className="type-icon fas fa-business-time selected-icon"></i>{" "}
              Business
            </li>
          );
        } else if (item.type == "Tourist") {
          typeOutput = (
            <li className="item-type">
              <i className="type-icon fas fa-futbol"></i>
              <i className="type-icon fas fa-praying-hands"></i>
              <i className="type-icon fas fa-graduation-cap"></i>
              <i className="type-icon fas fa-heart"></i>
              <i className="type-icon fas fa-hiking"></i>
              <i className="type-icon fas fa-business-time"></i>
              <i className="type-icon fas fa-landmark"></i>
              <i className="type-icon fas fa-bus selected-icon"></i> Tourist
            </li>
          );
        } else if (item.type == "Religious") {
          typeOutput = (
            <li className="item-type">
              <i className="type-icon fas fa-futbol"></i>
              <i className="type-icon fas fa-graduation-cap"></i>
              <i className="type-icon fas fa-heart"></i>
              <i className="type-icon fas fa-hiking"></i>
              <i className="type-icon fas fa-business-time"></i>
              <i className="type-icon fas fa-bus"></i>
              <i className="type-icon fas fa-landmark"></i>
              <i className="type-icon fas fa-praying-hands  selected-icon"></i>{" "}
              Religious
            </li>
          );
        } else if (item.type == "Sport") {
          typeOutput = (
            <li className="item-type">
              <i className="type-icon fas fa-praying-hands"></i>
              <i className="type-icon fas fa-graduation-cap"></i>
              <i className="type-icon fas fa-heart"></i>
              <i className="type-icon fas fa-hiking"></i>
              <i className="type-icon fas fa-business-time"></i>
              <i className="type-icon fas fa-bus"></i>
              <i className="type-icon fas fa-landmark"></i>
              <i className="type-icon fas fa-futbol  selected-icon"></i> Sport
            </li>
          );
        } else if (item.type == "Educational") {
          typeOutput = (
            <li className="item-type">
              <i className="type-icon fas fa-futbol"></i>
              <i className="type-icon fas fa-praying-hands"></i>
              <i className="type-icon fas fa-heart"></i>
              <i className="type-icon fas fa-hiking"></i>
              <i className="type-icon fas fa-business-time"></i>
              <i className="type-icon fas fa-bus"></i>
              <i className="type-icon fas fa-landmark"></i>
              <i className="type-icon fas fa-graduation-cap  selected-icon"></i>{" "}
              Educational
            </li>
          );
        }

        return (
          <div className="item-wrapper" key={key}>
            <div className="item-column">
              <iframe
                className="item-image"
                width="100%"
                height="350"
                id="gmap_canvas"
                src={iFrameUrl}
                frameBorder="0"
                scrolling="no"
                alt={item.keyword}
              ></iframe>
            </div>
            <div className="item-column">
              <h3 className="item-title">{item.keyword}</h3>
              <p className="item-notes">{item.notes}</p>
              <ul className="item-details">
                {ratingOutput}
                {costOutput}
                <li className="item-currency">{item.currency}</li>
                {typeOutput}
                <li className="item-language">{item.language}</li>
                <li className="item-category">
                  {item.category}
                  {categoryButtonOutput}
                </li>
                {privacyOutput}
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
          </div>
        );
      });
    }

    return (
      <div>
        <section className="dashboard-page">
          <h1>Travel Dashboard</h1>
          {showItemByUserId}
        </section>
      </div>
    );
  }
}

export default DashboardPage;
