import React from 'react';
import { FaGlobe, FaShieldAlt, FaUserTie } from 'react-icons/fa'; // Import icons from react-icons
import './ImageDetailAboutUs.css';

const ImageDetailAboutUs = () => {
  return (
    <div className="image-details-container-about">
      <div className="image-section-about">
        <img src="https://static.vecteezy.com/system/resources/previews/026/718/414/non_2x/group-of-happy-friends-explore-nature-outdoors-tourism-travel-backpack-camping-hiking-journey-travel-trek-concept-with-blurred-background-generative-ai-illustration-free-photo.jpg" alt="Image 1" className="image image-1" />
        <img src="https://www.tourradar.com/days-to-come/wp-content/uploads/2019/04/QuotesOG.jpg" alt="Image 2" className="image image-2" />
        <img src="https://media.cnn.com/api/v1/images/stellar/prod/230725152449-01-group-friend-vacation-tips-top.jpg?c=16x9" alt="Image 3" className="image image-3" />
      </div>

      <div className="details-section-about">
        <h2 className="details-heading-top-about">Welcome To Discover Local</h2>
        <h2 className="details-heading-about">We are world reputeted travel agency</h2>
        <p className="details-description-about">
        There are many variations of passages of available but the majority have suffered alteration in some form, by injected hum randomised words.
        Leiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.
        </p>
        <div className='det-desc-about'>
        <DetailsItem 
          title="Exclusive Trip" 
          icon={<FaGlobe />} 
          description="There are many variations of passages of available but the majority." 
        />
        <DetailsItem 
          title="Safety First Always" 
          icon={<FaShieldAlt />} 
          description="There are many variations of passages of available but the majority." 
        />
        <DetailsItem 
          title="Professional Guide" 
          icon={<FaUserTie />} 
          description="There are many variations of passages of available but the majority." 
        />
        </div>
        <button className="contact-us-button-about">Contact With Us</button>
      </div>
    </div>
  );
};

const DetailsItem = ({ title, icon, description }) => {
  return (
    <div className="details-item-about">
      <div className="icon-container-about">
        {icon} {/* Use the icon passed as a prop */}
      </div>
      <div className="details-text-about">
        <h3 className="details-title-about">{title}</h3>
        <p className="details-paragraph-about">{description}</p> {/* New paragraph */}
      </div>
    </div>
  );
};

export default ImageDetailAboutUs;
