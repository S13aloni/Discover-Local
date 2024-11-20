import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Loader2, X, Plus, Minus, Star, MapPin, Calendar, Users, Info } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CATEGORY_CHOICES = [
  'ADVENTURE', 'BEACH', 'MOUNTAIN', 'HISTORICAL', 'URBAN', 'WILDLIFE'
];

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

export default function HiddenGems() {
  const navigate = useNavigate();
  const [gems, setGems] = useState([]);
  const [filteredGems, setFilteredGems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [customPackage, setCustomPackage] = useState([]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showCustomPackageModal, setShowCustomPackageModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({ travel_date: '', number_of_persons: 1 });
  const [customPackageDetails, setCustomPackageDetails] = useState({ name: '', travel_date: '', number_of_persons: 1 });
  const [currentGem, setCurrentGem] = useState(null);
  const [showGemDetails, setShowGemDetails] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    fetchGems();
  }, []);

  useEffect(() => {
    filterGems();
  }, [searchTerm, selectedCategory, selectedState, gems]);

  const fetchGems = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/hidden_gems/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: selectedCategory,
          top_rated: true
        })
      });
      const data = await response.json();
      setGems(data);
      setFilteredGems(data);
    } catch (error) {
      console.error('Error fetching gems:', error);
      showNotification('Failed to fetch hidden gems. Please try again.', 'error');
    }
  };

  const filterGems = () => {
    const filtered = gems.filter(gem =>
      gem.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory.length === 0 || selectedCategory.includes(gem.category)) &&
      (selectedState === '' || gem.state === selectedState)
    );
    setFilteredGems(filtered);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleGemClick = (gem) => {
    setCurrentGem(gem);
    setShowGemDetails(true);
  };

  const handleBookNow = (gem) => {
    setCurrentGem(gem);
    setShowBookingModal(true);
  };

  const handleAddToCustomPackage = (gem) => {
    if (customPackage.length === 0) {
      setCustomPackage([gem]);
      showNotification(`${gem.name} added to your custom package!`, 'success');
    } else if (customPackage[0].state === gem.state) {
      if (!customPackage.some(item => item.id === gem.id)) {
        setCustomPackage(prev => [...prev, gem]);
        showNotification(`${gem.name} added to your custom package!`, 'success');
      } else {
        showNotification('This place is already in your custom package.', 'info');
      }
    } else {
      showNotification('All places in a custom package must be from the same state.', 'error');
    }
  };

  const handleRemoveFromCustomPackage = (gemId) => {
    const removedGem = customPackage.find(item => item.id === gemId);
    setCustomPackage(prev => prev.filter(item => item.id !== gemId));
    showNotification(`${removedGem.name} removed from your custom package.`, 'info');
  };
  
  const handleBookGem = async () => {
    const token = Cookies.get('auth_token');
    
    if (!token) {
      // Show toast notification
      console.log("here");
      
      toast.error('Please login first', {
        position: "top-center",
          autoClose: 3000, // 3 seconds
      });
      
      // Use setTimeout to delay the redirection
      setTimeout(() => {
          window.location.href = '/login'; // Redirect to login page
      }, 3000); // Wait for 3 seconds before redirecting
      
      return; // Exit the function
  }
    try {
      const response = await fetch('http://localhost:8000/api/bookhiddengem/', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('auth_token')}`,
        },
        body: JSON.stringify({
          gem_id: currentGem.id,
          travel_date: bookingDetails.travel_date,
          number_of_persons: bookingDetails.number_of_persons
        })
      });
      if (response.ok) {
        showNotification(`Successfully booked ${currentGem.name}!`, 'success');
        setShowBookingModal(false);
        toast.success('Booked successfully')
        navigate('/guide');
      } else {
        showNotification('Booking failed. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Error booking gem:', error);
      toast.error('error : ' ,error)
      showNotification('An error occurred while booking. Please try again.', 'error');
    }
  };

  const handleBookCustomPackage = async () => {
    const token = Cookies.get('auth_token');
    
    if (!token) {
      // Show toast notification
      console.log("here");
      
      toast.error('Please login first', {
        position: "top-center",
          autoClose: 3000, // 3 seconds
      });
      
      // Use setTimeout to delay the redirection
      setTimeout(() => {
          window.location.href = '/login'; // Redirect to login page
      }, 3000); // Wait for 3 seconds before redirecting
      
      return; // Exit the function
  }
    try {
      const response = await fetch('http://localhost:8000/api/custom-package/', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('auth_token')}`,
        },
        body: JSON.stringify({
          name: customPackageDetails.name,
          places: customPackage.map(gem => gem.id),
          travel_date: customPackageDetails.travel_date,
          number_of_persons: customPackageDetails.number_of_persons
        })
      });
  
      if (response.ok) {
        const packageData = await response.json();
        const packageId = packageData.package_id;
  
        const bookingResponse = await fetch('http://localhost:8000/api/bookcustompackage/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('auth_token')}`,
          },
          body: JSON.stringify({
            package_id: packageId,
            travel_date: customPackageDetails.travel_date
          })
        });
  
        if (bookingResponse.ok) {
          const bookingData = await bookingResponse.json();
          const bookingId = bookingData.booking_id;
          toast.success('Booking successful!')
          setShowCustomPackageModal(false);

          navigate('/guide', { state: { bookingId } });
        } else {
          showNotification('Booking failed. Please try again.', 'error');
        }
      } else {
        showNotification('Custom package booking failed. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Error booking custom package:', error);
      toast.error('Error booking package: ' + error)
      showNotification('An error occurred while booking. Please try again.', 'error');
    }
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  return (
    <div className="min-h-screen bg-blue-50 p-8">
<div className="relative text-center mb-8 rounded-lg overflow-hidden">
  {/* Blurred background */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?cs=srgb&dl=pexels-fabianwiktor-994605.jpg&fm=jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      filter: 'blur(3px)',
    }}
  ></div>

  {/* Text layer */}
  <div className="relative z-10 p-24 lg:p-48">
    <h1 className="text-5xl font-serif text-white">Hidden Gems of India</h1>
  </div>
</div>
      
      {/* Search and Filter Section */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <input
            type="text"
            placeholder="Search hidden gems..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow p-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="flex flex-wrap gap-2">
            {CATEGORY_CHOICES.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedCategory.includes(category)
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="p-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All States</option>
            {INDIAN_STATES.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Hidden Gems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredGems.map(gem => (
          <div key={gem.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
            <img src={gem.photos[0]} alt={gem.name} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2 text-blue-700">{gem.name}</h2>
              <p className="text-gray-600 mb-4">{gem.description.slice(0, 100)}...</p>
              <div className="flex justify-between items-center mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {gem.category}
                </span>
                <span className="text-gray-500 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {gem.state}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleGemClick(gem)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center"
                >
                  <Info className="w-4 h-4 mr-2" />
                  View Details
                </button>
                <button
                  onClick={() => handleAddToCustomPackage(gem)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300 flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add to Package
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Package Section */}
      <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">Your Custom Package</h2>
        {customPackage.length === 0 ? (
          <p className="text-gray-500">Your package is empty. Add some hidden gems!</p>
        ) : (
          <div className="space-y-4">
            {customPackage.map(item => (
              <div key={item.id} className="flex items-center justify-between bg-blue-50 p-4 rounded-md">
                <div>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.state}</p>
                </div>
                <button
                  onClick={() => handleRemoveFromCustomPackage(item.id)}
                  className="text-red-500 hover:text-red-700 flex items-center"
                >
                  <Minus className="w-4 h-4 mr-1" />
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={() => setShowCustomPackageModal(true)}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 mt-4 flex items-center justify-center"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book/Create My Custom Package
            </button>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Book {currentGem.name}</h2>
            <input
              type="date"
              value={bookingDetails.travel_date}
              min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
              onChange={(e) => {
                setBookingDetails({...bookingDetails, travel_date: e.target.value});
              }}
              className="w-full p-2 mb-4 border rounded"
            />
            <div className="flex items-center mb-4">
              <Users className="w-5 h-5 mr-2 text-gray-500" />
              <input
                type="number"
                value={bookingDetails.number_of_persons}
                onChange={(e) => setBookingDetails({...bookingDetails, number_of_persons: e.target.value})}
                min="1"
                className="w-full p-2 border rounded"
                placeholder="Number of persons"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowBookingModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleBookGem}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300"
              >
                Book
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Package Modal */}
      {showCustomPackageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Book Custom Package</h2>
            <input
              type="text"
              value={customPackageDetails.name}
              onChange={(e) => setCustomPackageDetails({...customPackageDetails, name: e.target.value})}
              className="w-full p-2 mb-4 border rounded"
              placeholder="Package Name"
            />
            <input
              type="date"
              value={customPackageDetails.travel_date}
              min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
              onChange={(e) => setCustomPackageDetails({...customPackageDetails, travel_date: e.target.value})}
              className="w-full p-2 mb-4 border rounded"
            />
            <div className="flex items-center mb-4">
              <Users className="w-5 h-5 mr-2 text-gray-500" />
              <input
                type="number"
                value={customPackageDetails.number_of_persons}
                onChange={(e) => setCustomPackageDetails({...customPackageDetails, number_of_persons: e.target.value})}
                min="1"
                className="w-full p-2 border rounded"
                placeholder="Number of persons"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowCustomPackageModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleBookCustomPackage}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300"
              >
                Book Custom Package
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Gem Details Modal */}
      {showGemDetails && currentGem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto z-50">
          <div className="bg-white p-8 rounded-lg max-w-4xl w-full m-4 relative">
            <button
              onClick={() => setShowGemDetails(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-3xl font-bold mb-4 text-blue-800">{currentGem.name}</h2>
            <div className="mb-6 flex gap-4 overflow-x-auto">
              {currentGem.photos.map((photo, index) => (
                <img key={index} src={photo} alt={`${currentGem.name} - ${index + 1}`} className="w-64 h-48 object-cover rounded-lg" />
              ))}
            </div>
            <p className="text-gray-700 mb-4">{currentGem.description}</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-lg">State</h3>
                  <p>{currentGem.state}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Info className="w-5 h-5 mr-2 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-lg">Category</h3>
                  <p>{currentGem.category}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Star className="w-5 h-5 mr-2 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-lg">Rating</h3>
                  <p>{currentGem.rating} / 5</p>
                </div>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-lg">Views</h3>
                  <p>{currentGem.number_of_person_views}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-5 h-5 mr-2 text-blue-600 flex items-center justify-center">₹</div>
                <div>
                  <h3 className="font-semibold text-lg">Price</h3>
                  <p>₹{currentGem.price}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-lg">Best Time to Visit</h3>
                  <p>{currentGem.best_time}</p>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold text-lg">Additional Information</h3>
              <p>{currentGem.additional_info}</p>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowGemDetails(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors duration-300"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowGemDetails(false);
                  handleBookNow(currentGem);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300"
              >
                Book Now
              </button>
            </div>  
          </div>
        </div>
      )}

      {/* Notification */}
      {notification.show && (
        <div className={`fixed bottom-4 right-4 p-4 rounded-md shadow-md ${
          notification.type === 'success' ? 'bg-green-500' :
          notification.type === 'error' ? 'bg-red-500' :
          'bg-blue-500'
        } text-white`}>
          {notification.message}
        </div>
      )}
    </div>
  );
}