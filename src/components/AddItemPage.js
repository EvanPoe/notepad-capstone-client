import React, { Component } from "react";
import config from "../config";
import TokenService from "../services/token-service";
import { Link } from "react-router-dom";

export class AddItemPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsByUserId: [],
      error: null,
      // databaseWorkouts: [],
    };
  }

  componentDidMount() {
    let currentUser = TokenService.getUserId();
    // console.log(currentUser);

    //if the user is not logged in, send him to landing page
    if (!TokenService.hasAuthToken()) {
      window.location = "/";
    }
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
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    //useing the url and parameters above make the api call
    fetch(`${config.API_ENDPOINT}/items`, options)
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
          <h1>New Item</h1>
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
              />
            </div>
            <div className="form-item">
              <label htmlFor="visted">Have you been here before?</label>
              <select name="category" id="visited" required>
                <option value="" disabled>
                  Select Bucket Status
                </option>
                <option value="Been There Done That!">
                  Been There Done That!
                </option>
                <option value="On My List!">On My List!</option>
              </select>
            </div>
            <div className="form-item">
              <label htmlFor="rating">How would you rate this location?:</label>
              <select name="rating" id="rating">
                <option value="" disabled>
                  Select Rating
                </option>
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
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
                <option value="1">$</option>
                <option value="2">$$</option>
                <option value="3">$$$</option>
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
                <option value="English">English</option>
                <option value="Afrikaans">Afrikaans</option>
                <option value="Albanian">Albanian</option>
                <option value="Arabic">Arabic</option>
                <option value="Armenian">Armenian</option>
                <option value="Basque">Basque</option>
                <option value="Bengali">Bengali</option>
                <option value="Bulgarian">Bulgarian</option>
                <option value="Catalan">Catalan</option>
                <option value="Cambodian">Cambodian</option>
                <option value="Chinese (Mandarin)">Chinese (Mandarin)</option>
                <option value="Croatian">Croatian</option>
                <option value="Czech">Czech</option>
                <option value="Danish">Danish</option>
                <option value="Dutch">Dutch</option>
                <option value="Estonian">Estonian</option>
                <option value="Fiji">Fiji</option>
                <option value="Finnish">Finnish</option>
                <option value="French">French</option>
                <option value="Georgian">Georgian</option>
                <option value="German">German</option>
                <option value="Greek">Greek</option>
                <option value="Gujarati">Gujarati</option>
                <option value="Hebrew">Hebrew</option>
                <option value="Hindi">Hindi</option>
                <option value="Hungarian">Hungarian</option>
                <option value="Icelandic">Icelandic</option>
                <option value="Indonesian">Indonesian</option>
                <option value="Irish">Irish</option>
                <option value="Italian">Italian</option>
                <option value="Japanese">Japanese</option>
                <option value="Javanese">Javanese</option>
                <option value="Korean">Korean</option>
                <option value="Latin">Latin</option>
                <option value="Latvian">Latvian</option>
                <option value="Lithuanian">Lithuanian</option>
                <option value="Macedonian">Macedonian</option>
                <option value="Malay">Malay</option>
                <option value="Malayalam">Malayalam</option>
                <option value="Maltese">Maltese</option>
                <option value="Maori">Maori</option>
                <option value="Marathi">Marathi</option>
                <option value="Mongolian">Mongolian</option>
                <option value="Nepali">Nepali</option>
                <option value="Norwegian">Norwegian</option>
                <option value="Persian">Persian</option>
                <option value="Polish">Polish</option>
                <option value="Portuguese">Portuguese</option>
                <option value="Punjabi">Punjabi</option>
                <option value="Quechua">Quechua</option>
                <option value="Romanian">Romanian</option>
                <option value="Russian">Russian</option>
                <option value="Samoan">Samoan</option>
                <option value="Serbian">Serbian</option>
                <option value="Slovak">Slovak</option>
                <option value="Slovenian">Slovenian</option>
                <option value="Spanish">Spanish</option>
                <option value="Swahili">Swahili</option>
                <option value="Swedish ">Swedish </option>
                <option value="Tamil">Tamil</option>
                <option value="Tatar">Tatar</option>
                <option value="Telugu">Telugu</option>
                <option value="Thai">Thai</option>
                <option value="Tibetan">Tibetan</option>
                <option value="Tonga">Tonga</option>
                <option value="Turkish">Turkish</option>
                <option value="Ukrainian">Ukrainian</option>
                <option value="Urdu">Urdu</option>
                <option value="Uzbek">Uzbek</option>
                <option value="Vietnamese">Vietnamese</option>
                <option value="Welsh">Welsh</option>
                <option value="Xhosa">Xhosa</option>
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
                <option value="Historical">Historical</option>
                <option value="Romantic">Romantic</option>
                <option value="Outdoor">Outdoor</option>
                <option value="Business">Business</option>
                <option value="Tourist">Tourist</option>
                <option value="Religious">Religious</option>
                <option value="Sport">Sport</option>
                <option value="Educational">Educational</option>
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
                <option value="America (United States) Dollars - USD">
                  America (United States) Dollars – USD
                </option>
                <option value="Afghanistan Afghanis - AFN">
                  Afghanistan Afghanis – AFN
                </option>
                <option value="Albania Leke - ALL">Albania Leke – ALL</option>
                <option value="Algeria Dinars - DZD">
                  Algeria Dinars – DZD
                </option>
                <option value="Argentina Pesos - ARS">
                  Argentina Pesos – ARS
                </option>
                <option value="Australia Dollars - AUD">
                  Australia Dollars – AUD
                </option>
                <option value="Austria Schillings - ATS">
                  Austria Schillings – ATS
                </option>

                <option value="Bahamas Dollars - BSD">
                  Bahamas Dollars – BSD
                </option>
                <option value="Bahrain Dinars - BHD">
                  Bahrain Dinars – BHD
                </option>
                <option value="Bangladesh Taka - BDT">
                  Bangladesh Taka – BDT
                </option>
                <option value="Barbados Dollars - BBD">
                  Barbados Dollars – BBD
                </option>
                <option value="Belgium Francs - BEF">
                  Belgium Francs – BEF
                </option>
                <option value="Bermuda Dollars - BMD">
                  Bermuda Dollars – BMD
                </option>

                <option value="Brazil Reais - BRL">Brazil Reais – BRL</option>
                <option value="Bulgaria Leva - BGN">Bulgaria Leva – BGN</option>
                <option value="Canada Dollars - CAD">
                  Canada Dollars – CAD
                </option>
                <option value="CFA BCEAO Francs - XOF">
                  CFA BCEAO Francs – XOF
                </option>
                <option value="CFA BEAC Francs - XAF">
                  CFA BEAC Francs – XAF
                </option>
                <option value="Chile Pesos - CLP">Chile Pesos – CLP</option>

                <option value="China Yuan Renminbi - CNY">
                  China Yuan Renminbi – CNY
                </option>
                <option value="RMB (China Yuan Renminbi) - CNY">
                  RMB (China Yuan Renminbi) – CNY
                </option>
                <option value="Colombia Pesos - COP">
                  Colombia Pesos – COP
                </option>
                <option value="CFP Francs - XPF">CFP Francs – XPF</option>
                <option value="Costa Rica Colones - CRC">
                  Costa Rica Colones – CRC
                </option>
                <option value="Croatia Kuna - HRK">Croatia Kuna – HRK</option>

                <option value="Cyprus Pounds - CYP">Cyprus Pounds – CYP</option>
                <option value="Czech Republic Koruny - CZK">
                  Czech Republic Koruny – CZK
                </option>
                <option value="Denmark Kroner - DKK">
                  Denmark Kroner – DKK
                </option>
                <option value="Deutsche (Germany) Marks - DEM">
                  Deutsche (Germany) Marks – DEM
                </option>
                <option value="Dominican Republic Pesos - DOP">
                  Dominican Republic Pesos – DOP
                </option>
                <option value="Dutch (Netherlands) Guilders - NLG">
                  Dutch (Netherlands) Guilders – NLG
                </option>

                <option value="Eastern Caribbean Dollars - XCD">
                  Eastern Caribbean Dollars – XCD
                </option>
                <option value="Egypt Pounds - EGP">Egypt Pounds – EGP</option>
                <option value="Estonia Krooni - EEK">
                  Estonia Krooni – EEK
                </option>
                <option value="Euro - EUR">Euro – EUR</option>
                <option value="Fiji Dollars - FJD">Fiji Dollars – FJD</option>
                <option value="Finland Markkaa - FIM">
                  Finland Markkaa – FIM
                </option>

                <option value="France Francs - FRF*">
                  France Francs – FRF*
                </option>
                <option value="Germany Deutsche Marks - DEM">
                  Germany Deutsche Marks – DEM
                </option>
                <option value="Gold Ounces - XAU">Gold Ounces – XAU</option>
                <option value="Greece Drachmae - GRD">
                  Greece Drachmae – GRD
                </option>
                <option value="Guatemalan Quetzal - GTQ">
                  Guatemalan Quetzal – GTQ
                </option>
                <option value="Holland (Netherlands) Guilders - NLG">
                  Holland (Netherlands) Guilders – NLG
                </option>
                <option value="Hong Kong Dollars - HKD">
                  Hong Kong Dollars – HKD
                </option>

                <option value="Hungary Forint - HUF">
                  Hungary Forint – HUF
                </option>
                <option value="Iceland Kronur - ISK">
                  Iceland Kronur – ISK
                </option>
                <option value="IMF Special Drawing Right - XDR">
                  IMF Special Drawing Right – XDR
                </option>
                <option value="India Rupees - INR">India Rupees – INR</option>
                <option value="Indonesia Rupiahs - IDR">
                  Indonesia Rupiahs – IDR
                </option>
                <option value="Iran Rials - IRR">Iran Rials – IRR</option>

                <option value="Iraq Dinars - IQD">Iraq Dinars – IQD</option>
                <option value="Ireland Pounds - IEP*">
                  Ireland Pounds – IEP*
                </option>
                <option value="Israel New Shekels - ILS">
                  Israel New Shekels – ILS
                </option>
                <option value="Italy Lire - ITL*">Italy Lire – ITL*</option>
                <option value="Jamaica Dollars - JMD">
                  Jamaica Dollars – JMD
                </option>
                <option value="Japan Yen - JPY">Japan Yen – JPY</option>

                <option value="Jordan Dinars - JOD">Jordan Dinars – JOD</option>
                <option value="Kenya Shillings - KES">
                  Kenya Shillings – KES
                </option>
                <option value="Korea (South) Won - KRW">
                  Korea (South) Won – KRW
                </option>
                <option value="Kuwait Dinars - KWD">Kuwait Dinars – KWD</option>
                <option value="Lebanon Pounds - LBP">
                  Lebanon Pounds – LBP
                </option>
                <option value="Luxembourg Francs - LUF">
                  Luxembourg Francs – LUF
                </option>

                <option value="Malaysia Ringgits - MYR">
                  Malaysia Ringgits – MYR
                </option>
                <option value="Malta Liri - MTL">Malta Liri – MTL</option>
                <option value="Mauritius Rupees - MUR">
                  Mauritius Rupees – MUR
                </option>
                <option value="Mexico Pesos - MXN">Mexico Pesos – MXN</option>
                <option value="Morocco Dirhams - MAD">
                  Morocco Dirhams – MAD
                </option>
                <option value="Netherlands Guilders - NLG">
                  Netherlands Guilders – NLG
                </option>

                <option value="New Zealand Dollars - NZD">
                  New Zealand Dollars – NZD
                </option>
                <option value="Norway Kroner - NOK">Norway Kroner – NOK</option>
                <option value="Oman Rials - OMR">Oman Rials – OMR</option>
                <option value="Pakistan Rupees - PKR">
                  Pakistan Rupees – PKR
                </option>
                <option value="Palladium Ounces - XPD">
                  Palladium Ounces – XPD
                </option>
                <option value="Peru Nuevos Soles - PEN">
                  Peru Nuevos Soles – PEN
                </option>

                <option value="Philippines Pesos - PHP">
                  Philippines Pesos – PHP
                </option>
                <option value="Platinum Ounces - XPT">
                  Platinum Ounces – XPT
                </option>
                <option value="Poland Zlotych - PLN">
                  Poland Zlotych – PLN
                </option>
                <option value="Portugal Escudos - PTE">
                  Portugal Escudos – PTE
                </option>
                <option value="Qatar Riyals - QAR">Qatar Riyals – QAR</option>
                <option value="Romania New Lei - RON">
                  Romania New Lei – RON
                </option>

                <option value="Romania Lei - ROL">Romania Lei – ROL</option>
                <option value="Russia Rubles - RUB">Russia Rubles – RUB</option>
                <option value="Saudi Arabia Riyals - SAR">
                  Saudi Arabia Riyals – SAR
                </option>
                <option value="Silver Ounces - XAG">Silver Ounces – XAG</option>
                <option value="Singapore Dollars - SGD">
                  Singapore Dollars – SGD
                </option>
                <option value="Slovakia Koruny - SKK">
                  Slovakia Koruny – SKK
                </option>

                <option value="Slovenia Tolars - SIT">
                  Slovenia Tolars – SIT
                </option>
                <option value="South Africa Rand - ZAR">
                  South Africa Rand – ZAR
                </option>
                <option value="South Korea Won - KRW">
                  South Korea Won – KRW
                </option>
                <option value="Spain Pesetas - ESP">Spain Pesetas – ESP</option>
                <option value="Special Drawing Rights (IMF) - XDR">
                  Special Drawing Rights (IMF) – XDR
                </option>
                <option value="Sri Lanka Rupees - LKR">
                  Sri Lanka Rupees – LKR
                </option>

                <option value="Sudan Dinars - SDD">Sudan Dinars – SDD</option>
                <option value="Sweden Kronor - SEK">Sweden Kronor – SEK</option>
                <option value="Switzerland Francs - CHF">
                  Switzerland Francs – CHF
                </option>
                <option value="Taiwan New Dollars - TWD">
                  Taiwan New Dollars – TWD
                </option>
                <option value="Thailand Baht - THB">Thailand Baht – THB</option>
                <option value="Trinidad and Tobago Dollars - TTD">
                  Trinidad and Tobago Dollars – TTD
                </option>

                <option value="Tunisia Dinars - TND">
                  Tunisia Dinars – TND
                </option>
                <option value="Turkey New Lira - TRY">
                  Turkey New Lira – TRY
                </option>
                <option value="United Arab Emirates Dirhams - AED">
                  United Arab Emirates Dirhams – AED
                </option>
                <option value="United Kingdom Pounds - GBP">
                  United Kingdom Pounds – GBP
                </option>
                <option value="United States Dollars - USD">
                  United States Dollars – USD
                </option>
                <option value="Venezuela Bolivares - VEB">
                  Venezuela Bolivares – VEB
                </option>

                <option value="Vietnam Dong - VND">Vietnam Dong – VND</option>
                <option value="Zambia Kwacha - ZMK">Zambia Kwacha – ZMK</option>
              </select>
            </div>
            <div className="form-item">
              <label htmlFor="personal-notes">Personal Notes:</label>
              <input
                type="text"
                placeholder="Notes:"
                name="notes"
                id="personal-notes"
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
                <option value="1">Public</option>
                <option value="0">Private</option>
              </select>
            </div>
            {/* <div className="form-item">
              <a href="#" className="myButton">
                Cancel
              </a>
            </div> */}
            <div className="form-item">
              <input type="submit" value="SUBMIT" className="myButton" />
            </div>
          </form>
        </section>
      </div>
    );
  }
}

export default AddItemPage;
