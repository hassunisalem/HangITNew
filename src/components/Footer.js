import React from "react";
import { isAbsolute } from "path";

export default function Footer() {
  return (
    <footer
      className="footer"
      style={{
        position: "absolute",

        bottom: 0
      }}
    >
      <div className="content has-text-bottom">
        <p>
          Hexal 2019. The source code is licensed MIT. The website content is
          licensed CC BY NC SA 4.0.
        </p>
      </div>
    </footer>
  );
}
