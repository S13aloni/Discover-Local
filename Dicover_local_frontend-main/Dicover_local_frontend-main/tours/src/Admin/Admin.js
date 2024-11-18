import React, { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp, Edit, Trash, Search, User, Plus, X } from 'lucide-react'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const API_BASE_URL = 'http://127.0.0.1:8000/api'

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
  'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
]

const fetchPackages = async () => {
    try {
      const username = Cookies.get('username');
      
      // Check if the user is not admin
      if (username !== 'admin') {
        toast.error('Please login first', {
          position: "top-center",
          autoClose: 3000,
        })
        window.location.href = '/';   
        return;                       
      }
  
      const response = await fetch(`${API_BASE_URL}/add_static_package/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
  
      if (!response.ok) throw new Error('Failed to fetch packages');
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching packages:', error);
      return [];
    }
  };

const fetchHiddenGems = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/hidden_gems/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
    if (!response.ok) throw new Error('Failed to fetch hidden gems')
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching hidden gems:', error)
    return []
  }
}

const addPackage = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/add_static_package/`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data)
    })
    if (!response.ok) throw new Error('Failed to add package')
    const newData = await response.json()
    return newData
  } catch (error) {
    console.error('Error adding package:', error)
    throw error
  }
}

const addHiddenGem = async (data) => {
  try {
    console.log(data);
    
    const response = await fetch(`${API_BASE_URL}/hidden_gems/`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data)
    })
    if (!response.ok) throw new Error('Failed to add hidden gem')
    const newData = await response.json()
    return newData
  } catch (error) {
    console.error('Error adding hidden gem:', error)
    throw error
  }
}

const updatePackage = async (id, data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/static_package/${id}/`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data)
    })
    if (!response.ok) throw new Error('Failed to update package')
    const updatedData = await response.json()
    return updatedData
  } catch (error) {
    console.error('Error updating package:', error)
    throw error
  }
}

const updateHiddenGem = async (id, data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/hidden_gems/${id}/`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data)
    })
    if (!response.ok) throw new Error('Failed to update hidden gem')
    const updatedData = await response.json()
    return updatedData
  } catch (error) {
    console.error('Error updating hidden gem:', error)
    throw error
  }
}

const deletePackage = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/static_package/${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
    if (!response.ok) throw new Error('Failed to delete package')
    return id
  } catch (error) {
    console.error('Error deleting package:', error)
    throw error
  }
}

const deleteHiddenGem = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/hidden_gems/${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
    if (!response.ok) throw new Error('Failed to delete hidden gem')
    return id
  } catch (error) {
    console.error('Error deleting hidden gem:', error)
    throw error
  }
}

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('packages')
  const [packages, setPackages] = useState([])
  const [hiddenGems, setHiddenGems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const [packagesData, hiddenGemsData] = await Promise.all([fetchPackages(), fetchHiddenGems()])
      setPackages(packagesData)
      setHiddenGems(hiddenGemsData)
    } catch (error) {
      setError('Failed to fetch data. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAdd = async (data) => {
    setError(null)
    try {
      if (activeTab === 'packages') {
        const newPackage = await addPackage(data)
        setPackages([...packages, newPackage])
      } else {
        const newGem = await addHiddenGem(data)
        setHiddenGems([...hiddenGems, newGem])
      }
      setIsAdding(false)
    } catch (error) {
      setError(`Failed to add ${activeTab === 'packages' ? 'package' : 'hidden gem'}. Please try again.`)
    }
  }

  const handleUpdate = async (id, data) => {
    setError(null)
    try {
      if (activeTab === 'packages') {
        const updatedPackage = await updatePackage(id, data)
        setPackages(packages.map(pkg => pkg.id === id ? updatedPackage : pkg))
      } else {
        const updatedGem = await updateHiddenGem(id, data)
        setHiddenGems(hiddenGems.map(gem => gem.id === id ? updatedGem : gem))
      }
      setEditingItem(null)
    } catch (error) {
      setError(`Failed to update ${activeTab === 'packages' ? 'package' : 'hidden gem'}. Please try again.`)
    }
  }

  const handleDelete = async (id) => {
    setError(null)
    try {
      if (activeTab === 'packages') {
        await deletePackage(id)
        setPackages(packages.filter(pkg => pkg.id !== id))
      } else {
        await deleteHiddenGem(id)
        setHiddenGems(hiddenGems.filter(gem => gem.id !== id))
      }
    } catch (error) {
      setError(`Failed to delete ${activeTab === 'packages' ? 'package' : 'hidden gem'}. Please try again.`)
    }
  }

  const filteredItems = activeTab === 'packages'
    ? packages.filter(pkg =>
      pkg.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : hiddenGems.filter(gem =>
      gem.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gem.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    function handleLogout() {
        fetch('http://localhost:8000/api/logout/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('auth_token')}`,
            // Add any necessary authorization headers, e.g., 
            // 'Authorization': `Token ${yourToken}`
          },
        })
        .then((response) => {
          if (response.ok) {
            Cookies.remove('auth_token');
            Cookies.remove('username');
            // Handle successful logout (e.g., redirect to login page)
            window.location.href = '/login'; // redirect to login page or homepage
          } else {
            // Handle logout failure
            console.error('Logout failed');
          }
        })
        .catch((error) => {
          console.error('Error during logout:', error);
        });
      }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      <nav style={{ backgroundColor: 'white', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>Discover Local Admin</h1>
        {/* <div style={{ display: 'flex', alignItems: 'center' }}>
          <User style={{ color: '#4b5563', marginRight: '0.5rem' }} />
          <span style={{ color: '#1f2937' }}>Admin</span>
        </div> */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
      <User style={{ color: '#4b5563', marginRight: '0.5rem' }} />
      <span style={{ color: '#1f2937', marginRight: '1rem' }}>Admin</span>
      <button
        onClick={handleLogout}
        style={{
          color: 'black',
          border: 'none',
          borderRadius: '5px',
          padding: '0.5rem 1rem',
          cursor: 'pointer',
        }}
      >
        Logout
      </button>
    </div>
      </nav>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem' }}>
        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                backgroundColor: activeTab === 'packages' ? 'black' : 'white',
                color: activeTab === 'packages' ? 'white' : 'black',
                border: activeTab === 'packages' ? 'none' : '1px solid #d1d5db',
                cursor: 'pointer'
              }}
              onClick={() => setActiveTab('packages')}
            >
              Packages
            </button>
            <button
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                backgroundColor: activeTab === 'hiddenGems' ? 'black' : 'white',
                color: activeTab === 'hiddenGems' ? 'white' : 'black',
                border: activeTab === 'hiddenGems' ? 'none' : '1px solid #d1d5db',
                cursor: 'pointer'
              }}
              onClick={() => setActiveTab('hiddenGems')}
            >
              Hidden Gems
            </button>
          </div>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                paddingLeft: '2.5rem',
                paddingRight: '1rem',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
                borderWidth: '1px',
                borderColor: '#d1d5db',
                borderRadius: '0.375rem',
                outline: 'none',
                width: '250px'
              }}
            />
            <Search style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} size={20} />
          </div>
        </div>
        {error && (
          <div style={{ backgroundColor: '#fee2e2', border: '1px solid #f87171', color: '#b91c1c', padding: '1rem', borderRadius: '0.375rem', marginBottom: '1rem' }} role="alert">
            <span>{error}</span>
          </div>
        )}
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '2.5rem' }}>
            <div style={{ display: 'inline-block', animation: 'spin 1s linear infinite', borderTop: '2px solid #1f2937', borderRight: '2px solid transparent', borderBottom: '2px solid #1f2937', borderLeft: '2px solid transparent', borderRadius: '50%', width: '2rem', height: '2rem' }}></div>
            <p style={{ marginTop: '0.5rem', color: '#4b5563' }}>Loading...</p>
          </div>
        ) : (
          <>
            <button
              style={{
                marginBottom: '1.5rem',
                backgroundColor: 'black',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                display: 'flex',
                alignItems: 'center',
                transition: 'background-color 0.3s',
                cursor: 'pointer'
              }}
              onClick={() => setIsAdding(true)}
            >
              <Plus style={{ marginRight: '0.5rem' }} size={20} />
              Add {activeTab === 'packages' ? 'Package' : 'Hidden Gem'}
            </button>
            {isAdding && (
              <AddEditForm
                onSubmit={handleAdd}
                onCancel={() => setIsAdding(false)}
                type={activeTab === 'packages' ? 'package' : 'hiddenGem'}
              />
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {filteredItems.map(item => (
                <Item
                  key={item.id}
                  item={item}
                  onEdit={() => setEditingItem(item)}
                  onDelete={() => handleDelete(item.id)}
                  isEditing={editingItem && editingItem.id === item.id}
                  onUpdate={handleUpdate}
                  onCancelEdit={() => setEditingItem(null)}
                  type={activeTab === 'packages' ? 'package' : 'hiddenGem'}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function Item({ item, onEdit, onDelete, isEditing, onUpdate, onCancelEdit, type }) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (isEditing) {
    return <AddEditForm initialData={item} onSubmit={(data) => onUpdate(item.id, data)} onCancel={onCancelEdit} type={type} />
  }

  return (
    <div style={{ backgroundColor: 'white', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', borderRadius: '0.5rem', overflow: 'hidden' }}>
      <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937' }}>{item.name}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button style={{ color: '#4b5563', cursor: 'pointer' }} onClick={onEdit}>
            <Edit size={20} />
          </button>
          <button style={{ color: '#4b5563', cursor: 'pointer' }} onClick={() => onDelete(item.id)}>
            <Trash size={20} />
          </button>
          <button style={{ color: '#4b5563', cursor: 'pointer' }} onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>
      {isExpanded && (
        <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <p><strong>Description:</strong> {item.description}</p>
          <p><strong>State:</strong> {item.state}</p>
          <p><strong>Price:</strong> ${item.price}</p>
          <p><strong>Rating:</strong> {item.rating}</p>
          <p><strong>Views:</strong> {item.number_of_person_views}</p>
          <p><strong>Best Time:</strong> {item.best_time}</p>
          <p><strong>Category:</strong> {item.category}</p>
          {type === 'package' && <p><strong>Type:</strong> {item.type}</p>}
          <p><strong>Additional Info:</strong> {item.additional_info}</p>
          <div>
            <strong>Photos:</strong>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
              {item.photos.map((photo, index) => (
                <img key={index} src={photo} alt={`Item photo ${index + 1}`} style={{ width: '6rem', height: '6rem', objectFit: 'cover', borderRadius: '0.375rem' }} />
              ))}
            </div>
          </div>
          {type === 'package' && (
            <>
              <div>
                <strong>Available Dates and Slots:</strong>
                <ul style={{ listStyleType: 'disc', listStylePosition: 'inside', marginTop: '0.5rem' }}>
                  {item.available_dates.map(date => (
                    <li key={date}>
                      {new Date(date).toLocaleDateString()}: {item.slots[date]} slots
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <strong>Itinerary:</strong>
                <ul style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {item.itinerary.map(day => (
                    <li key={day.day} style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem' }}>
                      <strong style={{ fontSize: '1.125rem' }}>Day {day.day}:</strong>
                      <p style={{ marginTop: '0.25rem' }}>{day.description}</p>
                      <p style={{ marginTop: '0.25rem' }}><strong>Activities:</strong> {day.activities}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                        {day.images.map((image, index) => (
                          <img key={index} src={image} alt={`Day ${day.day} photo ${index + 1}`} style={{ width: '6rem', height: '6rem', objectFit: 'cover', borderRadius: '0.375rem' }} />
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

function AddEditForm({ initialData, onSubmit, onCancel, type }) {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    description: '',
    state: '',
    photos: [],
    rating: 0,
    number_of_person_views: 0,
    price: 0,
    best_time: '',
    additional_info: '',
    category: '',
    type: type === 'package' ? 'ECONOMY' : undefined,
    available_dates: [],
    slots: {},
    itinerary: []
  })

  const [photoInput, setPhotoInput] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handlePhotoInputChange = (e) => {
    setPhotoInput(e.target.value)
  }

  const handleAddPhotoUrl = () => {
    if (photoInput) {
      setFormData({
        ...formData,
        photos: [...formData.photos, photoInput]
      })
      setPhotoInput('')
    }
  }

  const handleRemovePhoto = (index) => {
    const newPhotos = formData.photos.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      photos: newPhotos
    })
  }

  const handleDateChange = (e) => {
    const { name, value } = e.target
    const [year, month, day] = value.split('-')
    const date1 = new Date(year, month - 1, day).toISOString()
    const date = date1.substring(0, 10);
    console.log(date)
    setFormData({
      ...formData,
      available_dates: [...formData.available_dates, date],
      slots: { ...formData.slots, [date]: 0 }
    })
  }

  const handleSlotChange = (date, value) => {
    setFormData({
      ...formData,
      slots: { ...formData.slots, [date]: parseInt(value) }
    })
  }

  const handleItineraryChange = (index, field, value) => {
    const newItinerary = [...formData.itinerary]
    newItinerary[index] = { ...newItinerary[index], [field]: value }
    setFormData({ ...formData, itinerary: newItinerary })
  }

  const handleItineraryImageChange = (dayIndex, imageUrl) => {
    const newItinerary = [...formData.itinerary]
    newItinerary[dayIndex] = { 
      ...newItinerary[dayIndex], 
      images: [...(newItinerary[dayIndex].images || []), imageUrl] 
    }
    setFormData({ ...formData, itinerary: newItinerary })
  }

  const addItineraryDay = () => {
    setFormData({
      ...formData,
      itinerary: [...formData.itinerary, { day: formData.itinerary.length + 1, description: '', activities: '', images: [] }]
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', borderRadius: '0.5rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>{initialData ? 'Edit' : 'Add'} {type === 'package' ? 'Package' : 'Hidden Gem'}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
        <div>
          <label htmlFor="name" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', outline: 'none' }}
            required
          />
        </div>
        <div>
          <label htmlFor="state" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>State</label>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', outline: 'none' }}
            required
          >
            <option value="">Select a state</option>
            {INDIAN_STATES.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <label htmlFor="description" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', outline: 'none' }}
          required
        />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginTop: '1rem' }}>
        <div>
          <label htmlFor="price" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', outline: 'none' }}
            required
          />
        </div>
        <div>
          <label htmlFor="category" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', outline: 'none' }}
            required
          >
            <option value="" disabled>Select Category</option>
            <option value="ADVENTURE">Adventure</option>
            <option value="BEACH">Beach</option>
            <option value="MOUNTAIN">Mountain</option>
            <option value="HISTORICAL">Historical</option>
            <option value="URBAN">Urban</option>
            <option value="WILDLIFE">Wildlife</option>
          </select>
        </div>
        <div>
          <label htmlFor="rating" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Rating</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', outline: 'none' }}
            min={0}
            max={5}
            step={0.1}
            required
          />
        </div>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <label htmlFor="best_time" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Best Time to Visit</label>
        <input
          type="text"
          id="best_time"
          name="best_time"
          value={formData.best_time}
          onChange={handleChange}
          style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', outline: 'none' }}
          required
        />
      </div>
      <div style={{ marginTop: '1rem' }}>
        <label htmlFor="additional_info" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Additional Information</label>
        <textarea
          id="additional_info"
          name="additional_info"
          value={formData.additional_info}
          onChange={handleChange}
          rows={3}
          style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', outline: 'none' }}
        />
      </div>
      {type === 'package' && (
        <div style={{ marginTop: '1rem' }}>
          <label htmlFor="type" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', outline: 'none' }}
            required
          >
            <option value="LUXURY">Luxury</option>
            <option value="DELUXE">Deluxe</option>
            <option value="ECONOMY">Economy</option>
          </select>
        </div>
      )}
      <div style={{ marginTop: '1rem' }}>
        <label htmlFor="photos" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
          Photos
        </label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <input
            type="text"
            value={photoInput}
            onChange={handlePhotoInputChange}
            placeholder="Enter image URL"
            style={{ flexGrow: 1, padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', outline: 'none' }}
          />
          <button
            type="button"
            onClick={handleAddPhotoUrl}
            style={{ backgroundColor: 'black', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.375rem', cursor: 'pointer' }}
          >
            Add URL
          </button>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
          {formData.photos.map((photo, index) => (
            <div key={index} style={{ position: 'relative' }}>
              <img src={photo} alt={`Preview ${index + 1}`} style={{ width: '6rem', height: '6rem', objectFit: 'cover', borderRadius: '0.375rem' }} />
              <button
                type="button"
                onClick={() => handleRemovePhoto(index)}
                style={{ position: 'absolute', top: 0, right: 0, backgroundColor: '#ef4444', color: 'white', borderRadius: '9999px', padding: '0.25rem', fontSize: '0.75rem' }}
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>
      {type === 'package' && (
        <>
          <div style={{ marginTop: '1rem' }}>
            <label htmlFor="available_dates" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Available Dates</label>
            <input
              type="date"
              id="available_dates"
              name="available_dates"
              onChange={handleDateChange}
              style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', outline: 'none' }}
            />
            <ul style={{ marginTop: '0.5rem' }}>
              {formData.available_dates.map((date) => (
                <li key={date} style={{ marginBottom: '0.5rem' }}>
                  {new Date(date).toLocaleDateString()}: 
                  <input
                    type="number"
                    value={formData.slots[date]}
                    onChange={(e) => handleSlotChange(date, e.target.value)}
                    style={{ marginLeft: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem', padding: '0.25rem', width: '5rem' }}
                  /> slots
                </li>
              ))}
            </ul>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>Itinerary</h3>
            {formData.itinerary.map((day, index) => (
              <div key={index} style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem', marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Day {day.day}</label>
                <input
                  type="text"
                  value={day.description}
                  onChange={(e) => handleItineraryChange(index, 'description', e.target.value)}
                  style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', outline: 'none', marginBottom: '0.5rem' }}
                  placeholder="Description"
                />
                <input
                  type="text"
                  value={day.activities}
                  onChange={(e) => handleItineraryChange(index, 'activities', e.target.value)}
                  style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', outline: 'none' }}
                  placeholder="Activities"
                />
                <div style={{ marginTop: '0.5rem' }}>
                  <input
                    type="text"
                    placeholder="Enter image URL"
                    style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', outline: 'none' }}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleItineraryImageChange(index, e.target.value)
                        e.target.value = ''
                      }
                    }}
                  />
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                  {day.images && day.images.map((image, idx) => (
                    <img key={idx} src={image} alt={`Itinerary Day ${day.day} Image ${idx + 1}`} style={{ width: '6rem', height: '6rem', objectFit: 'cover', borderRadius: '0.375rem' }} />
                  ))}
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addItineraryDay}
              style={{ backgroundColor: 'black', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.375rem', cursor: 'pointer' }}
            >
              Add Day
            </button>
          </div>
        </>
      )}
      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
        <button
          type="button"
          onClick={onCancel}
          style={{ backgroundColor: '#e5e7eb', color: '#374151', padding: '0.5rem 1rem', borderRadius: '0.375rem', cursor: 'pointer' }}
        >
          Cancel
        </button>
        <button
          type="submit"
          style={{ backgroundColor: 'black', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.375rem', cursor: 'pointer' }}
        >
          {initialData ? 'Update' : 'Add'} {type === 'package' ? 'Package' : 'Hidden Gem'}
        </button>
      </div>
    </form>
  )
}