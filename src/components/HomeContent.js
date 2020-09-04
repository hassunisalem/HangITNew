import React from "react";

// import { ThemeProvider } from "styled-components";
// import { GlobalStyles } from "../components/GlobalStyles";
// import { lightTheme, darkTheme } from "../components/Theme";

// import store from "../store";

export default function HomeContent() {
  return (
    <section className="container">
      <div className="columns features">
        <div className="column is-4">
          <div className="card is-shady">
            <div className="card-content">
              <div className="content">
                <h4>Optimise Service</h4>
                <p>
                  The Coat is an intelligent wardrobe system that makes it
                  easier and quicker for a user to deliver and retrieve her or
                  his outerwear to the wardrobe employee.{" "}
                </p>
                <p>
                  <a href="/">Learn more</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="column is-4">
          <div className="card is-shady">
            <div className="card-content">
              <div className="content">
                <h4>Easy To Use</h4>
                <p>
                  When a user arrives to a wardrobe he is met with a wardrobe
                  employee. The wardrobe employee has a hanger with an attached
                  NFC tag and is ready to accept outerwear from the user.
                </p>
                <p>
                  <a href="/">Learn more</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="column is-4">
          <div className="card is-shady">
            <div className="card-content">
              <div className="content">
                <h4>Automatic Payment</h4>
                <p>
                  The user scans the NFC tag attached to the hanger with his
                  smartphone. The number for the outerwear is then stored in the
                  smartphone (and in the Coat server). At the same time the user
                  automatically pays for the keeping of his outerwear, in the
                  wardrobe. The payment is made through the Coat app attached
                  credit card.
                </p>
                <p>
                  <a href="/">Learn more</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
