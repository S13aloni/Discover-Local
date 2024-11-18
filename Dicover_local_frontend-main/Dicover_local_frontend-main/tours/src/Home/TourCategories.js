// import React, { useState, useEffect } from 'react';
// import './TourCategories.css';

// const cards = [
//   { id: 1, name: 'Delhi', image: 'https://www.omaxe.com/blog/wp-content/uploads/2017/11/Magnificent-Monuments-of-Delhi.png' },
//   { id: 2, name: 'Mumbai', image: 'https://cdn.britannica.com/26/84526-050-45452C37/Gateway-monument-India-entrance-Mumbai-Harbour-coast.jpg' },
//   { id: 3, name: 'Goa', image: 'https://lp-cms-production.imgix.net/2024-07/shutterstockRF248021569.jpg?w=1440&h=810&fit=crop&auto=format&q=75' },
//   { id: 4, name: 'Jaipur', image: 'https://assets.cntraveller.in/photos/621489890fb9c3937ea2ebcb/16:9/w_1024%2Cc_limit/jaipur%2520lead.jpg' },
//   { id: 5, name: 'Agra', image: '1.jpg' },
//   { id: 1, name: 'Delhi', image: 'https://www.omaxe.com/blog/wp-content/uploads/2017/11/Magnificent-Monuments-of-Delhi.png' },
//   { id: 2, name: 'Mumbai', image: 'https://cdn.britannica.com/26/84526-050-45452C37/Gateway-monument-India-entrance-Mumbai-Harbour-coast.jpg' },
//   { id: 3, name: 'Goa', image: 'https://lp-cms-production.imgix.net/2024-07/shutterstockRF248021569.jpg?w=1440&h=810&fit=crop&auto=format&q=75' },
//   { id: 4, name: 'Jaipur', image: 'https://assets.cntraveller.in/photos/621489890fb9c3937ea2ebcb/16:9/w_1024%2Cc_limit/jaipur%2520lead.jpg' },
//   { id: 5, name: 'Agra', image: '1.jpg' }
// ];

// const TourCategories = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const [transitionEnabled, setTransitionEnabled] = useState(true);

//   const totalCards = cards.length;

//   useEffect(() => {
//     let interval;
//     if (!isPaused) {
//       interval = setInterval(() => {
//         setTransitionEnabled(true); // Enable transition for smooth sliding
//         setCurrentIndex((prevIndex) => (prevIndex + 1));
//       }, 2000);
//     }
//     return () => clearInterval(interval);
//   }, [isPaused]);

//   useEffect(() => {
//     // Reset the carousel back to the first card (without animation)
//     if (currentIndex === totalCards) {
//       setTimeout(() => {
//         setTransitionEnabled(false); // Disable transition for instant jump
//         setCurrentIndex(0); // Reset to the first card
//       }, 500); // After the transition ends
//     }
//   }, [currentIndex, totalCards]);

//   return (
//     <div className="tour-categories-container">
//       <h2 className="tour-categories-heading-top">Wonderful Places for You</h2>
//       <h2 className="tour-categories-heading">Tour Categories</h2>
//       <div className="card-carousel-container">
//         <div
//           className="card-carousel"
//           style={{
//             transform: `translateX(-${(currentIndex % totalCards) * (100 / totalCards)}%)`,
//             transition: transitionEnabled ? 'transform 0.5s ease-in-out' : 'none',
//           }}
//         >
//           {[...cards, ...cards,...cards].map((card, index) => ( // Duplicate the card array for infinite scrolling
//             <div
//               key={index}
//               className="carousel-card"
//               onMouseEnter={() => setIsPaused(true)}
//               onMouseLeave={() => setIsPaused(false)}
//             >
//               <img src={card.image} alt={card.name} className="carousel-image" />
//               <h3 className="carousel-title">{card.name}</h3>
//               <a href="#" className="see-more">See More</a>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TourCategories;
import React, { useState, useEffect } from 'react';
import './TourCategories.css';

const TourCategories = () => {
  const [tourData, setTourData] = useState([]); // State to store fetched tour data
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  // Function to fetch tour data from the API
  const fetchTourData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/hidden_gems/');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTourData(data); // Set the fetched tour data in state
    } catch (error) {
      console.error('Error fetching tour data:', error);
    }
  };

  // Fetch tour data on component mount
  useEffect(() => {
    fetchTourData();
  }, []);

  const totalCards = tourData.length;

  useEffect(() => {
    let interval;
    if (!isPaused) {
      interval = setInterval(() => {
        setTransitionEnabled(true);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalCards); // Loop through cards
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPaused, totalCards]);

  useEffect(() => {
    if (currentIndex === totalCards) {
      setTimeout(() => {
        setTransitionEnabled(false);
        setCurrentIndex(0);
      }, 500);
    }
  }, [currentIndex, totalCards]);

  return (
    <div className="tour-categories-container">
      <h2 className="tour-categories-heading-top">Wonderful Places for You</h2>
      <h2 className="tour-categories-heading">Tour Categories</h2>
      <div className="card-carousel-container">
        <div
          className="card-carousel"
          style={{
            transform: `translateX(-${(currentIndex % totalCards) * (100 / totalCards)}%)`,
            transition: transitionEnabled ? 'transform 0.5s ease-in-out' : 'none',
          }}
        >
          {tourData.map((place, index) => (
            <div
              key={place.id} // Use unique id for key
              className="carousel-card"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <img src={place.photos[0]} alt={place.name} className="carousel-image" />
              <h3 className="carousel-title">{place.name}</h3>
              <a href="#" className="see-more">See More</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TourCategories;

