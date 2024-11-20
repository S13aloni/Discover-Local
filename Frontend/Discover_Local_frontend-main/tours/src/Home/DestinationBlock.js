import React, { useState, useEffect } from 'react';
import './DestinationBlock.css';
import { FaMapMarkerAlt, FaHiking, FaClock, FaSearch } from 'react-icons/fa';

const DestinationBlock = () => {
  // State to hold form data fetched from JSON
  const [destinations, setDestinations] = useState([]);
  const [adventureTypes, setAdventureTypes] = useState([]);
  const [durations, setDurations] = useState([]);

  // Fetch data from backend or local JSON (simulating fetch)
  useEffect(() => {
    const fetchData = () => {
      const data = {
        destinations: ["Delhi", "Mumbai", "Goa", "Jaipur"],
        adventureTypes: ["Hiking", "Beach", "Safari", "Camping"],
        durations: ["1 Day", "3 Days", "1 Week", "2 Weeks"]
      };
      setDestinations(data.destinations);
      setAdventureTypes(data.adventureTypes);
      setDurations(data.durations);
    };
    
    fetchData();
  }, []);

  return (
    <div className="destination-block-home">
      <h2 className="block-title-home">Plan Your Adventure</h2>
      <div className="form-container-home">
        <div className="form-group-home">
          <label htmlFor="destination-home">
            <FaMapMarkerAlt className="icon-home" /> Select Destination
          </label>
          <select id="destination-home" className="dropdown-home">
            <option value="">Select a city in India</option>
            {destinations.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div className="form-group-home">
          <label htmlFor="adventureType-home">
            <FaHiking className="icon-home" /> Adventure Type
          </label>
          <select id="adventureType-home" className="dropdown-home">
            <option value="">Select Adventure Type</option>
            {adventureTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="form-group-home">
          <label htmlFor="duration-home">
            <FaClock className="icon-home" /> Duration
          </label>
          <select id="duration-home" className="dropdown-home">
            <option value="">Select Duration</option>
            {durations.map((duration, index) => (
              <option key={index} value={duration}>{duration}</option>
            ))}
          </select>
        </div>

        <button className="search-button-home">Search<FaSearch className="search-icon-home"/></button>
      </div>
    </div>
  );
};

export default DestinationBlock;
