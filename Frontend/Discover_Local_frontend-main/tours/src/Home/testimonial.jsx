import React from 'react';
import Slider from "react-slick";
import './testimonial.css'; // Custom CSS for styling
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
const testimonials = [
  {
    name: 'Maria Doe',
    role: 'Traveller',
    image: '/p3.jpeg', // Replace with correct paths
    rating: 5,
    review: 'A sophisticated rainwater harvesting system collects and filters rainwater for irrigation and non-potable uses, reducing reliance on municipal water sources. Greywater systems.',
  },
  {
    name: 'Angelina Rose',
    role: 'Traveller',
    image: '/p2.jpeg',
    rating: 5,
    review: 'Throughout the interior, eco-friendly materials like reclaimed wood, bamboo flooring, and recycled glass countertops create a luxurious yet sustainable ambiance.',
  },
  {
    name: 'John Doe',
    role: 'Traveller',
    image: '/p1.jpeg',
    rating: 5,
    review: 'A home that perfectly marries sustainability with luxury. From the moment I stepped inside, I knew it was where I wanted to be.',
  }
];

const TestimonialSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div className="testimonial-slider-container">
      <h1 className="h1-guide">Testimonial</h1>
      <h2 className="h2-guide">What Client Say About Us</h2>
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div className="testimonial-card" key={index}>
            <div className="testimonial-content">
              <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
              <div className="testimonial-text">
                <h4 className="testimonial-name">{testimonial.name}</h4>
                <p className="testimonial-role">{testimonial.role}</p>
                <div className="testimonial-rating">
                  {Array(testimonial.rating).fill().map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <p className="testimonial-review">{testimonial.review}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TestimonialSlider;
