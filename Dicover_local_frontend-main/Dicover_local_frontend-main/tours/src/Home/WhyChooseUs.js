import React from 'react';
import { FaGlobe, FaShieldAlt, FaUserTie, FaThumbsUp } from 'react-icons/fa'; // Import icons
import './WhyChooseUs.css';

const WhyChooseUs=()=>{
    return(
        <div>
            <section className="why-choose-us-section">
        <h2 className='h2-guide'>Why Choose Us?</h2>
        <div className="choose-us-cards">
          <DetailsItem
            title="Exclusive Trips"
            icon={<FaGlobe />}
            description="We offer exclusive trips that fit all your adventure needs."
          />
          <DetailsItem
            title="Safety First"
            icon={<FaShieldAlt />}
            description="Your safety is our top priority in all our adventures."
          />
          <DetailsItem
            title="Expert Guides"
            icon={<FaUserTie />}
            description="Our guides are knowledgeable and professional."
          />
          <DetailsItem
            title="Happy Customers"
            icon={<FaThumbsUp />}
            description="Join the countless travelers who trust us for memorable experiences."
          />
        </div>
      </section>
        </div>
    )
}
const DetailsItem = ({ title, icon, description }) => {
    return (
      <div className="details-item">
        <div className="icon-container">{icon}</div>
        <div className="details-text">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    );
  };
export default WhyChooseUs;