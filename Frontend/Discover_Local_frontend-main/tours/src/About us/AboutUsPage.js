import React from 'react';
// import './App.css';
import Navbar from '../Navbar';  // Import the Navbar component
import MeetOurGuide from './MeetOurGuide';
import ImageDetailAboutUs from './ImageDetailAboutUs';
import WhyChooseUs from '../Home/WhyChooseUs';
import ClientResponse from './ClientResponse';

function AboutUsPage() {
  return (
    <div>
      <Navbar />  {/* Include the Navbar component here */}
      <ImageDetailAboutUs/>
      <MeetOurGuide/>
      <WhyChooseUs/>
      <ClientResponse/>
    </div>
  );
}

export default AboutUsPage;
