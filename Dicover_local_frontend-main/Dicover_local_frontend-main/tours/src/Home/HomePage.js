import React from 'react';
// import './App.css';
import Navbar from '../Navbar';  // Import the Navbar component
import ImageSlider from './ImageSlider';
import DestinationBlock from './DestinationBlock';
import PopularDestinations from './PopularDestination';
import TourCategories from './TourCategories';
import ImageDetailsPage from './ImageDetailsPage';
import ExperienceCounters from './ExperienceCounters';
import Gallery from './Gallery';
import TourGuideSwiper from './Tourguide';
import Footer from './footer'
import TestimonialSlider from './testimonial';
// import MeetOurGuide from './MeetOurGuide';
import WhyChooseUs from './WhyChooseUs';
import CarouselSlider from './carousel';
function HomePage() {
  const cards = [
    { title: 'Beautiful Landscape', image: '1.jpg' },
    { title: 'City Lights', image: '2.jpg' },
    { title: 'Mountain Peaks', image: '3.jpg' },
    { title: 'Ocean Waves', image: '4.jpg' },
];
  return (
    <div>
      <Navbar/>  {/* Include the Navbar component here */}
      <ImageSlider/>
      {/* <DestinationBlock/> */}
      <PopularDestinations/>
      <TourCategories/>
      <ImageDetailsPage/>
      <ExperienceCounters/>
      <Gallery/>
      <TourGuideSwiper/>
      <TestimonialSlider/>
      <CarouselSlider/>
      <WhyChooseUs/>
      <Footer/>
    </div>
  );
}

export default HomePage;
