import React, { useState, useEffect } from 'react';
import './ImageSlider.css';
import { useNavigate } from 'react-router-dom';
const imageData = [
  {
    imgSrc: 'https://plus.unsplash.com/premium_photo-1672115680958-54438df0ab82?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW91bnRhaW5zfGVufDB8fDB8fHww',
    title: 'MANALI',
    description: 'Explore the serene beauty of this amazing destination.',
    
  },
  {
    imgSrc: 'https://media.cnn.com/api/v1/images/stellar/prod/230224150645-01-best-beaches-world-tripadvisor-2023-card.jpg?c=original',
    title: 'GOA',
    description: 'An adventurous destination for thrill-seekers.',
    
  },
  {
    imgSrc: 'https://images.pexels.com/photos/158028/bellingrath-gardens-alabama-landscape-scenic-158028.jpeg?cs=srgb&dl=pexels-pixabay-158028.jpg&fm=jpg',
    title: 'J&K',
    description: 'Perfect for a relaxing getaway with scenic views.',
  
  }
];

const ImageSlider = () => {
  const navigate  = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Change image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === imageData.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // 5 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  return (
    <div className="image-slider">
      {/* Image Section */}
      <div className="image-container">
        <img
          src={imageData[currentIndex].imgSrc}
          alt={imageData[currentIndex].title}
          className="slider-image"
        />
      </div>

      {/* Details Section */}
      <div className="details-container">
        <h2 className="image-title">{imageData[currentIndex].title}</h2>
        <p className="image-description">
          {imageData[currentIndex].description}
        </p>

        <a
          href={imageData[currentIndex].moreInfoLink}
          
        >
          {/* View More */}
        </a>
      </div>
    </div>
  );
};

export default ImageSlider;
