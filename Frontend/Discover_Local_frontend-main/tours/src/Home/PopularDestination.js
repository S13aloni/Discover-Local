import React from 'react';
import './PopularDestination.css';

const destinations = [
  { id: 1, name: 'Delhi', image: 'https://www.omaxe.com/blog/wp-content/uploads/2017/11/Magnificent-Monuments-of-Delhi.png' },
  { id: 2, name: 'Mumbai', image: 'https://cdn.britannica.com/26/84526-050-45452C37/Gateway-monument-India-entrance-Mumbai-Harbour-coast.jpg' },
  { id: 3, name: 'Goa', image: 'https://lp-cms-production.imgix.net/2024-07/shutterstockRF248021569.jpg?w=1440&h=810&fit=crop&auto=format&q=75' },
  { id: 4, name: 'Jaipur', image: 'https://assets.cntraveller.in/photos/621489890fb9c3937ea2ebcb/16:9/w_1024%2Cc_limit/jaipur%2520lead.jpg' },
];

const PopularDestinations = () => {
  return (
    <div className="popular-destinations">
      <div className="header">
        <h2 className="title">Top Destinations</h2>
        <div className="details">
          <p className="details-text">850+ Destinations</p>
          <p className="details-description">One of the most well-liked travel companies for people looking to experience adventure and see the world is Tourism.</p>
        </div>
      </div>
      <div className="cards-container">
        {destinations.map(destination => (
          <div key={destination.id} className="destination-card">
            <img src={destination.image} alt={destination.name} className="destination-image" />
            <h3 className="destination-name">{destination.name}</h3>
            <button className="view-more-buttonPD">View More</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularDestinations;
