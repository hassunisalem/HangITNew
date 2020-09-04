import React, { Fragment } from "react";
import Hero from "./Hero";
import HomeContent from "./HomeContent";

// import { ThemeProvider } from "styled-components";
// import { GlobalStyles } from "../components/GlobalStyles";
// import { lightTheme, darkTheme } from "../components/Theme";

// import store from "../store";

export default function Home() {
  return (
    <Fragment>
      <Hero />
      <div className="box cta">
        <p className="has-text-centered" />
      </div>
      <HomeContent />
    </Fragment>
  );
}
