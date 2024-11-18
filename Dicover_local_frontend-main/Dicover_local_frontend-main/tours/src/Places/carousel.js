// CarouselComponent.jsx
import React from 'react';
import Slider from 'react-slick';
import './carousel.css';  // Custom styles for the carousel

const CarouselComponent = () => {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,  // Number of images to show at once
      slidesToScroll: 1,
      autoplay: true,   // Enable automatic sliding
      autoplaySpeed: 3000, // Speed of automatic sliding in ms
      centerMode: true,  // Center mode to focus on the center slide
      centerPadding: '0',
      focusOnSelect: true,  // Allow click to focus on the slide
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
  
  const images = [
    {
      src: "https://media.istockphoto.com/id/620963670/photo/taj-mahal-agra-india.jpg?s=612x612&w=0&k=20&c=Lzvl0XOqHEekNqnHw6mbkbZfyEhCW-EspMt5khNPCWs=", // Replace with your image URLs
      title: "Thailand",
      listings: 22
    },
    {
      src: "https://images.pexels.com/photos/2815093/pexels-photo-2815093.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Maldives",
      listings: 18
    },
    {
      src: "https://img.freepik.com/premium-photo/mountain-range-with-cloudy-sky-background_849761-471.jpg",
      title: "Bali",
      listings: 25
    },
    {
        src: "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D",
        title: "Goa",
        listings: 25
      },
      {
        src: "https://images.pexels.com/photos/17574949/pexels-photo-17574949/free-photo-of-view-of-a-snowy-valley-and-rocky-mountains.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        title: "Goa",
        listings: 25
      },
  ];

  return (
    <div className="carousel-container">
     <h2 className="top-destinations-title">Top Destinations</h2>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div className="carousel-slide" key={index}>
            <img src={image.src} alt={image.title} className="carousel-image" />
            <div className="carousel-info">
              <h3>{image.title}</h3>
              <p>{image.listings} Listings</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};


export default CarouselComponent;
