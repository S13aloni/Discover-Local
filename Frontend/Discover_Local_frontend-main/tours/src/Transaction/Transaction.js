import React, { useState, useEffect } from 'react'
import { CreditCard, DollarSign, Lock, CheckCircle, XCircle, Loader } from 'lucide-react'
import Cookies from 'js-cookie'
export default function TransactionPage() {
  const [amount, setAmount] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cvv, setCvv] = useState('')
  const [otp, setOtp] = useState('')
  const [errors, setErrors] = useState({})
  const [step, setStep] = useState('initial')
  const [isLoading, setIsLoading] = useState(false)
  const [isFetchingAmount, setIsFetchingAmount] = useState(true)

  useEffect(() => {
    const fetchAmount = async () => {
      try {
        const token = Cookies.get('auth_token')
        const response = await fetch('http://127.0.0.1:8000/api/trasaction/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        })
  
        if (response.ok) {  // Check for a successful response
          const data = await response.json()
          console.log(data)
          setAmount(data.amount)
        } else {
          throw new Error('Failed to fetch amount')  // Handle non-2xx responses
        }
      } catch (error) {
        console.error('Error fetching amount:', error)
        setErrors(prev => ({ ...prev, fetch: 'Failed to fetch initial amount' }))
      } finally {
        setIsFetchingAmount(false)
      }
    }
  
    fetchAmount()
  }, [])

  const validateForm = () => {
    const newErrors = {}
    if (!cardNumber || !/^\d{16}$/.test(cardNumber)) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number'
    }
    if (!cvv || !/^\d{3}$/.test(cvv)) {
      newErrors.cvv = 'Please enter a valid 3-digit CVV'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm() && !isLoading) {
      setIsLoading(true)
      try {
        const response = await fetch('http://127.0.0.1:8000/api/trasaction/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' ,
            'Authorization': `Bearer ${Cookies.get('auth_token')}`,
           },
          body: JSON.stringify({ amount, cardNumber, cvv }),
        })
        if (response.ok) {
          setStep('otp')
        } else {
          throw new Error('Transaction failed')
        }
      } catch (error) {
        console.error('Error during transaction:', error)
        setErrors(prev => ({ ...prev, submit: 'Transaction failed. Please try again.' }))
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    if (!isLoading) {
      setIsLoading(true)
      try {
        const response = await fetch('http://localhost:8000/api/verify-transaction/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 
            'Authorization': `Bearer ${Cookies.get('auth_token')}`,
           },
          body: JSON.stringify({ otp }),
        })
        if (response.ok) {
          setStep('success')
          setTimeout(() => window.location.href = '/', 3000)
        } else {
          setStep('failure')
          setTimeout(() => window.location.href = '/', 3000)
        }
      } catch (error) {
        console.error('Error during OTP verification:', error)
        setErrors(prev => ({ ...prev, otp: 'OTP verification failed. Please try again.' }))
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-900">
          Make a Transaction
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-blue-200">
          {isFetchingAmount ? (
            <div className="flex justify-center items-center h-64">
              <Loader className="h-8 w-8 text-blue-600 animate-spin" />
            </div>
          ) : step === 'initial' ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                  Amount to Pay
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    type="text"
                    name="amount"
                    id="amount"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md bg-gray-50"
                    value={amount}
                    readOnly
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm" id="price-currency">
                      USD
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                  Card Number
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CreditCard className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    type="text"
                    name="cardNumber"
                    id="cardNumber"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                </div>
                {errors.cardNumber && <p className="mt-2 text-sm text-red-600">{errors.cardNumber}</p>}
              </div>

              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                  CVV
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    type="text"
                    name="cvv"
                    id="cvv"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                  />
                </div>
                {errors.cvv && <p className="mt-2 text-sm text-red-600">{errors.cvv}</p>}
              </div>

              {errors.submit && <p className="text-sm text-red-600">{errors.submit}</p>}

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader className="animate-spin h-5 w-5 mr-3" />
                  ) : (
                    'Make Transaction'
                  )}
                </button>
              </div>
            </form>
          ) : step === 'otp' ? (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                  Enter OTP
                </label>
                <input
                  type="text"
                  name="otp"
                  id="otp"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              {errors.otp && <p className="mt-2 text-sm text-red-600">{errors.otp}</p>}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader className="animate-spin h-5 w-5 mr-3" />
                  ) : (
                    'Verify OTP'
                  )}
                </button>
              </div>
            </form>
          ) : step === 'success' ? (
            <div className="text-center">
              <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">Transaction Successful</h3>
              <p className="mt-2 text-sm text-gray-500">Redirecting to home page...</p>
            </div>
          ) : (
            <div className="text-center">
              <XCircle className="mx-auto h-12 w-12 text-red-500" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">Transaction Failed</h3>
              <p className="mt-2 text-sm text-gray-500">Redirecting to home page...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}