import React, { useState } from "react";

import logo from "../images/10999054_2-removebg-preview.webp";
import waxseal from "../images/waxseal.webp";

import Letter from "./Letter.js";

import "./Envelope.css";

const Envelope = function () {
  const [showLetter, setShowLetter] = useState(false);

  const showLetterHandler = function () {
    setShowLetter(true);
  };

  return (
    <>
      <div className="envelope">
        <div className="envelope-wrapper">
          <button onClick={showLetterHandler} className="waxseal">
            <img className="seal" src={waxseal} alt="Wax seal" />
          </button>
          <div className="background"></div>
          <div className={showLetter ? "" : "shadow-top"}>
            <div className={showLetter ? "flip" : "top"}>
              <img className="logo" src={logo} alt="hogwarts logo" />
            </div>
          </div>
          <div className="leftside"></div>
          <div className="shadow">
            <div className="bottom"></div>
          </div>
          <div className="rightside"></div>
        </div>
      </div>
      {showLetter && <Letter />}
    </>
  );
};

export default Envelope;
