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
    vistedUsers: {
      labels: [],
      datasets: [],
    },
    patronUsers: {
      labels: [],
      datasets: [],
    },
    durationOfStay: {
      labels: [],
      datasets: [],
    },
    visitingUsers: {
      labels: [],
      datasets: [],
      total: [],
    },
  };

  async componentDidMount() {
    var datoFra = this.state.datoFra;
    var datoTil = this.state.datoTil;
    var alderFra = this.state.alderFra;
    var alderTil = this.state.alderTil;
    var gender = this.state.gender;

    console.log(Auth);

    this.fetchVisitedUsers(datoFra, datoTil, alderFra, alderTil, gender);
    this.fetchPatronUsers(datoFra, datoTil, alderFra, alderTil, gender);
    this.fetchDurationOfStay(datoFra, datoTil, alderFra, alderTil, gender);
    this.fetchVistingUsers(datoFra, datoTil, alderFra, alderTil, gender);
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

  fetchVisitedUsers(datoFra, datoTil, alderFra, alderTil, gender) {
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

    fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000/chart",
        Authorization: store.getState().IdToken,
      },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((repos) => {
        this.setState({
          vistedUsers: {
            labels: repos.x,
            datasets: [
              {
                data: repos.y,
              },
            ],
          },
        });

        console.log(this.state.vistedUsers);
      });
  }

  fetchPatronUsers(datoFra, datoTil, alderFra, alderTil, gender) {
    var URL =
      "https://lrsik6gsgh.execute-api.eu-central-1.amazonaws.com/dev?customerId=Customer0&venueId=1&timeStampStart=" +
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

    fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000/chart",
        Authorization: store.getState().IdToken,
      },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((repos) => {
        this.setState({
          patronUsers: {
            labels: repos.x,
            datasets: [
              {
                data: repos.y,
              },
            ],
          },
        });

        console.log(this.state.patronUsers);
      });
  }

  fetchDurationOfStay(datoFra, datoTil, alderFra, alderTil, gender) {
    var URL =
      "https://ljkp2u0md2.execute-api.eu-central-1.amazonaws.com/dev?customerId=Customer0&venueId=1&timeStampStart=" +
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

    fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000/chart",
        Authorization: store.getState().IdToken,
      },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((repos) => {
        this.setState({
          durationOfStay: {
            labels: repos.x,
            datasets: [
              {
                data: repos.y,
              },
            ],
          },
        });

        console.log(this.state.durationOfStay);
      });
  }

  fetchVistingUsers(datoFra, datoTil, alderFra, alderTil, gender) {
    var URL =
      "https://a60ad7y7e0.execute-api.eu-central-1.amazonaws.com/dev?action=retrieval&customerId=Customer0&venueId=1&timeStampStart=" +
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

    fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000/chart",
        Authorization: store.getState().IdToken,
      },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((repos) => {
        this.setState({
          visitingUsers: {
            labels: repos.x,
            datasets: [
              {
                data: repos.y,
              },
            ],
            total: repos.y.reduce((result, number) => result + number),
          },
        });

        console.log(this.state.visitingUsers);
      });
  }

  // setGradientColor = (canvas, color) => {
  //   const ctx = canvas.getContext("2d");
  //   const gradient = ctx.createLinearGradient(0, 0, 600,500);
  //   gradient.addColorStop(0,color)
  //   gradient.
  // };

  getVistedChart = () => {
    const data = this.state.vistedUsers;
    if (data.datasets) {
      let colors = ["rgba(217, 39, 39, 1)", "rgba(75,192,192,0.4)"];
      data.datasets.forEach((set, i) => {
        set.backgroundColor = colors[i];
        set.borderColor = "white";
        set.borderWidth = 2;
        set.label = "";
        set.fill = false;
        set.lineTension = 0.1;
        set.backgroundColor = "rgba(75,192,192,0.4)";
        set.borderColor = "rgba(75,192,192,1)";
        set.borderCapStyle = "round";
        set.borderDash = [];
        set.borderDashOffset = 0.0;
        set.borderJoinStyle = "miter";
        set.pointBorderColor = "rgba(75,192,192,1)";
        set.pointBackgroundColor = "#fff";
        set.pointBorderWidth = 1;
        set.pointHoverRadius = 5;
        set.pointHoverBackgroundColor = "rgba(75,192,192,1)";
        set.pointHoverBorderColor = "rgba(220,220,220,1)";
        set.pointHoverBorderWidth = 2;
        set.pointRadius = 1;
        set.pointHitRadius = 10;
      });
    }
    return data;
  };

  getDurationChart = () => {
    const data = this.state.durationOfStay;
    if (data.datasets) {
      let colors = ["rgba(217, 39, 39, 1)", "rgba(75,192,192,0.4)"];
      data.datasets.forEach((set, i) => {
        set.backgroundColor = colors[i];
        set.borderColor = "white";
        set.borderWidth = 2;
        set.label = "";
        set.fill = false;
        set.lineTension = 0.1;
        set.backgroundColor = "rgba(75,192,192,0.4)";
        set.borderColor = "rgba(75,192,192,1)";
        set.borderCapStyle = "round";
        set.borderDash = [];
        set.borderDashOffset = 0.0;
        set.borderJoinStyle = "miter";
        set.pointBorderColor = "rgba(75,192,192,1)";
        set.pointBackgroundColor = "#fff";
        set.pointBorderWidth = 1;
        set.pointHoverRadius = 5;
        set.pointHoverBackgroundColor = "rgba(75,192,192,1)";
        set.pointHoverBorderColor = "rgba(220,220,220,1)";
        set.pointHoverBorderWidth = 2;
        set.pointRadius = 1;
        set.pointHitRadius = 10;
      });
    }
    return data;
  };

  getPatronChart = () => {
    const data = this.state.patronUsers;
    if (data.datasets) {
      let colors = ["rgba(217, 39, 39, 1)", "rgba(75,192,192,0.4)"];
      data.datasets.forEach((set, i) => {
        set.backgroundColor = colors[i];
        set.borderColor = "white";
        set.borderWidth = 2;
        set.label = "";
        set.fill = false;
        set.lineTension = 0.1;
        set.backgroundColor = "rgba(75,192,192,0.4)";
        set.borderColor = "rgba(75,192,192,1)";
        set.borderCapStyle = "round";
        set.borderDash = [];
        set.borderDashOffset = 0.0;
        set.borderJoinStyle = "miter";
        set.pointBorderColor = "rgba(75,192,192,1)";
        set.pointBackgroundColor = "#fff";
        set.pointBorderWidth = 1;
        set.pointHoverRadius = 5;
        set.pointHoverBackgroundColor = "rgba(75,192,192,1)";
        set.pointHoverBorderColor = "rgba(220,220,220,1)";
        set.pointHoverBorderWidth = 2;
        set.pointRadius = 1;
        set.pointHitRadius = 10;
      });
    }
    return data;
  };

  getVisitingChart = () => {
    const data = this.state.visitingUsers;
    if (data.datasets) {
      let colors = ["rgba(217, 39, 39, 1)", "rgba(75,192,192,0.4)"];
      data.datasets.forEach((set, i) => {
        set.backgroundColor = colors[i];
        set.borderColor = "white";
        set.borderWidth = 2;
        set.label = "";
        set.fill = false;
        set.lineTension = 0.1;
        set.backgroundColor = "rgba(75,192,192,0.4)";
        set.borderColor = "rgba(75,192,192,1)";
        set.borderCapStyle = "round";
        set.borderDash = [];
        set.borderDashOffset = 0.0;
        set.borderJoinStyle = "miter";
        set.pointBorderColor = "rgba(75,192,192,1)";
        set.pointBackgroundColor = "#fff";
        set.pointBorderWidth = 1;
        set.pointHoverRadius = 5;
        set.pointHoverBackgroundColor = "rgba(75,192,192,1)";
        set.pointHoverBorderColor = "rgba(220,220,220,1)";
        set.pointHoverBorderWidth = 2;
        set.pointRadius = 1;
        set.pointHitRadius = 10;
      });
    }
    return data;
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    var datoFra = this.state.datoFra;
    var datoTil = this.state.datoTil;
    var alderFra = this.state.alderFra;
    var alderTil = this.state.alderTil;
    var gender = this.state.gender;

    this.fetchVisitedUsers(datoFra, datoTil, alderFra, alderTil, gender);
    this.fetchPatronUsers(datoFra, datoTil, alderFra, alderTil, gender);
    this.fetchDurationOfStay(datoFra, datoTil, alderFra, alderTil, gender);
    this.fetchVistingUsers(datoFra, datoTil, alderFra, alderTil, gender);
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
            <div className="field" style={{ width: "100px" }}>
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
            <div className="field" style={{ width: "100px" }}>
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

            <div className="field" style={{ width: "100px" }}>
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

            <div className="field" style={{ width: "100px" }}>
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

            <div className="field" style={{ width: "100px" }}>
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
          <div
            style={{
              position: "absolute",
              width: 600,
              height: 500,
              top: "473px",
              left: "660px",
            }}
          >
            <Bar
              data={this.getVistedChart}
              options={{
                responsive: true,
                title: {
                  display: this.props.displayTitle,
                  text: "Besøgte Gæster",
                  fontSize: 15,
                },
                legend: {
                  display: false,
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
              position: "absolute",
              width: 250,
              height: 100,
              top: "290px",
              left: "780px",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: 250,
                height: 100,
                top: "68px",
                left: "115px",
              }}
            >
              {this.state.visitingUsers.total}
            </div>
            <Doughnut
              data={this.getVisitingChart}
              options={{
                responsive: true,
                title: {
                  display: this.props.displayTitle,
                  text: "Nuværende Gæster",
                  fontSize: 15,
                },
                legend: {
                  display: false,
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
              }}
            />
          </div>

          <div
            style={{
              position: "absolute",
              width: 500,
              height: 400,
              top: "473px",
              left: "140px",
            }}
          >
            <Line
              data={this.getDurationChart}
              options={{
                responsive: true,
                title: {
                  display: this.props.displayTitle,
                  text: "Besøg Tid",
                  fontSize: 15,
                },
                legend: {
                  display: false,
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
              width: 400,
              height: 300,
              position: "absolute",
              top: "-50px",
              left: "200px",
            }}
          >
            <Bar
              data={this.getPatronChart}
              options={{
                responsive: true,
                title: {
                  display: this.props.displayTitle,
                  text: "Stamkunder",
                  fontSize: 15,
                },
                legend: {
                  display: false,
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
        </div>
      </div>
    );
  }
}

export default Chart;
