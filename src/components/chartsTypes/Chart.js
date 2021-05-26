import React, { Component, Suspense } from "react";

// import datas from "../DummyData.json";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import store from "../../store";
import "bootstrap/dist/css/bootstrap.min.css";

import dashboardPanelChart from "../../variables/chart.js";

import PanelHeader from "../PanelHeader/PanelHeader.js";

// import { makeStyles } from "@material-ui/core/";
// import { Grid, Paper } from "@material-ui/core/";

// import GridLayout from "react-grid-layout";
// import { Responsive as ResponsiveGridLayout } from "react-grid-layout";

import "react-dates/lib/css/_datepicker.css";
import moment from "moment";

// import calender from "../Calender";
import { DateRangePicker } from "react-dates";

// import DatePicker from "react-datepicker";

import Dropdown from "react-dropdown";

// import { Auth } from "aws-amplify";

import TimeField from "react-simple-timefield";

// import * as ActionConstructer from "../../actions/ActionConstructer";

import ProgressBar from "react-bootstrap/ProgressBar";

import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";

import { CardBody, Card, Row, Col } from "reactstrap";
// import { Container } from "aws-amplify-react";

// import getVenues from "./getVenues";
// const useStyles = makeStyles((theme) => ({
//   grid: {
//     width: "100%",
//     margin: "0px",
//   },
//   paper: {
//     padding: theme.spacing(2),
//     textAlign: "center",
//     color: "theme. palette.succes.dark",
//   },
// }));

registerLocale("es", es);

class Chart extends Component {
  state = {
    capacity: [],

    venues: [],

    selectedOption: "1",

    focusedInput: null,

    startDate: moment().subtract(10, "years"),
    endDate: moment(),

    startTime: moment().subtract(6, "hours").format("hh:mm:s"),
    endTime: moment().format("hh:mm:s"),
    // moment().format("YYYY-MM-DD hh-mm-ss")

    alderFra: "1",
    alderTil: "100",
    gender: "NULL",

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
    ageDist: {
      labels: [],
      datasets: [],
    },
  };

  timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

  async componentWillMount() {

    

    var idToken = store.getState().IdToken;

    this.onStartTimeChange = this.onStartTimeChange.bind(this);
    this.onEndTimeChange = this.onEndTimeChange.bind(this);


    await this.timeout(10);
  this.handleSubmit();



  }


  fetchCapacity(venueId) {
    var URL =
      "https://it403ry3h6.execute-api.eu-central-1.amazonaws.com/dev?customerId=Customer_1&venueId=" +
      venueId;

    console.log(URL);

    fetch(URL, {
      headers: {
        // "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "http://localhost:3000/chart",
        Authorization: store.getState().IdToken,
      },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((repos) => {
        this.setState({
          capacity: repos[0].capacity,
        });
      });
    console.log(this.state.capacity);
  }

  fetchVenues(customerId) {
    var URL =
      "https://atvetw1fud.execute-api.eu-central-1.amazonaws.com/dev?customerId=" +
      customerId;

     console.log(URL);

    fetch(URL, {
      headers: {
        // "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "http://localhost:3000/chart",
        Authorization: store.getState().IdToken,
      },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((repos) => {
        this.setState({
          venues: repos.VenueId,
        });

        // console.log(this.state.venues);
      });
  }

  fetchVisitedUsers(
    startDate,
    endDate,
    tidFra,
    tidTil,
    alderFra,
    alderTil,
    gender,
    venue
  ) {
    var URL =
      "https://a60ad7y7e0.execute-api.eu-central-1.amazonaws.com/dev?action=retrieval&customerId=Customer_1&venueId=" +
      venue +
      "&timeStampStart=" +
      startDate +
      tidFra +
      "&timeStampEnd=" +
      endDate +
      tidTil +
      "&ageEnd=" +
      alderTil +
      "&zipCodeStart=0000&zipCodeEnd=9000&gender=" +
      gender +
      "&ageStart=" +
      alderFra;

     console.log(URL);

    fetch(URL, {
      headers: {
        // "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "http://localhost:3000/chart",
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

        //   console.log(this.state.vistedUsers);
      });
  }

  fetchPatronUsers(
    startDate,
    endDate,
    tidFra,
    tidTil,
    alderFra,
    alderTil,
    gender,
    venue
  ) {
    var URL =
      "https://lrsik6gsgh.execute-api.eu-central-1.amazonaws.com/dev?customerId=Customer_1&venueId=" +
      venue +
      "&timeStampStart=" +
      startDate +
      tidFra +
      "&timeStampEnd=" +
      endDate +
      tidTil +
      "&ageEnd=" +
      alderTil +
      "&zipCodeStart=0000&zipCodeEnd=9000&gender=" +
      gender +
      "&ageStart=" +
      alderFra;

     console.log(URL);

    fetch(URL, {
      headers: {
        // "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "http://localhost:3000/chart",
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

        //  console.log(this.state.patronUsers);
      });
  }

  fetchDurationOfStay(
    startDate,
    endDate,
    tidFra,
    tidTil,
    alderFra,
    alderTil,
    gender,
    venue
  ) {
    var URL =
      "https://ljkp2u0md2.execute-api.eu-central-1.amazonaws.com/dev?customerId=Customer_1&venueId=" +
      venue +
      "&timeStampStart=" +
      startDate +
      tidFra +
      "&timeStampEnd=" +
      endDate +
      tidTil +
      "&ageEnd=" +
      alderTil +
      "&zipCodeStart=0000&zipCodeEnd=9000&gender=" +
      gender +
      "&ageStart=" +
      alderFra;

    console.log(URL);

    fetch(URL, {
      headers: {
        // "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "http://localhost:3000/chart",
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

  fetchAgeDist(
    startDate,
    endDate,
    tidFra,
    tidTil,
    alderFra,
    alderTil,
    gender,
    venue
  ) {
    var URL =
      "https://k7mb52gfg0.execute-api.eu-central-1.amazonaws.com/dev?customerId=Customer_1&action=gender&venueId=" +
      venue +
      "&timeStampStart=" +
      startDate +
      tidFra +
      "&timeStampEnd=" +
      endDate +
      tidTil +
      "&ageEnd=" +
      alderTil +
      "&zipCodeStart=0000&zipCodeEnd=9000&gender=" +
      gender +
      "&ageStart=" +
      alderFra;

    console.log(URL);

    fetch(URL, {
      headers: {
        // "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "http://localhost:3000/chart",
        Authorization: store.getState().IdToken,
      },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((repos) => {
        this.setState({
          ageDist: {
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

  fetchVistingUsers(
    startDate,
    endDate,
    tidFra,
    tidTil,
    alderFra,
    alderTil,
    gender,
    venue
  ) {
    var URL =
      "https://a60ad7y7e0.execute-api.eu-central-1.amazonaws.com/dev?action=delivery&customerId=Customer_1&venueId=" +
      venue +
      "&timeStampStart=" +
      startDate +
      tidFra +
      "&timeStampEnd=" +
      endDate +
      tidTil +
      "&ageEnd=" +
      alderTil +
      "&zipCodeStart=0000&zipCodeEnd=9000&gender=" +
      gender +
      "&ageStart=" +
      alderFra;

    // console.log(URL);

    fetch(URL, {
      headers: {
        // "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "http://localhost:3000/chart",
        Authorization: store.getState().IdToken,
      },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((repos) => {
        if (repos.y != null) {
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
        }

        //  console.log(this.state.visitingUsers);
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

  getAgeDistChart = () => {
    const data = this.state.ageDist;
    if (data.datasets) {
      let colors = ["rgba(217, 39, 39, 1)", "rgba(75,192,192,0.4)"];
      data.datasets.forEach((set, i) => {
        set.backgroundColor = colors[i];
        set.borderColor = "red";
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
        set.borderColor = "red";
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
    if (event != null) {
      event.preventDefault();
    }

    var datoFra = this.state.startDate.format("YYYY-MM-DD ");
    var datoTil = this.state.endDate.format("YYYY-MM-DD ");
    var tidFra = this.state.startTime;
    var tidTil = this.state.endTime;
    var alderFra = this.state.alderFra;
    var alderTil = this.state.alderTil;
    var gender = this.state.gender;
    var venue = this.state.selectedOption.value;

    this.fetchVenues("Customer_1");
    this.fetchVisitedUsers(
      datoFra,
      datoTil,
      tidFra,
      tidTil,
      alderFra,
      alderTil,
      gender,
      venue
    );
    this.fetchPatronUsers(
      datoFra,
      datoTil,
      tidFra,
      tidTil,
      alderFra,
      alderTil,
      gender,
      venue
    );
    this.fetchDurationOfStay(
      datoFra,
      datoTil,
      tidFra,
      tidTil,
      alderFra,
      alderTil,
      gender,
      venue
    );
    this.fetchVistingUsers(
      datoFra,
      datoTil,
      tidFra,
      tidTil,
      alderFra,
      alderTil,
      gender,
      venue
    );
    this.fetchAgeDist(
      datoFra,
      datoTil,
      tidFra,
      tidTil,
      alderFra,
      alderTil,
      gender,
      venue
    );
    console.log("aye");
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

  onStartTimeChange(event, startTime) {
    this.setState({ startTime });
  }

  onEndTimeChange(event, endTime) {
    this.setState({ endTime });
  }

  xProcentOfY(total, capacity) {
    return (total / capacity) * 100;
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

  _onSelect = (selectedOption) => {
    this.setState({ selectedOption });
    //console.log(this.state.selectedOption.value);
    this.fetchCapacity(selectedOption.value);
  };

  setStartDate(date) {
    this.setState({ startDate: date });
  }

  setEndDate(date) {
    this.setState({ endDate: date });
  }



  render() {
    return (
      <div className="all charts">
        <Card className="card-chart">
          <CardBody>
            <div className="chart-area">
              <Row>
                <Col xs={12} md={4}>
                  <Dropdown
                    value={this.state.selectedOption}
                    onChange={this._onSelect}
                    options={this.state.venues}
                  />
                </Col>
                <br></br>
                <Col xs={12} md={2}>
                  <ProgressBar
                    now={this.xProcentOfY(
                      this.state.visitingUsers.total,
                      this.state.capacity
                    )}
                  />
                </Col>
              </Row>
              <br></br>

              <Row>
                <Col>
                  <DateRangePicker
                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                    startDateId={"1"} // PropTypes.string.isRequired,
                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                    endDateId={"2"} // PropTypes.string.isRequired,
                    onDatesChange={({ startDate, endDate }) =>
                      this.setState({ startDate, endDate })
                    } // PropTypes.func.isRequired,
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={(focusedInput) =>
                      this.setState({ focusedInput })
                    } // PropTypes.func.isRequired,
                    isOutsideRange={() => false}
                  />
                </Col>
                Tid Fra
                <Col>
                  <TimeField
                    style={{ width: "50px" }}
                    value={this.state.startTime}
                    onChange={this.onStartTimeChange}
                  />
                </Col>
                Tid Til
                <Col>
                  <TimeField
                    style={{ width: "50px" }}
                    value={this.state.endTime}
                    onChange={this.onEndTimeChange}
                  />
                </Col>
                Alder Fra
                <Col>
                  <div className="field" style={{ width: "100px" }}>
                    <p className="control">
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
                </Col>
                Alder til
                <Col>
                 
                 
                </Col>
                Køn
                <Col>
                  <div className="field" style={{ width: "100px" }}>
                    <p className="control">
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
                </Col>
                <Col>
                  <div className="field">
                    <p className="control">
                      <button
                        onClick={this.handleSubmit}
                        className="button is-success"
                      >
                        Hent Data
                      </button>
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
          </CardBody>
        </Card>
        <br></br>


            <PanelHeader
     size="lg"
     content={
       <Bar
         data={this.getVistedChart}
         options={dashboardPanelChart.options}
       />
    
     }
   />
        <Row>
          <Col xs={12} md={4}>
            {/* <div
              // key="b"
              style={{
                datagrid: { x: 10, y: 10, w: 10, h: 20 },
                color: "red",
                position: "absolute",
                width: 600,
                height: 500,
                top: "473px",
                left: "660px",
              }}
            > */}

            <Card className="card-chart">
              <CardBody>
                <div className="chart-area">
                </div>
              </CardBody>
            </Card>
            {/* </div> */}
          </Col>
          <Col xs={12} md={4}>
            {/* <div
                        style={{
                          position: "absolute",
                          width: 250,
                          height: 100,
                          top: "290px",
                          left: "780px",
                        }}
                      > */}
            <Card className="card-chart">
              <CardBody>
                <div className="chart-area">
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
              </CardBody>
            </Card>
            {/* </div> */}
          </Col>

          <Col xs={12} md={4}>
            {/* <div
              // key="b"
              style={{
                datagrid: { x: 10, y: 10, w: 10, h: 20 },
                color: "red",
                position: "absolute",
                width: 600,
                height: 500,
                top: "873px",
                left: "260px",
              }}
            > */}
            <Card className="card-chart">
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={this.getAgeDistChart}
                    options={{
                      responsive: true,
                      title: {
                        display: this.props.displayTitle,
                        text: "Aldersfordeling",
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
              </CardBody>
            </Card>
            {/* </div> */}
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col xs={12} md={4} sm={{ size: 4, offset: 2 }}>
            <Card className="card-chart">
              <CardBody>
                <div className="chart-area">
                  {/* <div
                style={{
                  position: "absolute",
                  width: 500,
                  height: 400,
                  top: "473px",
                  left: "140px",
                }}
              > */}
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
                  {/* </div> */}
                </div>
              </CardBody>
            </Card>
            {/* <div
          style={{
            height: 210,
            width: 210,
            position: "absolute",
            top: "140px",
            left: "470px",
          }}
        > */}
          </Col>

          <Col sm={{ size: 4, offset: 1 }}>
            <Card className="card-chart">
              <CardBody>
                <div className="chart-area">
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
                  {/* </div> */}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Chart;
