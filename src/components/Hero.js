import React from "react";
import logo from "../coatpic.png";

export default function Hero() {
  return (
    <section className="hero is-primary">
      <div className="hero-body">
        <div className="container">
          <img src={logo} alt="conserve energy" />
        </div>
      </div>
    </section>
  );
}
