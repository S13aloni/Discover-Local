import React, { useEffect, useState } from 'react';
import './MeetOurGuide.css';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const MeetOurGuide = () => {
  const guides = [
    {
      name: "John Doe",
      title: "Adventure Guide",
      img: "1.jpg",
      topImage: "1.jpg",
    },
    {
      name: "Jane Smith",
      title: "Cultural Guide",
      img: "2.jpg",
      topImage: "2.jpg",
    },
    {
      name: "Mike Johnson",
      title: "Wildlife Guide",
      img: "3.jpg",
      topImage: "3.jpg",
    },
    {
      name: "Emily Davis",
      title: "City Guide",
      img: "4.jpg",
      topImage: "4.jpg",
    },
    {
      name: "Alex Brown",
      title: "Eco Tour Guide",
      img: "1.jpg",
      topImage: "1.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextGuide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (guides.length - 2));
  };

  const prevGuide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + guides.length - 2) % (guides.length - 2));
  };

  useEffect(() => {
    const interval = setInterval(nextGuide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="meet-our-guide-meet">
      <h1 className='h1-guide-meet'>Meet the Guide</h1>
      <h2 className='h2-guide-meet'>Meet Our Tour Guide</h2>
      <section className="guides-meet">
        <div className="carousel-meet">
          <button className="prev-button-meet" onClick={prevGuide}>&#10094;</button>
          <div className="guide-cards-meet">
            {guides.slice(currentIndex, currentIndex + 3).map((guide, index) => (
              <div key={index} className="guide-card-meet">
                <div className="top-image-meet" style={{ backgroundImage: `url(${guide.topImage})` }}></div>
                <img src={guide.img} alt={guide.name} className="profile-pic-meet" />
                <div className="guide-details-meet">
                  <h2>{guide.name}</h2>
                  <h3>{guide.title}</h3>
                  <div className="social-icons-meet">
                    <a href="https://facebook.com" className="social-icon-meet" aria-label="Facebook">
                        <FaFacebookF />
                    </a>
                    <a href="https://instagram.com" className="social-icon-meet" aria-label="Instagram">
                        <FaInstagram />
                    </a>
                    <a href="https://twitter.com" className="social-icon-meet" aria-label="Twitter">
                        <FaTwitter />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="next-button-meet" onClick={nextGuide}>&#10095;</button>
        </div>
      </section>
    </div>
  );
};

export default MeetOurGuide;
