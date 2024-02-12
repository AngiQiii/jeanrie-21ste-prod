import React, { Fragment, useCallback, useState } from "react";

import sortingHat from "../images/Daco_4207497.png";

import gryffindor from "../images/houses/gryffindor.webp";
import hufflepuff from "../images/houses/hufflepuff.webp";
import ravenclaw from "../images/houses/ravenclaw.webp";
import slytherin from "../images/houses/slytherin.webp";

import "./RSVP.css";

const RSVP = function () {
  const [firstName, setFirstName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [totalAdults, setTotalAdults] = useState("");
  const [totalKids, setTotalKids] = useState("");
  const [showHouse, setShowHouse] = useState(false);
  const [houseList, setHouseList] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submitted = "submitted";

  const validateForm = useCallback(() => {
    const NumberRegex = /^[0-9]{10}$/;

    if (!firstName.trim()) {
      return "Name is required!";
    } else if (!/^[a-zA-Z]*$/.test(firstName)) {
      return "Invalid characters in first name, should only be letters";
    }

    if (!contactNumber.trim()) {
      return "Phone number is required";
    } else if (!NumberRegex.test(contactNumber)) {
      return "Invalid phone number must be numbers";
    }

    if (!totalAdults.trim()) {
      return "Number is required can put 0";
    } else if (!/^[0-9]/.test(totalAdults)) {
      return "A Number is required can put 0";
    } else if (totalAdults > 10) {
      return "The number you entered is to high";
    }

    if (!totalKids.trim()) {
      return "Number is required can put 0";
    } else if (!/^[0-9]/.test(totalKids)) {
      return "A Number is required can put 0";
    } else if (totalKids > 10) {
      return "The number you entered is to high";
    }

    return "";
  }, [contactNumber, firstName, totalAdults, totalKids]);

  const randomHouses = [
    { image: gryffindor, houseName: "Gryfindor" },
    { image: hufflepuff, houseName: "Hufflepuff" },
    { image: ravenclaw, houseName: "Ravenclaw" },
    { image: slytherin, houseName: "Slytherin" },
  ];

  const getNameHandler = function (event) {
    setFirstName(event.target.value);

    return firstName;
  };

  const getContactNumberHandler = function (event) {
    setContactNumber(event.target.value);

    return contactNumber;
  };

  const getAdultAmountHandler = function (event) {
    setTotalAdults(event.target.value);

    return totalAdults;
  };

  const getKidsAmountHandler = function (event) {
    setTotalKids(event.target.value);

    return totalKids;
  };

  const totalGuest = +totalAdults + +totalKids;

  const displayHousesHandler = function () {
    const newArray = Array.from(Array(totalGuest));

    setErrorMessage("");

    const errorMessage = validateForm();

    if (errorMessage) {
      setErrorMessage(errorMessage);
      return;
    }

    setShowHouse(true);
    setHouseList(
      newArray.map(() => {
        const randomizeIndex = Math.floor(Math.random() * randomHouses.length);
        return {
          image: randomHouses[randomizeIndex].image,
          houseName: randomHouses[randomizeIndex].houseName,
        };
      })
    );
  };

  const formSubmissionHandler = useCallback(
    async (event) => {
      event.preventDefault();

      setErrorMessage("");

      const errorMessage = validateForm();

      if (errorMessage === "") {
        const data = {
          name: firstName,
          contactNumber: "0" + +contactNumber,
          totalAdults: totalAdults,
          totalKids: totalKids,
          houses: [...houseList.map((house) => house.houseName)],
          totalGuest: totalGuest.toString(),
          paid: false,
        };

        const sendDataHandler = async function () {
          const response = await fetch(
            "https://jeanrie-21-default-rtdb.firebaseio.com/rsvp.json",
            { method: "POST", body: JSON.stringify(data) }
          );

          const rsvpData = await response.json();

          console.log(rsvpData);

          if (!response.ok) {
            throw new Error("Failed to sent data!!!!");
          }
          setIsSubmitted(true);

          localStorage.setItem("rsvp", submitted);
        };

        try {
          await sendDataHandler();
        } catch (error) {
          console.log(error);
        }
      } else {
        setErrorMessage(errorMessage);
        console.log("Form has errors. Cannot submit.");
      }
    },
    [
      contactNumber,
      firstName,
      houseList,
      totalAdults,
      totalGuest,
      totalKids,
      validateForm,
    ]
  );

  return (
    <div className="rsvp-letter">
      <form onSubmit={formSubmissionHandler} className="rsvp-form">
        <ul className="form">
          <div className="form-wrapper">
            <li>
              <label className="form-label" htmlFor="name">
                First name:
              </label>
              <br />
              <input
                className="form-input"
                type="text"
                name="name"
                id="name"
                value={firstName}
                onChange={getNameHandler}
              />
            </li>
            <li>
              <label className="form-label" htmlFor="number">
                Contact Number:
              </label>
              <br />
              <input
                className="form-input"
                type="text"
                name="number"
                id="number"
                value={contactNumber}
                onChange={getContactNumberHandler}
                required
              />
            </li>
          </div>
          <div className="number-wrapper form-wrapper">
            <li>
              <label className="form-label" htmlFor="amount">
                Total Adult:
              </label>
              <br />
              <input
                className="form-amount"
                type="text"
                name="amount"
                id="amount"
                value={totalAdults}
                onChange={getAdultAmountHandler}
                required
              />
            </li>
            <li>
              <label className="form-label" htmlFor="amount">
                Total Children:
              </label>
              <br />
              <input
                className="form-amount"
                type="text"
                name="amount"
                id="amount"
                value={totalKids}
                onChange={getKidsAmountHandler}
                required
              />
            </li>
          </div>
        </ul>

        <h2 className="randomize">
          It's time for the sorting hat to choose your house!
        </h2>
        <img className="sortingHatImg" src={sortingHat} alt="sorting hat" />
        <div className="btn">
          <div className="houses">
            {showHouse &&
              houseList.map((house, index) => {
                return (
                  <div key={house.houseName + index} className="house">
                    <img
                      alt="houseImage"
                      src={house.image}
                      width="100%"
                      height="100%"
                    />
                    <p className="houseName">{house.houseName}</p>
                  </div>
                );
              })}
          </div>

          {!showHouse && (
            <>
              {errorMessage ? <p>{errorMessage}</p> : null}
              <br />
              <button onClick={displayHousesHandler} className="random-btn">
                Sort in houses
              </button>
            </>
          )}
          {showHouse && !isSubmitted && (
            <div className="submit-btn">
              {errorMessage ? <p>{errorMessage}</p> : null}
              <br />
              <input className="submit" type="submit" value="submit" />
            </div>
          )}
          {isSubmitted && <p className="confirm">Your owl has been sent. 🦉</p>}
          {isSubmitted && (
            <div>
              <h3 className="details">Banking details:</h3>
              <p className="banking-details">ABSA</p>
              <p className="banking-details">G.J du Preez</p>
              <p className="banking-details">4088958089</p>
              <p className="banking-details">Tjek rekening</p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default RSVP;
