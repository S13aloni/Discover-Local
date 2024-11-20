import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaMapMarkerAlt, FaCalendarAlt, FaInfoCircle, FaStar, FaUsers, FaClock } from 'react-icons/fa';
import './PackageDetail.css'; // For styling
import Navbar from "../Navbar";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const PackageDetail = () => {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/add_static_package/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const foundPackage = data.find((p) => p.id === id);
        setPkg(foundPackage);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPackageData();
  }, [id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  if (!pkg) {
    return <h2>Package not found</h2>;
  }

  return (
    <>
      <Navbar />
      <div className="package-detail-container">
        <h1 className="package-detail-title">{pkg.name}</h1>
        <div className="package-detail-images">
          {pkg.photos.map((photo, index) => (
            <img key={index} src={photo} alt={pkg.name} className="detail-image" />
          ))}
        </div>
        <div className="package-detail-info">
          <p><FaMapMarkerAlt /> <strong>Location:</strong> {pkg.state}</p>
          <p><FaCalendarAlt /> <strong>Best Time to Visit:</strong> {pkg.best_time}</p>
          <p><FaInfoCircle /> <strong>Additional Info:</strong> {pkg.additional_info}</p>
          <p><FaStar /> <strong>Rating:</strong> {pkg.rating}</p>
          <p><FaUsers /> <strong>Views:</strong> {pkg.number_of_person_views}</p>
        </div>
        <div className="slots-section">
          <h2>Available Dates and Slots</h2>
          <div className="slots-container">
  {Object.entries(pkg.slots).map(([date, slots], index) => (
    <div key={index} className="slot">
      <FaClock className="slot-icon" /> {/* Timer Icon */}
      <strong>{new Date(date).toLocaleDateString()}</strong>: {slots} slots
    </div>
  ))}
</div>

        </div>
        <div className="itinerary-section">
          <h2>Itinerary</h2>
          <div className="itinerary-days">
            {pkg.itinerary.map((item, index) => (
              <div key={index} className="itinerary-day">
                <div className="itinerary-image-container">
                  <img
                    src={item.images[0]}
                    alt={`Day ${item.day}`}
                    className="itinerary-image"
                  />
                  <div className="itinerary-description">
                    <h3>Day {item.day}</h3>
                    <p>{item.description || item.activities}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PackageDetail;
