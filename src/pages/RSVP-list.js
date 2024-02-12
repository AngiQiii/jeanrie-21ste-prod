import { useEffect, useState } from "react";
import "./RSVP-list.css";

const RSVPlist = function () {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async function () {
      const response = await fetch(
        "https://jeanrie-21-default-rtdb.firebaseio.com/rsvp.json"
      );

      if (!response.ok) {
        throw new Error("Failed to get data");
      }

      const responseData = await response.json();

      if (!responseData) return;

      setData(responseData);
    };

    try {
      getData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const totalGuests = function () {
    let totalGuests = 0;
    Object.keys(data).forEach((key) => {
      const dataItem = data[key];
      totalGuests =
        totalGuests + Number(dataItem.totalAdults) + Number(dataItem.totalKids);
    });

    return totalGuests;
  };

  async function onCheckPaid(key, dataItem) {
    await fetch(
      `https://jeanrie-21-default-rtdb.firebaseio.com/rsvp/${key}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          ...dataItem,
          paid: !dataItem.paid,
        }),
      }
    );
  }

  return (
    <div className="list-background">
      <table className="rsvp-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Adults</th>
            <th>Children</th>
            <th>House</th>
            <th>Paid</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((key) => {
            const dataItem = data[key];
            return (
              <tr key={key} data-key={key}>
                <td>{dataItem.name}</td>
                <td>{dataItem.contactNumber}</td>
                <td>{dataItem.totalAdults}</td>
                <td>{dataItem.totalKids}</td>
                <td>{dataItem.houses.toString().replace(/,/g, " | ")}</td>
                <td>
                  <input
                    type="checkbox"
                    defaultChecked={dataItem.paid}
                    onChange={async () => await onCheckPaid(key, dataItem)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <p className="total-guests">Total Guests: {data && totalGuests()}</p>
      </div>
    </div>
  );
};

export default RSVPlist;
