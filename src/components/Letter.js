import React, { useEffect, useState } from "react";

import RSVP from "./RSVP.js";

import hogwartsLogo from "../images/pngegg.png";
import rsvpOwl from "../images/owl2.png";

import "./Letter.css";

const Letter = function () {
  const [showRSVP, setShowRSVP] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(true);

  const rsvp = localStorage.getItem("rsvp");

  useEffect(() => {
    setHasSubmitted(rsvp);
  }, [setHasSubmitted, rsvp, hasSubmitted]);

  const showRSVPLetterHandler = function () {
    if (!hasSubmitted) {
      setShowRSVP(true);
    }
  };

  return (
    <>
      <div className="letter">
        <img className="letter-logo" src={hogwartsLogo} alt="hogwart logo" />
        <h1 className="letter-heading">
          Hogwarts School of Witchcraft and Wizardry
        </h1>
        <p className="letter-info">
          We are pleased to inform you that you have been accepted to Hogwarts
          School of Witchcraft and Wizardry. You have been invited to attend a
          gathering on 27 April 2024 at 14:00pm. To avoid detection by muggles,
          everyone should gather at Minnaar str, Vaalpark, Sasolburg (Bar with
          no name), there you will travel on foot to platform 9 & &frac34;
        </p>
        <p className="rsvp">
          We await your owl as well as the POP no later then 5 April 2024, if
          your family does not have an owl, you may use a muggle phone to call
          Jeanrie at 079 520 1056 or Gysie at 082 601 5489.
        </p>
        <p className="tobring">
          Kindly ensure to make the necessary payment for food this includes a
          main meal and desert. Banking details will be provided on the RSVP
          page. Additionally, there will be a cash bar available please don't
          bring your own drinks. Please RSVP, and confirm your attendance by
          providing both an RSVP response and proof of payment. Thank you
        </p>
        <ul className="pryse-list">
          Prices:
          <li>Kids 13 years and adults R250 p/p</li>
          <li>Kids 1-6 years R50 p/p</li>
          <li>Kids 7-12 years R125 p/p</li>
        </ul>

        <div className="wrapper">
          <div>
            <p className="letter-ending">Your sincerely,</p>
            <p className="signed">Minerva Mc Gonagall</p>
            <p className="signed-by">Deputy headmistress</p>
          </div>
          {!hasSubmitted && (
            <button onClick={showRSVPLetterHandler} className="owl-rsvp">
              <img className="owl-img" src={rsvpOwl} alt="Harry Potter Owl" />
              <p className="rsvp-text">R . S . V . P</p>
            </button>
          )}
        </div>
        {hasSubmitted && (
          <p className="already-RSVP">You have already RSVP. Thank you!</p>
        )}
      </div>
      {showRSVP && <RSVP />}
    </>
  );
};
export default Letter;
