import React, { Component } from "react";
import datas from "../DummyData.json";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import store from "../../store";

import { Auth } from "aws-amplify";

import * as ActionConstructer from "../../actions/ActionConstructer";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {
  Col,
  Card,
  CardBody,
  CardTitle,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";

import ChartLine from "./ChartLine";

class Chart extends Component {
  state = {
    datoFra: "2020-05-11%2015:16:00",
    datoTil: "2020-10-14%2022:09:00",
    alderFra: "1",
    alderTil: "100",
    gender: "NULL",

    testData: {
      labels: [],

      datasets: [
        {
          label: "Antal Oprettet",
          backgroundColor: "rgba(0, 255, 0, 0.3)",
          data: [],
        },
      ],
    },
    exampleData: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "My First dataset",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "round",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [65, 59, 80, 81, 56, 55, 40],
        },
      ],
    },
  };

  async componentDidMount() {
    var datoFra = this.state.datoFra;
    var datoTil = this.state.datoTil;
    var alderFra = this.state.alderFra;
    var alderTil = this.state.alderTil;
    var gender = this.state.gender;

    this.fetchUserData(datoFra, datoTil, alderFra, alderTil, gender);

    store.dispatch(
      ActionConstructer.setIdToken(
        (await Auth.currentSession()).getIdToken().getJwtToken()
      )
    );
  }

  // 2020-01-1%2022:23:00
  // 2021-10-1%2023:23:00

  /* var URL =
      "https://a60ad7y7e0.execute-api.eu-central-1.amazonaws.com/test?customerId=Customer0&venueId=1&timeStampStart=" +
      this.state.datoFra +
      "&timeStampEnd= " +
      this.state.datoTil +
      "&action=delivery&ageEnd=" +
      this.state.alderTil +
      "&zipCodeStart=0000&zipCodeEnd=9000&gender=" +
      this.state.gender +
      "&ageStart=" +
      this.state.alderFra;
 */

  fetchUserData(datoFra, datoTil, alderFra, alderTil, gender) {
    var durationOfStay =
      "https://ljkp2u0md2.execute-api.eu-central-1.amazonaws.com/dev?";

    var retDel =
      "https://a60ad7y7e0.execute-api.eu-central-1.amazonaws.com/dev?action=delivery&";

    var patronUsers =
      "https://lrsik6gsgh.execute-api.eu-central-1.amazonaws.com/dev?";

    var getDistrbution =
      "https://k7mb52gfg0.execute-api.eu-central-1.amazonaws.com/dev?";

    var URL =
      "https://a60ad7y7e0.execute-api.eu-central-1.amazonaws.com/dev?action=delivery&customerId=Customer0&venueId=1&timeStampStart=" +
      datoFra +
      "&timeStampEnd=" +
      datoTil +
      "&ageEnd=" +
      alderTil +
      "&zipCodeStart=0000&zipCodeEnd=9000&gender=" +
      gender +
      "&ageStart=" +
      alderFra;

    console.log(URL);

    console.log(store.getState());
    // headers skal passes videre som props, efter man er logget ind

    fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000/chart",
        Authorization: store.getState(),
      },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((repos) => {
        this.setState({
          testData: {
            labels: repos.x,
            datasets: [
              {
                data: repos.y,
                label: "Antal Oprettet",
                backgroundColor: "rgba(0, 255, 0, 0.3)",
              },
            ],
          },
        });

        console.log(this.state.testData);
      });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    var datoFra = this.state.datoFra;
    var datoTil = this.state.datoTil;
    var alderFra = this.state.alderFra;
    var alderTil = this.state.alderTil;
    var gender = this.state.gender;

    this.fetchUserData(datoFra, datoTil, alderFra, alderTil, gender);
  };
  // "customerId = " + customerId + "&venueId= " + venueId + "&venueId= " + venueId;

  /*
   
  var customerId="dallevall@hotmail.com"
  var venueId="23"
  var action="retrieval"
  var startTimeStamp="2020-01-30 21:27:00"
  var endTimeStamp="2020-01-30 22:27:00"
  var age="20-28"
  var gender="M"
  var zipcode="2600-3000" 

  efter backend er opdateret:
  var wardropeId="1234" 


  
   */
  sortAgeMale() {
    var aldersGruppe = [];
    var fra = 15;
    var til = 16;
    while (til < 62) {
      aldersGruppe.push(this.getAgeMale(fra, til));
      fra += 2;
      til += 2;
    }
    return aldersGruppe;
  }

  sortAgeFemale() {
    var aldersGruppe = [];
    var fra = 15;
    var til = 16;
    while (til < 62) {
      aldersGruppe.push(this.getAgeFemale(fra, til));
      fra += 2;
      til += 2;
    }
    return aldersGruppe;
  }

  getAgeMale(age1, age2) {
    var count = [];
    datas.map((person) => {
      if (
        age1 <= person.age &&
        person.age <= age2 &&
        person.gender === "male"
      ) {
        count.push(person.age);
      }
    });

    return count.length;
  }

  getAgeFemale(age1, age2) {
    var count = [];
    datas.map((person) => {
      if (
        age1 <= person.age &&
        person.age <= age2 &&
        person.gender === "female"
      ) {
        count.push(person.age);
      }
    });

    return count.length;
  }

  getGenderMale() {
    var list = [];
    datas.map((person) => {
      if (person.gender === "male") {
        list.push(person);
      }
    });
    return list.length;
  }
  getRegistration(month) {
    var count = [];
    datas.map((person) => {
      if (month === person.registered.substring(5, 7)) {
        count.push(person);
      }
    });

    return count.length;
  }

  getGenderFemale() {
    var list = [];
    datas.map((person) => {
      if (person.gender === "female") {
        list.push(person);
      }
    });
    return list.length;
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: "right",
    location: "City",
  };

  onInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  };

  render() {
    var circleStyle = {
      position: "absolute",
      top: "440px",
      left: "416px",
      padding: 10,
      margin: 20,
      display: "inline-block",
      backgroundColor: "#297373",
      borderRadius: "50%",
      width: 85,
      height: 85,
    };
    var circleStyle2 = {
      backgroundColor: "#FFFFFF",
      borderRadius: "50%",
      width: 65,
      height: 65,
    };
    return (
      <div
        className="all charts"
        style={{ textAlign: "left", height: 300, width: 600 }}
      >
        <div
          className="aldersfordeling chart"
          style={{ textAlign: "left", height: 300, width: 650 }}
        >
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <p className="control">
                fra
                <input
                  className="input"
                  type="text"
                  id="datoFra"
                  placeholder="YYY-MM-DD hh:mm:ss"
                  value={this.state.datoFra}
                  onChange={this.onInputChange}
                />
              </p>
            </div>
            <div className="field">
              <p className="control">
                til
                <input
                  className="input"
                  type="text"
                  id="datoTil"
                  placeholder="YYY-MM-DD hh:mm:ss"
                  value={this.state.datoTil}
                  onChange={this.onInputChange}
                />
              </p>
            </div>

            <div className="field">
              <p className="control">
                fra
                <input
                  className="input"
                  type="text"
                  id="alderFra"
                  placeholder="Alder"
                  value={this.state.alderFra}
                  onChange={this.onInputChange}
                />
              </p>
            </div>

            <div className="field">
              <p className="control">
                til
                <input
                  className="input"
                  type="text"
                  id="alderTil"
                  placeholder="Alder"
                  value={this.state.alderTil}
                  onChange={this.onInputChange}
                />
              </p>
            </div>

            <div className="field">
              <p className="control">
                Gender
                <input
                  className="input"
                  type="text"
                  id="gender"
                  placeholder="køn (M eller F)"
                  value={this.state.gender}
                  onChange={this.onInputChange}
                />
              </p>
            </div>

            <div className="field">
              <p className="control">
                <button className="button is-success">Hent Data</button>
              </p>
            </div>
          </form>

          <br></br>
          <Bar
            data={this.state.testData}
            options={{
              title: {
                display: this.props.displayTitle,
                text: "Aldersfordeling ",
                fontSize: 15,
              },
              legend: {
                display: this.props.displayLegend,
                position: this.props.legendPosition,
              },
              layout: {
                padding: {
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                },
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                  },
                ],
              },
            }}
          />
        </div>

        <div
          style={{
            height: 210,
            width: 210,
            position: "absolute",
            top: "140px",
            left: "470px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "58px",
              left: "95px",
              fontSize: 18,
            }}
          >
            63
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            top: "420px",
            left: "440px",
            fontSize: 13,
          }}
        >
          Antal gæster {<br />}
          Nu
        </div>

        <div style={circleStyle}>
          <div style={circleStyle2}> </div>
        </div>
        <div
          style={{
            position: "absolute",
            top: "473px",
            left: "457px",
            fontSize: 37,
          }}
        >
          37
        </div>
      </div>
    );
  }
}

export default Chart;
