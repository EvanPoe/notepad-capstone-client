import React, { Component } from "react";
import config from "../config";
import { Link } from "react-router-dom";

export class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      publicItems: [],
    };
  }

  componentDidMount() {
    let getpublicItemsUrl = `${config.API_ENDPOINT}/items/public`;

    fetch(getpublicItemsUrl)
      .then((itemsInList) => itemsInList.json())
      .then((itemsInList) => {
        // console.log(itemsInList);
        this.setState({
          publicItems: itemsInList,
        });
        // console.log(this.state);
      })

      .catch((error) => this.setState({ error }));
  }
  render() {

    let showPublicItem = "";

    if (this.state.publicItems.length == 0) {
      showPublicItem = <p>No Items</p>;
    } else {
      showPublicItem = this.state.publicItems.map((item, key) => {
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

        // let privacyOutput = "";
        // if (item.is_public == 0) {
        //   privacyOutput = <li className="is-public">Private</li>;
        // } else {
        //   privacyOutput = <li className="is-public">Public</li>;
        // }

        

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
                </li>
                {/* {privacyOutput} */}
              </ul>
            </div>
          </div>
        );
      });
    }

        


    return (
      <div>
        <section className="landing-page">
          <h1>Travel Bucket</h1>
          {showPublicItem}
          </section>
      </div>
    );
  }
}

export default LandingPage;
