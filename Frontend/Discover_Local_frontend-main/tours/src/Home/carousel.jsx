import React from 'react';
import Slider from "react-slick";
import './carousel.css'; // Import the CSS file

const CarouselSlider = () => {
  const settings = {
    dots: true, // Show dots
    infinite: true, // Infinite loop
    speed: 500,
    slidesToShow: 3, // Show 3 slides at a time
    slidesToScroll: 1, // Scroll one slide at a time
    autoplay: true, // Enable auto-slide
    autoplaySpeed: 3000, // Set slide interval to 3 seconds
    responsive: [
      {
        breakpoint: 1024, // Adjust number of slides on screen size change
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  const slidesData = [
    {
      img: "/16.jpg",
      date: "July 06 2024",
      readTime: "7 Min Read",
      title: "The best time to visit Japan & enjoy the cherry blossoms"
    },
    {
      img: "/18.jpg",
      date: "July 07 2024",
      readTime: "8 Min Read",
      title: "The 7 amazing destinations for adventure seekers"
    },
    {
        img: "/19.jpg",
        date: "July 07 2024",
        readTime: "8 Min Read",
        title: "The 7 amazing destinations for adventure seekers"
      },
    {
      img: "/17.jpg",
      date: "July 09 2024",
      readTime: "9 Min Read",
      title: "10 Reason why you should visit New Jersey"
    },
    // Add more slides if needed
  ];

  return (

    <div className="carousel-container">
      <h1 className='h1-guide'>About Us</h1>
      <h2 className='h2-guide'>News & Articles From Tourm</h2>
      <Slider {...settings}>
        {slidesData.map((slide, index) => (
          <div key={index} className="slide">
            <img src={slide.img} alt={slide.title} className="slide-image" />
            <div className="slide-content">
              <p>{slide.date} | {slide.readTime}</p>
              <h3>{slide.title}</h3>
              <button className="read-more">Read More <span>→</span></button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CarouselSlider;
