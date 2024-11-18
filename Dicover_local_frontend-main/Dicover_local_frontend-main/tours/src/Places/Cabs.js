import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { Car, Users, Calendar, DollarSign, X, CheckCircle, XCircle, ChevronRight } from 'lucide-react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Cabs() {
  const navigate = useNavigate()
  const [cabs, setCabs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCab, setSelectedCab] = useState(null)
  const [bookingDetails, setBookingDetails] = useState({ date: '', duration: 1 })
  const [searchTerm, setSearchTerm] = useState('')
  const [filterSeats, setFilterSeats] = useState('')

  const seatOptions = ['4', '6', '9', '12', '18', '25']

  useEffect(() => {
    fetchCabs()
  }, [])

  const fetchCabs = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/cabs/',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('auth_token')}`,
        },
      }

      )
      if (!response.ok) {
        throw new Error('Failed to fetch cabs')
      }
      const data = await response.json()
      setCabs(data)
      
      setLoading(false)
    } catch (err) {
      setError('Failed to fetch cabs. Please try again later.')
      setLoading(false)
    }
  }

  const handleBookCab = async () => {
    if (!bookingDetails.date) {
      toast.error('Please select a date')
      return
    }
    try {
      const response = await fetch('http://localhost:8000/api/cab_book/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('auth_token')}`,
        },
        body: JSON.stringify({
          cab_id: selectedCab.id,
          date: bookingDetails.date,
          duration: bookingDetails.duration,
        }),
      })
      if (!response.ok) {
        throw new Error('Booking failed')
      }
      setSelectedCab(null)
      setBookingDetails({ date: '', duration: 1 })
      toast.success('Booking successful!')
      navigate('/transaction')
    } catch (err) {
      toast.error('Booking failed. Please try again.')
    }
  }

  const filteredCabs = cabs.filter(cab => 
    cab.car_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterSeats === '' || cab.number_of_persons.toString() === filterSeats)
  )

  const handleSkipToTransaction = () => {
    navigate('/transaction')
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
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700">{error}</p>
          <button 
            onClick={fetchCabs}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-indigo-800">Discover Local Cabs</h1>
      
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search cabs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <select
            value={filterSeats}
            onChange={(e) => setFilterSeats(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">All Seats</option>
            {seatOptions.map(seats => (
              <option key={seats} value={seats}>{seats} Seater</option>
            ))}
          </select>
        </div>
      </div>

      {filteredCabs.length === 0 ? (
        <div className="text-center text-gray-600 mt-8">No cabs found matching your criteria.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCabs.map((cab) => (
            <div key={cab.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2 text-indigo-700">{cab.car_name}</h2>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-indigo-600">₹{cab.price}</span>
                  <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                    {cab.number_of_persons} Seater
                  </span>
                </div>
                <div className="mb-4 space-y-2">
                  <p className="text-gray-600 flex items-center">
                    <Car className="h-5 w-5 mr-2 text-indigo-500" />
                    {cab.number_plate}
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <Users className="h-5 w-5 mr-2 text-indigo-500" />
                    {cab.number_of_persons} persons
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCab(cab)}
                  className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center"
                  disabled={!cab.available}
                >
                  {cab.available ? (
                    <>
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Book Now
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5 mr-2" />
                      Not Available
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-12 flex justify-center">
        <button
          onClick={handleSkipToTransaction}
          className="bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600 transition-colors duration-300 flex items-center"
        >
          Skip to Transaction
          <ChevronRight className="ml-2 h-5 w-5" />
        </button>
      </div>

      {selectedCab && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-indigo-800">Book {selectedCab.car_name}</h2>
            <p className="mb-4 text-lg flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-indigo-600" />
              Price: <span className="font-bold text-indigo-600 ml-1">₹{selectedCab.price}</span> per day
            </p>
            <div className="mb-4">
              <label htmlFor="bookingDate" className="block text-sm font-medium text-gray-700 mb-1">
                Select Date
              </label>
              <div className="relative">
                <Calendar className="h-5 w-5 absolute top-3 left-3 text-gray-400" />
                <input
                  type="date"
                  id="bookingDate"
                  value={bookingDetails.date}
                  onChange={(e) => setBookingDetails({ ...bookingDetails, date: e.target.value })}
                  className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
                />
              </div>
            </div>
            <div className="mb-6">
              <p className="text-lg font-semibold flex items-center">
                Total Price: 
                <span className="text-indigo-600 ml-2 flex items-center">
                  <DollarSign className="h-5 w-5 mr-1" />
                  ₹{selectedCab.price * bookingDetails.duration}
                </span>
              </p>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setSelectedCab(null)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors duration-300 flex items-center"
              >
                <X className="h-5 w-5 mr-2" />
                Cancel
              </button>
              <button
                onClick={handleBookCab}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300 flex items-center"
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cabs