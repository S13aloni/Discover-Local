import React from 'react';
import { FaGlobe, FaShieldAlt, FaUserTie } from 'react-icons/fa'; // Import icons from react-icons
import './ImageDetailsPage.css';

const ImageDetailsPage = () => {
  return (
    <div className="image-details-container-dest">
      <div className="image-section">
        <img src="1.jpg" alt="Image 1" className="image-dest image-1-dest" />
        <img src="2.jpg" alt="Image 2" className="image-dest image-2-dest" />
        <img src="3.jpg" alt="Image 3" className="image-dest image-3-dest" />
      </div>

      <div className="details-section-dest">
        <h2 className="details-heading-top-dest">Let's Go Together</h2>
        <h2 className="details-heading-dest">Plan Your Trip With Us</h2>
        <p className="details-description-dest">
          There are many variations of passages of available but the majority have suffered alteration in some form, by injected hum randomised words.
        </p>
        <div className='det-desc-dest'>
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
      </div>
    </div>
  );
};

const DetailsItem = ({ title, icon, description }) => {
  return (
    <div className="details-item-dest">
      <div className="icon-container-dest">
        {icon} {/* Use the icon passed as a prop */}
      </div>
      <div className="details-text-dest">
        <h3 className="details-title-dest">{title}</h3>
        <p className="details-paragraph-dest">{description}</p> {/* New paragraph */}
      </div>
    </div>
  );
};

export default ImageDetailsPage;
