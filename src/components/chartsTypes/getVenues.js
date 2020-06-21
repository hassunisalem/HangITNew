import React from "react";

const getVenues = () => {
  const [venues, setVenues] = React.useState("");
  const handleVenuesChange = (venues) => {
    setVenues(venues);
    console.log(venues);
  };
  return (
    <select
      name="venues"
      value={venues}
      onChange={(event) => handleVenuesChange(event.target.value)}
    >
      <option id="0">Personal</option>
      <option id="1">Work</option>
    </select>
  );
};

export default getVenues;
