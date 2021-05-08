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
    let currentUser = TokenService.getUserId();
    // console.log(currentUser);

    //if the user is not logged in, send him to landing page
    if (!TokenService.hasAuthToken()) {
      window.location = "/";
    }

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
      category: userInputData.category,
      rating: parseInt(userInputData.rating),
      cost: parseInt(userInputData.cost),
      currency: userInputData.currency,
      language: userInputData.language,
      type: userInputData.type,
      notes: userInputData.notes,
      is_public: parseInt(userInputData.is_public),
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
              <label htmlFor="keyword-search">Enter a keyword</label>
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
              <label htmlFor="visted">Have you been here before?</label>
              <select name="category" id="visited" required>
                <option value="" disabled>
                  Select Bucket Status
                </option>
                {this.state.currentItem.category == "Been There Done That!" ? (
                  <option value="Been There Done That!" selected>
                    Been There Done That!
                  </option>
                ) : (
                  <option value="Been There Done That!">
                    Been There Done That!
                  </option>
                )}
                {this.state.currentItem.category == "On My List!" ? (
                  <option value="On My List!" selected>
                    On My List!
                  </option>
                ) : (
                  <option value="On My List!">On My List!</option>
                )}
              </select>
            </div>
            <div className="form-item">
              <label htmlFor="rating">How would you rate this location?:</label>
              <select name="rating" id="rating">
                <option value="" disabled>
                  Select Rating
                </option>
                {this.state.currentItem.rating == "1" ? (
                  <option value="1" selected>
                    1 Star
                  </option>
                ) : (
                  <option value="1">1 Star</option>
                )}
                {this.state.currentItem.rating == "2" ? (
                  <option value="2" selected>
                    2 Stars
                  </option>
                ) : (
                  <option value="2">2 Stars</option>
                )}
                {this.state.currentItem.rating == "3" ? (
                  <option value="3" selected>
                    3 Stars
                  </option>
                ) : (
                  <option value="3">3 Stars</option>
                )}
                {this.state.currentItem.rating == "4" ? (
                  <option value="4" selected>
                    4 Stars
                  </option>
                ) : (
                  <option value="4">4 Stars</option>
                )}

                {this.state.currentItem.rating == "5" ? (
                  <option value="5" selected>
                    5 Stars
                  </option>
                ) : (
                  <option value="5">5 Stars</option>
                )}
              </select>
            </div>

            <div className="form-item">
              <label htmlFor="cost">
                How would you rate this location's cost?:
              </label>
              <select name="cost" id="cost">
                <option value="" disabled>
                  Select Cost
                </option>
                {this.state.currentItem.cost == "1" ? (
                  <option value="1" selected>
                    $
                  </option>
                ) : (
                  <option value="1">$</option>
                )}
                {this.state.currentItem.cost == "2" ? (
                  <option value="2" selected>
                    $$
                  </option>
                ) : (
                  <option value="2">$$</option>
                )}
                {this.state.currentItem.cost == "3" ? (
                  <option value="3" selected>
                    $$$
                  </option>
                ) : (
                  <option value="3">$$$</option>
                )}
              </select>
            </div>

            <div className="form-item">
              <label htmlFor="language">
                What language is primarily spoken here?:
              </label>
              <select
                name="language"
                id="language"
                data-placeholder="Choose a Language..."
              >
                <option value="" disabled>
                  Select Language
                </option>

                {this.state.currentItem.language == "English" ? (
                  <option value="English" selected>
                    English
                  </option>
                ) : (
                  <option value="English">English</option>
                )}

                {this.state.currentItem.language == "Afrikaans" ? (
                  <option value="Afrikaans" selected>
                    Afrikaans
                  </option>
                ) : (
                  <option value="Afrikaans">Afrikaans</option>
                )}

                {this.state.currentItem.language == "Albanian" ? (
                  <option value="Albanian" selected>
                    Albanian
                  </option>
                ) : (
                  <option value="Albanian">Albanian</option>
                )}

                {this.state.currentItem.language == "Arabic" ? (
                  <option value="Arabic" selected>
                    Arabic
                  </option>
                ) : (
                  <option value="Arabic">Arabic</option>
                )}

                {this.state.currentItem.language == "Armenian" ? (
                  <option value="Armenian" selected>
                    Armenian
                  </option>
                ) : (
                  <option value="Armenian">Armenian</option>
                )}
                {this.state.currentItem.language == "Basque" ? (
                  <option value="Basque" selected>
                    Basque
                  </option>
                ) : (
                  <option value="Basque">Basque</option>
                )}
                {this.state.currentItem.language == "Bengali" ? (
                  <option value="Bengali" selected>
                    Bengali
                  </option>
                ) : (
                  <option value="Bengali">Bengali</option>
                )}
                {this.state.currentItem.language == "Bulgarian" ? (
                  <option value="Bulgarian" selected>
                    Bulgarian
                  </option>
                ) : (
                  <option value="Bulgarian">Bulgarian</option>
                )}
                {this.state.currentItem.language == "Catalan" ? (
                  <option value="Catalan" selected>
                    Catalan
                  </option>
                ) : (
                  <option value="Catalan">Catalan</option>
                )}

                {this.state.currentItem.language == "Cambodian" ? (
                  <option value="Cambodian" selected>
                    Cambodian
                  </option>
                ) : (
                  <option value="Cambodian">Cambodian</option>
                )}
                {this.state.currentItem.language == "Chinese (Mandarin)" ? (
                  <option value="Chinese (Mandarin)" selected>
                    Chinese (Mandarin)
                  </option>
                ) : (
                  <option value="Chinese (Mandarin)">Chinese (Mandarin)</option>
                )}
                {this.state.currentItem.language == "Croatian" ? (
                  <option value="Croatian" selected>
                    Croatian
                  </option>
                ) : (
                  <option value="Croatian">Croatian</option>
                )}
                {this.state.currentItem.language == "Czech" ? (
                  <option value="Czech" selected>
                    Czech
                  </option>
                ) : (
                  <option value="Czech">Czech</option>
                )}
                {this.state.currentItem.language == "Danish" ? (
                  <option value="Danish" selected>
                    Danish
                  </option>
                ) : (
                  <option value="Danish">Danish</option>
                )}
                {this.state.currentItem.language == "Dutch" ? (
                  <option value="Dutch" selected>
                    Dutch
                  </option>
                ) : (
                  <option value="Dutch">Dutch</option>
                )}
                {this.state.currentItem.language == "Estonian" ? (
                  <option value="Estonian" selected>
                    Estonian
                  </option>
                ) : (
                  <option value="Estonian">Estonian</option>
                )}
                {this.state.currentItem.language == "Fiji" ? (
                  <option value="Fiji" selected>
                    Fiji
                  </option>
                ) : (
                  <option value="Fiji">Fiji</option>
                )}
                {this.state.currentItem.language == "Finnish" ? (
                  <option value="Finnish" selected>
                    Finnish
                  </option>
                ) : (
                  <option value="Finnish">Finnish</option>
                )}
                {this.state.currentItem.language == "French" ? (
                  <option value="French" selected>
                    French
                  </option>
                ) : (
                  <option value="French">French</option>
                )}
                {this.state.currentItem.language == "Georgian" ? (
                  <option value="Georgian" selected>
                    Georgian
                  </option>
                ) : (
                  <option value="Georgian">Georgian</option>
                )}

                {this.state.currentItem.language == "German" ? (
                  <option value="German" selected>
                    German
                  </option>
                ) : (
                  <option value="German">German</option>
                )}
                {this.state.currentItem.language == "Greek" ? (
                  <option value="Greek" selected>
                    Greek
                  </option>
                ) : (
                  <option value="Greek">Greek</option>
                )}
                {this.state.currentItem.language == "Gujarati" ? (
                  <option value="Gujarati" selected>
                    Gujarati
                  </option>
                ) : (
                  <option value="Gujarati">Gujarati</option>
                )}
                {this.state.currentItem.language == "Hebrew" ? (
                  <option value="Hebrew" selected>
                    Hebrew
                  </option>
                ) : (
                  <option value="Hebrew">Hebrew</option>
                )}
                {this.state.currentItem.language == "Hindi" ? (
                  <option value="Hindi" selected>
                    Hindi
                  </option>
                ) : (
                  <option value="Hindi">Hindi</option>
                )}
                {this.state.currentItem.language == "Hungarian" ? (
                  <option value="Hungarian" selected>
                    Hungarian
                  </option>
                ) : (
                  <option value="Hungarian">Hungarian</option>
                )}
                {this.state.currentItem.language == "Icelandic" ? (
                  <option value="Icelandic" selected>
                    Icelandic
                  </option>
                ) : (
                  <option value="Icelandic">Icelandic</option>
                )}
                {this.state.currentItem.language == "Indonesian" ? (
                  <option value="Indonesian" selected>
                    Indonesian
                  </option>
                ) : (
                  <option value="Indonesian">Indonesian</option>
                )}
                {this.state.currentItem.language == "Irish" ? (
                  <option value="Irish" selected>
                    Irish
                  </option>
                ) : (
                  <option value="Irish">Irish</option>
                )}
                {this.state.currentItem.language == "Italian" ? (
                  <option value="Italian" selected>
                    Italian
                  </option>
                ) : (
                  <option value="Italian">Italian</option>
                )}
                {this.state.currentItem.language == "Japanese" ? (
                  <option value="Japanese" selected>
                    Japanese
                  </option>
                ) : (
                  <option value="Japanese">Japanese</option>
                )}
                {this.state.currentItem.language == "Javanese" ? (
                  <option value="Javanese" selected>
                    Javanese
                  </option>
                ) : (
                  <option value="Javanese">Javanese</option>
                )}
                {this.state.currentItem.language == "Korean" ? (
                  <option value="Korean" selected>
                    Korean
                  </option>
                ) : (
                  <option value="Korean">Korean</option>
                )}
                {this.state.currentItem.language == "Latin" ? (
                  <option value="Latin" selected>
                    Latin
                  </option>
                ) : (
                  <option value="Latin">Latin</option>
                )}
                {this.state.currentItem.language == "Latvian" ? (
                  <option value="Latvian" selected>
                    Latvian
                  </option>
                ) : (
                  <option value="Latvian">Latvian</option>
                )}
                {this.state.currentItem.language == "Lithuanian" ? (
                  <option value="Lithuanian" selected>
                    Lithuanian
                  </option>
                ) : (
                  <option value="Lithuanian">Lithuanian</option>
                )}

                {this.state.currentItem.language == "Macedonian" ? (
                  <option value="Macedonian" selected>
                    Macedonian
                  </option>
                ) : (
                  <option value="Macedonian">Macedonian</option>
                )}

                {this.state.currentItem.language == "Malay" ? (
                  <option value="Malay" selected>
                    Malay
                  </option>
                ) : (
                  <option value="Malay">Malay</option>
                )}

                {this.state.currentItem.language == "Malayalam" ? (
                  <option value="Malayalam" selected>
                    Malayalam
                  </option>
                ) : (
                  <option value="Malayalam">Malayalam</option>
                )}

                {this.state.currentItem.language == "Maltese" ? (
                  <option value="Maltese" selected>
                    Maltese
                  </option>
                ) : (
                  <option value="Maltese">Maltese</option>
                )}

                {this.state.currentItem.language == "Maori" ? (
                  <option value="Maori" selected>
                    Maori
                  </option>
                ) : (
                  <option value="Maori">Maori</option>
                )}

                {this.state.currentItem.language == "Marathi" ? (
                  <option value="Marathi" selected>
                    Marathi
                  </option>
                ) : (
                  <option value="Marathi">Marathi</option>
                )}

                {this.state.currentItem.language == "Mongolian" ? (
                  <option value="Mongolian" selected>
                    Mongolian
                  </option>
                ) : (
                  <option value="Mongolian">Mongolian</option>
                )}

                {this.state.currentItem.language == "Nepali" ? (
                  <option value="Nepali" selected>
                    Nepali
                  </option>
                ) : (
                  <option value="Nepali">Nepali</option>
                )}

                {this.state.currentItem.language == "Norwegian" ? (
                  <option value="Norwegian" selected>
                    Norwegian
                  </option>
                ) : (
                  <option value="Norwegian">Norwegian</option>
                )}

                {this.state.currentItem.language == "Persian" ? (
                  <option value="Persian" selected>
                    Persian
                  </option>
                ) : (
                  <option value="Persian">Persian</option>
                )}

                {this.state.currentItem.language == "Polish" ? (
                  <option value="Polish" selected>
                    Polish
                  </option>
                ) : (
                  <option value="Polish">Polish</option>
                )}

                {this.state.currentItem.language == "Portuguese" ? (
                  <option value="Portuguese" selected>
                    Portuguese
                  </option>
                ) : (
                  <option value="Portuguese">Portuguese</option>
                )}

                {this.state.currentItem.language == "Punjabi" ? (
                  <option value="Punjabi" selected>
                    Punjabi
                  </option>
                ) : (
                  <option value="Punjabi">Punjabi</option>
                )}

                {this.state.currentItem.language == "Quechua" ? (
                  <option value="Quechua" selected>
                    Quechua
                  </option>
                ) : (
                  <option value="Quechua">Quechua</option>
                )}

                {this.state.currentItem.language == "Romanian" ? (
                  <option value="Romanian" selected>
                    Romanian
                  </option>
                ) : (
                  <option value="Romanian">Romanian</option>
                )}

                {this.state.currentItem.language == "Russian" ? (
                  <option value="Russian" selected>
                    Russian
                  </option>
                ) : (
                  <option value="Russian">Russian</option>
                )}

                {this.state.currentItem.language == "Samoan" ? (
                  <option value="Samoan" selected>
                    Samoan
                  </option>
                ) : (
                  <option value="Samoan">Samoan</option>
                )}

                {this.state.currentItem.language == "Serbian" ? (
                  <option value="Serbian" selected>
                    Serbian
                  </option>
                ) : (
                  <option value="Serbian">Serbian</option>
                )}

                {this.state.currentItem.language == "Slovak" ? (
                  <option value="Slovak" selected>
                    Slovak
                  </option>
                ) : (
                  <option value="Slovak">Slovak</option>
                )}

                {this.state.currentItem.language == "Slovenian" ? (
                  <option value="Slovenian" selected>
                    Slovenian
                  </option>
                ) : (
                  <option value="Slovenian">Slovenian</option>
                )}

                {this.state.currentItem.language == "Spanish" ? (
                  <option value="Spanish" selected>
                    Spanish
                  </option>
                ) : (
                  <option value="Spanish">Spanish</option>
                )}

                {this.state.currentItem.language == "Swahili" ? (
                  <option value="Swahili" selected>
                    Swahili
                  </option>
                ) : (
                  <option value="Swahili">Swahili</option>
                )}

                {this.state.currentItem.language == "Swedish" ? (
                  <option value="Swedish" selected>
                    Swedish
                  </option>
                ) : (
                  <option value="Swedish">Swedish</option>
                )}

                {this.state.currentItem.language == "Tamil" ? (
                  <option value="Tamil" selected>
                    Tamil
                  </option>
                ) : (
                  <option value="Tamil">Tamil</option>
                )}

                {this.state.currentItem.language == "Tatar" ? (
                  <option value="Tatar" selected>
                    Tatar
                  </option>
                ) : (
                  <option value="Tatar">Tatar</option>
                )}

                {this.state.currentItem.language == "Telugu" ? (
                  <option value="Telugu" selected>
                    Telugu
                  </option>
                ) : (
                  <option value="Telugu">Telugu</option>
                )}

                {this.state.currentItem.language == "Thai" ? (
                  <option value="Thai" selected>
                    Thai
                  </option>
                ) : (
                  <option value="Thai">Thai</option>
                )}

                {this.state.currentItem.language == "Tibetan" ? (
                  <option value="Tibetan" selected>
                    Tibetan
                  </option>
                ) : (
                  <option value="Tibetan">Tibetan</option>
                )}

                {this.state.currentItem.language == "Tonga" ? (
                  <option value="Tonga" selected>
                    Tonga
                  </option>
                ) : (
                  <option value="Tonga">Tonga</option>
                )}

                {this.state.currentItem.language == "Turkish" ? (
                  <option value="Turkish" selected>
                    Turkish
                  </option>
                ) : (
                  <option value="Turkish">Turkish</option>
                )}

                {this.state.currentItem.language == "Ukrainian" ? (
                  <option value="Ukrainian" selected>
                    Ukrainian
                  </option>
                ) : (
                  <option value="Ukrainian">Ukrainian</option>
                )}

                {this.state.currentItem.language == "Urdu" ? (
                  <option value="Urdu" selected>
                    Urdu
                  </option>
                ) : (
                  <option value="Urdu">Urdu</option>
                )}

                {this.state.currentItem.language == "Uzbek" ? (
                  <option value="Uzbek" selected>
                    Uzbek
                  </option>
                ) : (
                  <option value="Uzbek">Uzbek</option>
                )}

                {this.state.currentItem.language == "Vietnamese" ? (
                  <option value="Vietnamese" selected>
                    Vietnamese
                  </option>
                ) : (
                  <option value="Vietnamese">Vietnamese</option>
                )}

                {this.state.currentItem.language == "Welsh" ? (
                  <option value="Welsh" selected>
                    Welsh
                  </option>
                ) : (
                  <option value="Welsh">Welsh</option>
                )}

                {this.state.currentItem.language == "Xhosa" ? (
                  <option value="Xhosa" selected>
                    Xhosa
                  </option>
                ) : (
                  <option value="Xhosa">Xhosa</option>
                )}
              </select>
            </div>

            <div className="form-item">
              <label htmlFor="type">
                What kind of trip would you suggest?:
              </label>
              <select name="type" id="type">
                <option value="" disabled>
                  Select Type
                </option>
                {this.state.currentItem.type == "Historical" ? (
                  <option value="Historical" selected>
                    Historical
                  </option>
                ) : (
                  <option value="Historical">Historical</option>
                )}
                {this.state.currentItem.type == "Romantic" ? (
                  <option value="Romantic" selected>
                    Romantic
                  </option>
                ) : (
                  <option value="Romantic">Romantic</option>
                )}
                {this.state.currentItem.type == "Outdoor" ? (
                  <option value="Outdoor" selected>
                    Outdoor
                  </option>
                ) : (
                  <option value="Outdoor">Outdoor</option>
                )}
                {this.state.currentItem.type == "Business" ? (
                  <option value="Business" selected>
                    Business
                  </option>
                ) : (
                  <option value="Business">Business</option>
                )}
                {this.state.currentItem.type == "Tourist" ? (
                  <option value="Tourist" selected>
                    Tourist
                  </option>
                ) : (
                  <option value="Tourist">Tourist</option>
                )}
                {this.state.currentItem.type == "Religious" ? (
                  <option value="Religious" selected>
                    Religious
                  </option>
                ) : (
                  <option value="Religious">Religious</option>
                )}
                {this.state.currentItem.type == "Sport" ? (
                  <option value="Sport" selected>
                    Sport
                  </option>
                ) : (
                  <option value="Sport">Sport</option>
                )}
                {this.state.currentItem.type == "Educational" ? (
                  <option value="Educational" selected>
                    Educational
                  </option>
                ) : (
                  <option value="Educational">Educational</option>
                )}
              </select>
            </div>

            <div className="form-item">
              <label htmlFor="currencies">
                What is this region's currency?
              </label>
              <select name="currency" id="currencies">
                <option value="" disabled>
                  Select Currency
                </option>
                {this.state.currentItem.currency ==
                "America (United States) Dollars - USD" ? (
                  <option
                    value="America (United States) Dollars - USD"
                    selected
                  >
                    America (United States) Dollars - USD
                  </option>
                ) : (
                  <option value="America (United States) Dollars - USD">
                    America (United States) Dollars - USD
                  </option>
                )}
                {this.state.currentItem.currency ==
                "Afghanistan Afghanis - AFN" ? (
                  <option value="Afghanistan Afghanis - AFN" selected>
                    Afghanistan Afghanis - AFN
                  </option>
                ) : (
                  <option value="Afghanistan Afghanis - AFN">
                    Afghanistan Afghanis - AFN
                  </option>
                )}
                {this.state.currentItem.currency == "Albania Leke - ALL" ? (
                  <option value="Albania Leke - ALL" selected>
                    Albania Leke - ALL
                  </option>
                ) : (
                  <option value="Albania Leke - ALL">Albania Leke - ALL</option>
                )}
                {this.state.currentItem.currency == "Algeria Dinars - DZD" ? (
                  <option value="Algeria Dinars - DZD" selected>
                    Algeria Dinars - DZD
                  </option>
                ) : (
                  <option value="Algeria Dinars - DZD">
                    Algeria Dinars - DZD
                  </option>
                )}
                {this.state.currentItem.currency == "Argentina Pesos - ARS" ? (
                  <option value="Argentina Pesos - ARS" selected>
                    Argentina Pesos - ARS
                  </option>
                ) : (
                  <option value="Argentina Pesos - ARS">
                    Argentina Pesos - ARS
                  </option>
                )}
                {this.state.currentItem.currency ==
                "Australia Dollars - AUD" ? (
                  <option value="Australia Dollars - AUD" selected>
                    Australia Dollars - AUD
                  </option>
                ) : (
                  <option value="Australia Dollars - AUD">
                    Australia Dollars - AUD
                  </option>
                )}
                {this.state.currentItem.currency ==
                "Austria Schillings - ATS" ? (
                  <option value="Austria Schillings - ATS" selected>
                    Austria Schillings - ATS
                  </option>
                ) : (
                  <option value="Austria Schillings - ATS">
                    Austria Schillings - ATS
                  </option>
                )}
                {this.state.currentItem.currency == "Bahamas Dollars - BSD" ? (
                  <option value="Bahamas Dollars - BSD" selected>
                    Bahamas Dollars - BSD
                  </option>
                ) : (
                  <option value="Bahamas Dollars - BSD">
                    ABahamas Dollars - BSD
                  </option>
                )}
                {this.state.currentItem.currency == "Bahrain Dinars - BHD" ? (
                  <option value="Bahrain Dinars - BHD" selected>
                    Bahrain Dinars - BHD
                  </option>
                ) : (
                  <option value="Bahrain Dinars - BHD">
                    Bahrain Dinars - BHD
                  </option>
                )}
                {this.state.currentItem.currency == "Bangladesh Taka - BDT" ? (
                  <option value="Bangladesh Taka - BDT" selected>
                    Bangladesh Taka - BDT
                  </option>
                ) : (
                  <option value="Bangladesh Taka - BDT">
                    Bangladesh Taka - BDT
                  </option>
                )}
                {this.state.currentItem.currency == "Barbados Dollars - BBD" ? (
                  <option value="Barbados Dollars - BBD" selected>
                    Barbados Dollars - BBD
                  </option>
                ) : (
                  <option value="Barbados Dollars - BBD">
                    Barbados Dollars - BBD
                  </option>
                )}
                {this.state.currentItem.currency == "Belgium Francs - BEF" ? (
                  <option value="Belgium Francs - BEF" selected>
                    Belgium Francs - BEF
                  </option>
                ) : (
                  <option value="Belgium Francs - BEF">
                    Belgium Francs - BEF
                  </option>
                )}
                {this.state.currentItem.currency == "Bermuda Dollars - BMD" ? (
                  <option value="Bermuda Dollars - BMD" selected>
                    Bermuda Dollars - BMD
                  </option>
                ) : (
                  <option value="Bermuda Dollars - BMD">
                    Bermuda Dollars - BMD
                  </option>
                )}
                {this.state.currentItem.currency == "Brazil Reals - BRL" ? (
                  <option value="Brazil Reals - BRL" selected>
                    Brazil Reals - BRL
                  </option>
                ) : (
                  <option value="Brazil Reals - BRL">Brazil Reals - BRL</option>
                )}
                {this.state.currentItem.currency == "Bulgaria Leva - BGN" ? (
                  <option value="Bulgaria Leva - BGN" selected>
                    Bulgaria Leva - BGN
                  </option>
                ) : (
                  <option value="Bulgaria Leva - BGN">
                    Bulgaria Leva - BGN
                  </option>
                )}
                {this.state.currentItem.currency == "Canada Dollars - CAD" ? (
                  <option value="Canada Dollars - CAD" selected>
                    Canada Dollars - CAD
                  </option>
                ) : (
                  <option value="Canada Dollars - CAD">
                    Canada Dollars - CAD
                  </option>
                )}
                {this.state.currentItem.currency == "CFA BCEAO Francs - XOF" ? (
                  <option value="CFA BCEAO Francs - XOF" selected>
                    CFA BCEAO Francs - XOF
                  </option>
                ) : (
                  <option value="CFA BCEAO Francs - XOF">
                    CFA BCEAO Francs - XOF
                  </option>
                )}
                {this.state.currentItem.currency == "CFA BEAC Francs - XAF" ? (
                  <option value="CFA BEAC Francs - XAF" selected>
                    CFA BEAC Francs - XAF
                  </option>
                ) : (
                  <option value="CFA BEAC Francs - XAF">
                    CFA BEAC Francs - XAF
                  </option>
                )}
                {this.state.currentItem.currency == "Chile Pesos - CLP" ? (
                  <option value="Chile Pesos - CLP" selected>
                    Chile Pesos - CLP
                  </option>
                ) : (
                  <option value="Chile Pesos - CLP">Chile Pesos - CLP</option>
                )}
                {this.state.currentItem.currency ==
                "China Yuan Renminbi - CNY" ? (
                  <option value="China Yuan Renminbi - CNY" selected>
                    China Yuan Renminbi - CNY
                  </option>
                ) : (
                  <option value="China Yuan Renminbi - CNY">
                    China Yuan Renminbi - CNY
                  </option>
                )}
                {this.state.currentItem.currency ==
                "RMB (China Yuan Renminbi) - CNY" ? (
                  <option value="RMB (China Yuan Renminbi) - CNY" selected>
                    RMB (China Yuan Renminbi) - CNY
                  </option>
                ) : (
                  <option value="RMB (China Yuan Renminbi) - CNY">
                    RMB (China Yuan Renminbi) - CNY
                  </option>
                )}
                {this.state.currentItem.currency == "Colombia Pesos - COP" ? (
                  <option value="Colombia Pesos - COP" selected>
                    Colombia Pesos - COP
                  </option>
                ) : (
                  <option value="Colombia Pesos - COP">
                    Colombia Pesos - COP
                  </option>
                )}
                {this.state.currentItem.currency == "CFP Francs - XPF" ? (
                  <option value="CFP Francs - XPF" selected>
                    CFP Francs - XPF
                  </option>
                ) : (
                  <option value="CFP Francs - XPF">CFP Francs - XPF</option>
                )}
                {this.state.currentItem.currency ==
                "Costa Rica Colones - CRC" ? (
                  <option value="Costa Rica Colones - CRC" selected>
                    Costa Rica Colones - CRC
                  </option>
                ) : (
                  <option value="Costa Rica Colones - CRC">
                    Costa Rica Colones - CRC
                  </option>
                )}
                {this.state.currentItem.currency == "Croatia Kuna - HRK" ? (
                  <option value="Croatia Kuna - HRK" selected>
                    Croatia Kuna - HRK
                  </option>
                ) : (
                  <option value="Croatia Kuna - HRK">Croatia Kuna - HRK</option>
                )}
                {this.state.currentItem.currency == "Cyprus Pounds - CYP" ? (
                  <option value="Cyprus Pounds - CYP" selected>
                    Cyprus Pounds - CYP
                  </option>
                ) : (
                  <option value="Cyprus Pounds - CYP">
                    Cyprus Pounds - CYP
                  </option>
                )}
                {this.state.currentItem.currency ==
                "Czech Republic Koruny - CZK" ? (
                  <option value="Czech Republic Koruny - CZK" selected>
                    Czech Republic Koruny - CZK
                  </option>
                ) : (
                  <option value="Czech Republic Koruny - CZK">
                    Czech Republic Koruny - CZK
                  </option>
                )}
                {this.state.currentItem.currency == "Denmark Kroner - DKK" ? (
                  <option value="Denmark Kroner - DKK" selected>
                    Denmark Kroner - DKK
                  </option>
                ) : (
                  <option value="Denmark Kroner - DKK">
                    Denmark Kroner - DKK
                  </option>
                )}
                {this.state.currentItem.currency ==
                "Deutsche (Germany) Marks - DEM" ? (
                  <option value="Deutsche (Germany) Marks - DEM" selected>
                    Deutsche (Germany) Marks - DEM
                  </option>
                ) : (
                  <option value="Deutsche (Germany) Marks - DEM">
                    Deutsche (Germany) Marks - DEM
                  </option>
                )}
                {this.state.currentItem.currency ==
                "Dominican Republic Pesos - DOP" ? (
                  <option value="Dominican Republic Pesos - DOP" selected>
                    Dominican Republic Pesos - DOP
                  </option>
                ) : (
                  <option value="Dominican Republic Pesos - DOP">
                    Dominican Republic Pesos - DOP
                  </option>
                )}
                {this.state.currentItem.currency ==
                "Dutch (Netherlands) Guilders - NLG" ? (
                  <option value="Dutch (Netherlands) Guilders - NLG" selected>
                    Dutch (Netherlands) Guilders - NLG
                  </option>
                ) : (
                  <option value="Dutch (Netherlands) Guilders - NLG">
                    Dutch (Netherlands) Guilders - NLG
                  </option>
                )}
                {this.state.currentItem.currency ==
                "Eastern Caribbean Dollars - XCD" ? (
                  <option value="Eastern Caribbean Dollars - XCD" selected>
                    Eastern Caribbean Dollars - XCD
                  </option>
                ) : (
                  <option value="Eastern Caribbean Dollars - XCD">
                    Eastern Caribbean Dollars - XCD
                  </option>
                )}
                {this.state.currentItem.currency == "Egypt Pounds - EGP" ? (
                  <option value="Egypt Pounds - EGP" selected>
                    Egypt Pounds - EGP
                  </option>
                ) : (
                  <option value="Egypt Pounds - EGP">Egypt Pounds - EGP</option>
                )}
                {this.state.currentItem.currency == "Estonia Krooni - EEK" ? (
                  <option value="Estonia Krooni - EEK" selected>
                    Estonia Krooni - EEK
                  </option>
                ) : (
                  <option value="Estonia Krooni - EEK">
                    Estonia Krooni - EEK
                  </option>
                )}
                {this.state.currentItem.currency == "Euro - EUR" ? (
                  <option value="Euro - EUR" selected>
                    Euro - EUR
                  </option>
                ) : (
                  <option value="Euro - EUR">Euro - EUR</option>
                )}
                {this.state.currentItem.currency == "Fiji Dollars - FJD" ? (
                  <option value="Fiji Dollars - FJD" selected>
                    Fiji Dollars - FJD
                  </option>
                ) : (
                  <option value="Fiji Dollars - FJD">Fiji Dollars - FJD</option>
                )}
                {this.state.currentItem.currency == "Finland Markkaa - FIM" ? (
                  <option value="Finland Markkaa - FIM" selected>
                    Finland Markkaa - FIM
                  </option>
                ) : (
                  <option value="Finland Markkaa - FIM">
                    Finland Markkaa - FIM
                  </option>
                )}
                {this.state.currentItem.currency == "France Francs - FRF" ? (
                  <option value="France Francs - FRF" selected>
                    France Francs - FRF
                  </option>
                ) : (
                  <option value="France Francs - FRF">
                    France Francs - FRF
                  </option>
                )}
                {this.state.currentItem.currency ==
                "Germany Deutsche Marks - DEM" ? (
                  <option value="Germany Deutsche Marks - DEM" selected>
                    Germany Deutsche Marks - DEM
                  </option>
                ) : (
                  <option value="Germany Deutsche Marks - DEM">
                    Germany Deutsche Marks - DEM
                  </option>
                )}
                {this.state.currentItem.currency == "Gold Ounces - XAU" ? (
                  <option value="Gold Ounces - XAU" selected>
                    Gold Ounces - XAU
                  </option>
                ) : (
                  <option value="Gold Ounces - XAU">Gold Ounces - XAU</option>
                )}
                {this.state.currentItem.currency == "Greece Drachmae - GRD" ? (
                  <option value="Greece Drachmae - GRD" selected>
                    Greece Drachmae - GRD
                  </option>
                ) : (
                  <option value="Greece Drachmae - GRD">
                    Greece Drachmae - GRD
                  </option>
                )}
                {this.state.currentItem.currency ==
                "Guatemalan Quetzal - GTQ" ? (
                  <option value="Guatemalan Quetzal - GTQ" selected>
                    Guatemalan Quetzal - GTQ
                  </option>
                ) : (
                  <option value="Guatemalan Quetzal - GTQ">
                    Guatemalan Quetzal - GTQ
                  </option>
                )}

                {this.state.currentItem.currency ==
                "Holland (Netherlands) Guilders - NLG" ? (
                  <option value="Holland (Netherlands) Guilders - NLG" selected>
                    Holland (Netherlands) Guilders - NLG
                  </option>
                ) : (
                  <option value="Holland (Netherlands) Guilders - NLG">
                    Holland (Netherlands) Guilders - NLG
                  </option>
                )}
                {this.state.currentItem.currency ==
                "Hong Kong Dollars - HKD" ? (
                  <option value="Hong Kong Dollars - HKD" selected>
                    Hong Kong Dollars - HKD
                  </option>
                ) : (
                  <option value="Hong Kong Dollars - HKD">
                    Hong Kong Dollars - HKD
                  </option>
                )}
                {this.state.currentItem.currency == "Hungary Forint - HUF" ? (
                  <option value="Hungary Forint - HUF" selected>
                    Hungary Forint - HUF
                  </option>
                ) : (
                  <option value="Hungary Forint - HUF">
                    Hungary Forint - HUF
                  </option>
                )}
                {this.state.currentItem.currency == "Iceland Kronur - ISK" ? (
                  <option value="Iceland Kronur - ISK" selected>
                    Iceland Kronur - ISK
                  </option>
                ) : (
                  <option value="Iceland Kronur - ISK">
                    Iceland Kronur - ISK
                  </option>
                )}
                {this.state.currentItem.currency ==
                "IMF Special Drawing Right - XDR" ? (
                  <option value="IMF Special Drawing Right - XDR" selected>
                    IMF Special Drawing Right - XDR
                  </option>
                ) : (
                  <option value="IMF Special Drawing Right - XDR">
                    IMF Special Drawing Right - XDR
                  </option>
                )}
                {this.state.currentItem.currency == "India Rupees - INR" ? (
                  <option value="India Rupees - INR" selected>
                    India Rupees - INR
                  </option>
                ) : (
                  <option value="India Rupees - INR">India Rupees - INR</option>
                )}
                {this.state.currentItem.currency ==
                "Indonesia Rupiahs - IDR" ? (
                  <option value="Indonesia Rupiahs - IDR" selected>
                    Indonesia Rupiahs - IDR
                  </option>
                ) : (
                  <option value="Indonesia Rupiahs - IDR">
                    Indonesia Rupiahs - IDR
                  </option>
                )}
                {this.state.currentItem.currency == "Iran Rials - IRR" ? (
                  <option value="Iran Rials - IRR" selected>
                    Iran Rials - IRR
                  </option>
                ) : (
                  <option value="Iran Rials - IRR">Iran Rials - IRR</option>
                )}
                {this.state.currentItem.currency == "Iraq Dinars - IQD" ? (
                  <option value="Iraq Dinars - IQD" selected>
                    Iraq Dinars - IQD
                  </option>
                ) : (
                  <option value="Iraq Dinars - IQD">Iraq Dinars - IQD</option>
                )}
                {this.state.currentItem.currency == "Ireland Pounds - IEP" ? (
                  <option value="Ireland Pounds - IEP" selected>
                    Ireland Pounds - IEP
                  </option>
                ) : (
                  <option value="Ireland Pounds - IEP">
                    Ireland Pounds - IEP
                  </option>
                )}
                {this.state.currentItem.currency ==
                "Israel New Shekels - ILS" ? (
                  <option value="Israel New Shekels - ILS" selected>
                    Israel New Shekels - ILS
                  </option>
                ) : (
                  <option value="Israel New Shekels - ILS">
                    Israel New Shekels - ILS
                  </option>
                )}
                {this.state.currentItem.currency == "Italy Lire - ITL" ? (
                  <option value="Italy Lire - ITL" selected>
                    Italy Lire - ITL
                  </option>
                ) : (
                  <option value="Italy Lire - ITL">Italy Lire - ITL</option>
                )}
                {this.state.currentItem.currency == "Jamaica Dollars - JMD" ? (
                  <option value="Jamaica Dollars - JMD" selected>
                    Jamaica Dollars - JMD
                  </option>
                ) : (
                  <option value="Jamaica Dollars - JMD">
                    Jamaica Dollars - JMD
                  </option>
                )}
                {this.state.currentItem.currency == "Japan Yen - JPY" ? (
                  <option value="Japan Yen - JPY" selected>
                    Japan Yen - JPY
                  </option>
                ) : (
                  <option value="Japan Yen - JPY">Japan Yen - JPY</option>
                )}
                {this.state.currentItem.currency == "Jordan Dinars - JOD" ? (
                  <option value="Jordan Dinars - JOD" selected>
                    Jordan Dinars - JOD
                  </option>
                ) : (
                  <option value="Jordan Dinars - JOD">
                    Jordan Dinars - JOD
                  </option>
                )}
                {this.state.currentItem.currency == "Kenya Shillings - KES" ? (
                  <option value="Kenya Shillings - KES" selected>
                    Kenya Shillings - KES
                  </option>
                ) : (
                  <option value="Kenya Shillings - KES">
                    Kenya Shillings - KES
                  </option>
                )}
                {this.state.currentItem.currency ==
                "Korea (South) Won - KRW" ? (
                  <option value="Korea (South) Won - KRW" selected>
                    Korea (South) Won - KRW
                  </option>
                ) : (
                  <option value="Korea (South) Won - KRW">
                    Korea (South) Won - KRW
                  </option>
                )}
                {this.state.currentItem.currency == "Kuwait Dinars - KWD" ? (
                  <option value="Kuwait Dinars - KWD" selected>
                    Kuwait Dinars - KWD
                  </option>
                ) : (
                  <option value="Kuwait Dinars - KWD">
                    Kuwait Dinars - KWD
                  </option>
                )}
                {this.state.currentItem.currency == "Lebanon Pounds - LBP" ? (
                  <option value="Lebanon Pounds - LBP" selected>
                    Lebanon Pounds - LBP
                  </option>
                ) : (
                  <option value="Lebanon Pounds - LBP">
                    Lebanon Pounds - LBP
                  </option>
                )}
                {this.state.currentItem.currency ==
                "Luxembourg Francs - LUF" ? (
                  <option value="Luxembourg Francs - LUF" selected>
                    Luxembourg Francs - LUF
                  </option>
                ) : (
                  <option value="Luxembourg Francs - LUF">
                    Luxembourg Francs - LUF
                  </option>
                )}
                {this.state.currentItem.currency ==
                "Malaysia Ringgits - MYR" ? (
                  <option value="Malaysia Ringgits - MYR" selected>
                    Malaysia Ringgits - MYR
                  </option>
                ) : (
                  <option value="Malaysia Ringgits - MYR">
                    Malaysia Ringgits - MYR
                  </option>
                )}
                {this.state.currentItem.currency == "Malta Liri - MTL" ? (
                  <option value="Malta Liri - MTL" selected>
                    Malta Liri - MTL
                  </option>
                ) : (
                  <option value="Malta Liri - MTL">Malta Liri - MTL</option>
                )}
                {this.state.currentItem.currency == "Mauritius Rupees - MUR" ? (
                  <option value="Mauritius Rupees - MUR" selected>
                    Mauritius Rupees - MUR
                  </option>
                ) : (
                  <option value="Mauritius Rupees - MUR">
                    Mauritius Rupees - MUR
                  </option>
                )}
                {this.state.currentItem.currency == "Mexico Pesos - MXN" ? (
                  <option value="Mexico Pesos - MXN" selected>
                    Mexico Pesos - MXN
                  </option>
                ) : (
                  <option value="Mexico Pesos - MXN">Mexico Pesos - MXN</option>
                )}
                {this.state.currentItem.currency == "Morocco Dirhams - MAD" ? (
                  <option value="Morocco Dirhams - MAD" selected>
                    Morocco Dirhams - MAD
                  </option>
                ) : (
                  <option value="Morocco Dirhams - MAD">
                    Morocco Dirhams - MAD
                  </option>
                )}
                {this.state.currentItem.currency ==
                "Netherlands Guilders - NLG" ? (
                  <option value="Netherlands Guilders - NLG" selected>
                    Netherlands Guilders - NLG
                  </option>
                ) : (
                  <option value="Netherlands Guilders - NLG">
                    Netherlands Guilders - NLG
                  </option>
                )}
                {this.state.currentItem.currency ==
                "New Zealand Dollars - NZD" ? (
                  <option value="New Zealand Dollars - NZD" selected>
                    New Zealand Dollars - NZD
                  </option>
                ) : (
                  <option value="New Zealand Dollars - NZD">
                    New Zealand Dollars - NZD
                  </option>
                )}
                {this.state.currentItem.currency == "Norway Kroner - NOK" ? (
                  <option value="Norway Kroner - NOK" selected>
                    Norway Kroner - NOK
                  </option>
                ) : (
                  <option value="Norway Kroner - NOK">
                    Norway Kroner - NOK
                  </option>
                )}
                {this.state.currentItem.currency == "Oman Rials - OMR" ? (
                  <option value="Oman Rials - OMR" selected>
                    Oman Rials - OMR
                  </option>
                ) : (
                  <option value="Oman Rials - OMR">Oman Rials - OMR</option>
                )}
                {this.state.currentItem.currency == "Pakistan Rupees - PKR" ? (
                  <option value="Pakistan Rupees - PKR" selected>
                    Pakistan Rupees - PKR
                  </option>
                ) : (
                  <option value="Pakistan Rupees - PKR">
                    Pakistan Rupees - PKR
                  </option>
                )}
                {this.state.currentItem.currency == "Palladium Ounces - XPD" ? (
                  <option value="Palladium Ounces - XPD" selected>
                    Palladium Ounces - XPD
                  </option>
                ) : (
                  <option value="Palladium Ounces - XPD">
                    Palladium Ounces - XPD
                  </option>
                )}

                {this.state.currentItem.currency ==
                "Peru Nuevos Soles - PEN" ? (
                  <option value="Peru Nuevos Soles - PEN" selected>
                    Peru Nuevos Soles - PEN
                  </option>
                ) : (
                  <option value="Peru Nuevos Soles - PEN">
                    Peru Nuevos Soles - PEN
                  </option>
                )}
                {this.state.currentItem.currency ==
                "Philippines Pesos - PHP" ? (
                  <option value="Philippines Pesos - PHP" selected>
                    Philippines Pesos - PHP
                  </option>
                ) : (
                  <option value="Philippines Pesos - PHP">
                    Philippines Pesos - PHP
                  </option>
                )}
                {this.state.currentItem.currency == "Platinum Ounces - XPT" ? (
                  <option value="Platinum Ounces - XPT" selected>
                    Platinum Ounces - XPT
                  </option>
                ) : (
                  <option value="Platinum Ounces - XPT">
                    Platinum Ounces - XPT
                  </option>
                )}
                {this.state.currentItem.currency == "Poland Zlotych - PLN" ? (
                  <option value="Poland Zlotych - PLN" selected>
                    Poland Zlotych - PLN
                  </option>
                ) : (
                  <option value="Poland Zlotych - PLN">
                    Poland Zlotych - PLN
                  </option>
                )}
                {this.state.currentItem.currency == "Portugal Escudos - PTE" ? (
                  <option value="Portugal Escudos - PTE" selected>
                    Portugal Escudos - PTE
                  </option>
                ) : (
                  <option value="Portugal Escudos - PTE">
                    Portugal Escudos - PTE
                  </option>
                )}
                {this.state.currentItem.currency == "Qatar Riyals - QAR" ? (
                  <option value="Qatar Riyals - QAR" selected>
                    Qatar Riyals - QAR
                  </option>
                ) : (
                  <option value="Qatar Riyals - QAR">Qatar Riyals - QAR</option>
                )}
                {this.state.currentItem.currency == "Romania New Leu - RON" ? (
                  <option value="Romania New Leu - RON" selected>
                    Romania New Leu - RON
                  </option>
                ) : (
                  <option value="Romania New Leu - RON">
                    Romania New Leu - RON
                  </option>
                )}
                {this.state.currentItem.currency == "Romania Leu - ROL" ? (
                  <option value="Romania Leu - ROL" selected>
                    Romania Leu - ROL
                  </option>
                ) : (
                  <option value="Romania Leu - ROL">Romania Leu - ROL</option>
                )}
                {this.state.currentItem.currency == "Russia Rubles - RUB" ? (
                  <option value="Russia Rubles - RUB" selected>
                    Russia Rubles - RUB
                  </option>
                ) : (
                  <option value="Russia Rubles - RUB">
                    Russia Rubles - RUB
                  </option>
                )}
                {this.state.currentItem.currency ==
                "Saudi Arabia Riyals - SAR" ? (
                  <option value="Saudi Arabia Riyals - SAR" selected>
                    Saudi Arabia Riyals - SAR
                  </option>
                ) : (
                  <option value="Saudi Arabia Riyals - SAR">
                    Saudi Arabia Riyals - SAR
                  </option>
                )}
                {this.state.currentItem.currency == "Silver Ounces - XAG" ? (
                  <option value="Silver Ounces - XAG" selected>
                    Silver Ounces - XAG
                  </option>
                ) : (
                  <option value="Silver Ounces - XAG">
                    Silver Ounces - XAG
                  </option>
                )}
                {this.state.currentItem.currency ==
                "Singapore Dollars - SGD" ? (
                  <option value="Singapore Dollars - SGD" selected>
                    Singapore Dollars - SGD
                  </option>
                ) : (
                  <option value="Singapore Dollars - SGD">
                    Singapore Dollars - SGD
                  </option>
                )}
                {this.state.currentItem.currency == "Slovakia Koruny - SKK" ? (
                  <option value="Slovakia Koruny - SKK" selected>
                    Slovakia Koruny - SKK
                  </option>
                ) : (
                  <option value="Slovakia Koruny - SKK">
                    Slovakia Koruny - SKK
                  </option>
                )}
                {this.state.currentItem.currency == "Slovenia Tolars - SIT" ? (
                  <option value="Slovenia Tolars - SIT" selected>
                    Slovenia Tolars - SIT
                  </option>
                ) : (
                  <option value="Slovenia Tolars - SIT">
                    Slovenia Tolars - SIT
                  </option>
                )}
                {this.state.currentItem.currency ==
                "South Africa Rand - ZAR" ? (
                  <option value="South Africa Rand - ZAR" selected>
                    South Africa Rand - ZAR
                  </option>
                ) : (
                  <option value="South Africa Rand - ZAR">
                    South Africa Rand - ZAR
                  </option>
                )}
                {this.state.currentItem.currency == "South Korea Won - KRW" ? (
                  <option value="South Korea Won - KRW" selected>
                    South Korea Won - KRW
                  </option>
                ) : (
                  <option value="South Korea Won - KRW">
                    South Korea Won - KRW
                  </option>
                )}

                {this.state.currentItem.currency == "Spain Pesetas - ESP" ? (
                  <option value="Spain Pesetas - ESP" selected>
                    Spain Pesetas - ESP
                  </option>
                ) : (
                  <option value="Spain Pesetas - ESP">
                    Spain Pesetas - ESP
                  </option>
                )}
                {this.state.currentItem.currency ==
                "Special Drawing Rights (IMF) - XDR" ? (
                  <option value="Special Drawing Rights (IMF) - XDR" selected>
                    Special Drawing Rights (IMF) - XDR
                  </option>
                ) : (
                  <option value="Special Drawing Rights (IMF) - XDR">
                    Special Drawing Rights (IMF) - XDR
                  </option>
                )}
                {this.state.currentItem.currency == "Sri Lanka Rupees - LKR" ? (
                  <option value="Sri Lanka Rupees - LKR" selected>
                    Sri Lanka Rupees - LKR
                  </option>
                ) : (
                  <option value="Sri Lanka Rupees - LKR">
                    Sri Lanka Rupees - LKR
                  </option>
                )}
                {this.state.currentItem.currency == "Sudan Dinars - SDD" ? (
                  <option value="Sudan Dinars - SDD" selected>
                    Sudan Dinars - SDD
                  </option>
                ) : (
                  <option value="Sudan Dinars - SDD">Sudan Dinars - SDD</option>
                )}
                {this.state.currentItem.currency == "Sweden Kronor - SEK" ? (
                  <option value="Sweden Kronor - SEK" selected>
                    Sweden Kronor - SEK
                  </option>
                ) : (
                  <option value="Sweden Kronor - SEK">
                    Sweden Kronor - SEK
                  </option>
                )}
                {this.state.currentItem.currency ==
                "Switzerland Francs - CHF" ? (
                  <option value="Switzerland Francs - CHF" selected>
                    Switzerland Francs - CHF
                  </option>
                ) : (
                  <option value="Switzerland Francs - CHF">
                    Switzerland Francs - CHF
                  </option>
                )}
                {this.state.currentItem.currency ==
                "Taiwan New Dollars - TWD" ? (
                  <option value="Taiwan New Dollars - TWD" selected>
                    Taiwan New Dollars - TWD
                  </option>
                ) : (
                  <option value="Taiwan New Dollars - TWD">
                    Taiwan New Dollars - TWD
                  </option>
                )}
                {this.state.currentItem.currency == "Thailand Baht - THB" ? (
                  <option value="Thailand Baht - THB" selected>
                    Thailand Baht - THB
                  </option>
                ) : (
                  <option value="Thailand Baht - THB">
                    Thailand Baht - THB
                  </option>
                )}
                {this.state.currentItem.currency ==
                "Trinidad and Tobago Dollars - TTD" ? (
                  <option value="Trinidad and Tobago Dollars - TTD" selected>
                    Trinidad and Tobago Dollars - TTD
                  </option>
                ) : (
                  <option value="Trinidad and Tobago Dollars - TTD">
                    Trinidad and Tobago Dollars - TTD
                  </option>
                )}
                {this.state.currentItem.currency == "Tunisia Dinars - TND" ? (
                  <option value="Tunisia Dinars - TND" selected>
                    Tunisia Dinars - TND
                  </option>
                ) : (
                  <option value="Tunisia Dinars - TND">
                    Tunisia Dinars - TND
                  </option>
                )}
                {this.state.currentItem.currency == "Turkey New Lira - TRY" ? (
                  <option value="Turkey New Lira - TRY" selected>
                    Turkey New Lira - TRY
                  </option>
                ) : (
                  <option value="Turkey New Lira - TRY">
                    Turkey New Lira - TRY
                  </option>
                )}
                {this.state.currentItem.currency ==
                "United Arab Emirates Dirhams - AED" ? (
                  <option value="United Arab Emirates Dirhams - AED" selected>
                    United Arab Emirates Dirhams - AED
                  </option>
                ) : (
                  <option value="United Arab Emirates Dirhams - AED">
                    United Arab Emirates Dirhams - AED
                  </option>
                )}
                {this.state.currentItem.currency ==
                "United Kingdom Pounds - GBP" ? (
                  <option value="United Kingdom Pounds - GBP" selected>
                    United Kingdom Pounds - GBP
                  </option>
                ) : (
                  <option value="United Kingdom Pounds - GBP">
                    United Kingdom Pounds - GBP
                  </option>
                )}
                {this.state.currentItem.currency ==
                "United States Dollars - USD" ? (
                  <option value="United States Dollars - USD" selected>
                    United States Dollars - USD
                  </option>
                ) : (
                  <option value="United States Dollars - USD">
                    United States Dollars - USD
                  </option>
                )}
                {this.state.currentItem.currency ==
                "Venezuela Bolivares - VEB" ? (
                  <option value="Venezuela Bolivares - VEB" selected>
                    Venezuela Bolivares - VEB
                  </option>
                ) : (
                  <option value="Venezuela Bolivares - VEB">
                    Venezuela Bolivares - VEB
                  </option>
                )}
                {this.state.currentItem.currency == "Vietnam Dong - VND" ? (
                  <option value="Vietnam Dong - VND" selected>
                    Vietnam Dong - VND
                  </option>
                ) : (
                  <option value="Vietnam Dong - VND">Vietnam Dong - VND</option>
                )}
                {this.state.currentItem.currency == "Zambia Kwacha - ZMK" ? (
                  <option value="Zambia Kwacha - ZMK" selected>
                    Zambia Kwacha - ZMK
                  </option>
                ) : (
                  <option value="Zambia Kwacha - ZMK">
                    Zambia Kwacha - ZMK
                  </option>
                )}
              </select>
            </div>

            <div className="form-item">
              <label htmlFor="personal-notes">Personal Notes:</label>
              <input
                type="text"
                placeholder="Notes:"
                name="notes"
                id="personal-notes"
                defaultValue={this.state.currentItem.notes}
              />
            </div>

            <div className="form-item">
              <label htmlFor="privacy">
                Please select this entries' privacy:
              </label>
              <select name="is_public" id="privacy" required>
                <option value="" disabled>
                  Select Privacy:
                </option>
                {this.state.currentItem.is_public == "0" ? (
                  <option value="0" selected>
                    Private
                  </option>
                ) : (
                  <option value="0">Private</option>
                )}
                {this.state.currentItem.is_public == "1" ? (
                  <option value="1" selected>
                    Public
                  </option>
                ) : (
                  <option value="1">Public</option>
                )}
              </select>
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
