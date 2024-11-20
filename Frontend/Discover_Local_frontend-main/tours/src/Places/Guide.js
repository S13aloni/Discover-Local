import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { Star, Calendar, X, MapPin, DollarSign, ChevronRight } from 'lucide-react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Guides() {
  const navigate = useNavigate()
  const [guides, setGuides] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedGuide, setSelectedGuide] = useState(null)
  const [bookingDate, setBookingDate] = useState('')

  useEffect(() => {
    fetchGuides()
  }, [])

  const fetchGuides = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/guides/',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('auth_token')}`,
        },
      })
      if (!response.ok) {
        throw new Error('Failed to fetch guides')
      }
      const data = await response.json()
      setGuides(data)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const handleBookGuide = async (guideId) => {
    if (!bookingDate) {
      toast.error('Please select a date')
      return
    }
    try {
      const response = await fetch('http://localhost:8000/api/book-guide/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('auth_token')}`,
        },
        body: JSON.stringify({ guide_id: guideId, date: bookingDate }),
      })
      if (!response.ok) {
        throw new Error('Booking failed')
      }
      
      setSelectedGuide(null)
      setBookingDate('')
      toast.success('Booking successful!')
      navigate('/cabs/', { replace: true })
    } catch (err) {
      toast.error(`Booking failed: ${err.message}`)
    }
  }

  const handleSkipToNextPage = () => {
    navigate('/cabs/', { replace: true })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-indigo-800">Discover Local Guides</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {guides.map((guide) => (
          <div key={guide.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
            <div className="relative">
              <img
                src={guide.image[0]}
                alt={guide.name}
                className="w-full h-56 object-cover"
              />
              <div className="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 rounded-bl-lg">
                <span className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-400" />
                  {guide.rating.toFixed(1)}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2 text-indigo-700">{guide.name}</h2>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 flex items-center">
                  <DollarSign className="w-4 h-4 mr-1 text-green-500" />
                  ₹{guide.price} per day
                </span>
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {guide.state}
                </span>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold mb-2 flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-indigo-600" />
                  Available Dates:
                </h3>
                <ul className="list-disc list-inside text-gray-600 ml-6">
                  {guide.available_dates.slice(0, 3).map((date, index) => (
                    <li key={index}>{new Date(date).toLocaleDateString()}</li>
                  ))}
                  {guide.available_dates.length > 3 && (
                    <li className="text-indigo-600">+{guide.available_dates.length - 3} more dates</li>
                  )}
                </ul>
              </div>
              <button
                onClick={() => setSelectedGuide(guide)}
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center"
              >
                Book Now
                <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <button
          onClick={handleSkipToNextPage}
          className="bg-gray-500 text-white px-8 py-3 rounded-md hover:bg-gray-600 transition-colors duration-300 flex items-center text-lg font-semibold"
        >
          Skip to Cabs
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>

      {selectedGuide && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-indigo-800">Book {selectedGuide.name}</h2>
            <p className="mb-4 flex items-center text-lg">
              <DollarSign className="w-5 h-5 mr-2 text-green-500" />
              Price: ₹{selectedGuide.price} per day
            </p>
            <div className="mb-6">
              <label htmlFor="bookingDate" className="block text-sm font-medium text-gray-700 mb-2">
                Select Date
              </label>
              <select
                id="bookingDate"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Select a date</option>
                {selectedGuide.available_dates.map((date) => (
                  <option key={date} value={date}>
                    {new Date(date).toLocaleDateString()}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setSelectedGuide(null)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors duration-300 flex items-center"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </button>
              <button
                onClick={() => handleBookGuide(selectedGuide.id)}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors duration-300 flex items-center"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Guides