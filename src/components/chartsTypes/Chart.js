import React, { Component } from "react";
import datas from "../DummyData.json";
import { Bar, Doughnut, Line } from "react-chartjs-2";

import ChartLine from "./ChartLine";

var URL =
  "https://81q1ezd0sf.execute-api.eu-central-1.amazonaws.com/dev/retrieve-deliver-test-open?gender=M&customerId=234&venueId=215&wardrobeId=145&type=all&startTimeStamp=2019-07-22%2014:15:22&endTimeStamp=2019-07-2216:15:22&zipCodeStart=2200&zipCodeEnd=2400&bin=12h";
class Chart extends Component {
  state = {
    pieData: {
      labels: ["Mænd", "Kvinder"],
      datasets: [
        {
          label: "Antal Mænd",
          backgroundColor: [
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 99, 132, 0.6)"
          ],
          data: [this.getGenderMale(), this.getGenderFemale()]
        }
      ]
    },
    userData: {
      labels: [
        "Januar",
        "Febuar",
        "Marts",
        "April",
        "Maj",
        "Juni",
        "Juli",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],

      datasets: [
        {
          label: "Antal Oprettet",
          backgroundColor: "rgba(0, 255, 0, 0.3)",
          data: [
            this.getRegistration("01"),
            this.getRegistration("02"),
            this.getRegistration("03"),
            this.getRegistration("04"),
            this.getRegistration("05"),
            this.getRegistration("06"),
            this.getRegistration("07"),
            this.getRegistration("08"),
            this.getRegistration("09"),
            this.getRegistration("10"),
            this.getRegistration("11"),
            this.getRegistration("12")
          ]
        }
      ]
    },
    chartData: {
      labels: [
        "15 - 16",
        "17 - 18",
        "19 - 20",
        "21 - 22",
        "23 - 24",
        "25 - 26",
        "27 - 28",
        "29 - 30",
        "31 - 32",
        "33 - 34",
        "35 - 36",
        "37 - 38",
        "39 - 40",
        "41 - 42",
        "43 - 44",
        "45 - 46",
        "47 - 48",
        "49 - 50",
        "51 - 52",
        "53 - 54",
        "55 - 56",
        "57 - 58",
        "59 - 60",
        "60+"
      ],
      datasets: [
        {
          label: "Antal Mænd",
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          data: this.sortAgeMale()
        },
        {
          label: "Antal Kvinder",
          backgroundColor: "rgba(255, 99, 132, 0.6)",
          data: this.sortAgeFemale()
        }
      ]
    },
    fetchDatax: {},
    fetchDatay: {},

    testData: {
      labels: [
        "Januar",
        "Febuar",
        "Marts",
        "April",
        "Maj",
        "Juni",
        "Juli",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],

      datasets: [
        {
          label: "Antal Oprettet",
          backgroundColor: "rgba(0, 255, 0, 0.3)",
          data: [
            this.getRegistration("01"),
            this.getRegistration("02"),
            this.getRegistration("03"),
            this.getRegistration("04"),
            this.getRegistration("05"),
            this.getRegistration("06"),
            this.getRegistration("07"),
            this.getRegistration("08"),
            this.getRegistration("09"),
            this.getRegistration("10"),
            this.getRegistration("11"),
            this.getRegistration("12")
          ]
        }
      ]
    }
  };
  /*
  componentDidMount() {
    fetch(URL)
      .then(response => response.json())
      .then(repos => {
        console.log(repos.body.data);
        this.setState({
          testData: {
            labels: repos.body.data.x,
            datasets: [
              {
                data: repos.body.data.y,
                label: "Antal Oprettet",
                backgroundColor: "rgba(0, 255, 0, 0.3)"
              }
            ]
          }
        });

        console.log(this.state.testData);
      });
  }
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
    datas.map(person => {
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
    datas.map(person => {
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
    datas.map(person => {
      if (person.gender === "male") {
        list.push(person);
      }
    });
    return list.length;
  }
  getRegistration(month) {
    var count = [];
    datas.map(person => {
      if (month === person.registered.substring(5, 7)) {
        count.push(person);
      }
    });

    return count.length;
  }

  getGenderFemale() {
    var list = [];
    datas.map(person => {
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
    location: "City"
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
      height: 85
    };
    var circleStyle2 = {
      backgroundColor: "#FFFFFF",
      borderRadius: "50%",
      width: 65,
      height: 65
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
          <Bar
            data={this.state.chartData}
            options={{
              title: {
                display: this.props.displayTitle,
                text: "Aldersfordeling ",
                fontSize: 15
              },
              legend: {
                display: this.props.displayLegend,
                position: this.props.legendPosition
              },
              layout: {
                padding: {
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0
                }
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true
                    }
                  }
                ]
              }
            }}
          />
        </div>

        <div
          style={{
            height: 210,
            width: 210,
            position: "absolute",
            top: "140px",
            left: "470px"
          }}
        >
          <Doughnut
            data={this.state.pieData}
            options={{
              title: {
                display: this.props.displayTitle,
                text: "",
                fontSize: 15
              },
              legend: {
                display: false,
                position: this.props.legendPosition
              },
              scales: {}
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "58px",
              left: "95px",
              fontSize: 18
            }}
          >
            63
          </div>
        </div>

        <ChartLine data={this.state.userData} />
        <ChartLine data={this.state.testData} />
        <button> lel</button>
        <div
          style={{
            position: "absolute",
            top: "420px",
            left: "440px",
            fontSize: 13
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
            fontSize: 37
          }}
        >
          37
        </div>
      </div>
    );
  }
}

export default Chart;
