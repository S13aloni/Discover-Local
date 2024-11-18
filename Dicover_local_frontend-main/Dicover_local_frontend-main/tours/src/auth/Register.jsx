// // components/Register.js
// import React, { useState } from 'react';
// import axios from '../axiosConfig'; // Import the axios configuration
// import './auth.css'; // Import the CSS file

// const Register = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [contact_number, setcontact_number] = useState('');
//   const [state, setState] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/register/', {
//         username,
//         email,
//         contact_number: contact_number,
//         state,
//         password
//       });
//       setMessage('OTP sent to your email');
//     } catch (error) {
//       setMessage('Registration failed');
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Join the Adventure</h2>
//       <h3>Become part of our explorer Journey</h3>
//       <form onSubmit={handleSubmit}>
//       <div className="input-container">
//       <i className="fas fa-user icon"></i>
//       <br></br>
//       <br></br>
//       <br></br>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//       </div>
//       <div className="input-container">
//         <i className="fas fa-envelope icon"></i>
//         <br></br>
//       <br></br>
//       <br></br>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         /></div>
//        <div className="input-container">
//         <i className="fas fa-phone icon"></i>
//         <br></br>
//       <br></br>
//       <br></br>
//         <input
//           type="text"
//           placeholder="Contact Number"
//           value={contact_number}
//           onChange={(e) => setcontact_number(e.target.value)}
//         /></div> 
//         <div className="input-container">
//         <i className="fas fa-map-marker-alt icon"></i>
//         <br></br>
//       <br></br>
//       <br></br>
//         <input
//           type="text"
//           placeholder="State"
//           value={state}
//           onChange={(e) => setState(e.target.value)}
//         /></div>
//         <div className="input-container">
//          <i className="fas fa-lock icon"></i>
//          <br></br>
//       <br></br>
//       <br></br>
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         /></div>
//         <button type="submit">Sign Up</button>
//       </form>
//       {message && <p className="message">{message}</p>}
//       <footer>
//         <p>
//           Already have an account? <a href="/login">Login</a>
//         </p>
//       </footer>
//     </div>
//   );
// };



// import React, { useState } from 'react';

// export default function Register() {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     contact_number: '',
//     state: '',
//     password: '',
//     otp: '',
//   });

//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [showOtp, setShowOtp] = useState(false);

//   const indianStates = [
//     'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
//     'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
//     'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
//     'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
//     'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const validateForm = () => {
//     const { username, email, contact_number, state, password } = formData;

//     if (!username.trim() || !email.trim() || !contact_number.trim() || !state || !password.trim()) {
//       setError('All fields are required');
//       return false;
//     }

//     if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
//       setError('Please enter a valid email address');
//       return false;
//     }

//     if (!/^\d{10}$/.test(contact_number)) {
//       setError('Please enter a valid 10-digit contact number');
//       return false;
//     }

//     if (password.length < 6) {
//       setError('Password must be at least 6 characters long');
//       return false;
//     }

//     if (!/\d/.test(password)) {
//       setError('Password must contain at least one number');
//       return false;
//     }

//     if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
//       setError('Password must contain at least one special character');
//       return false;
//     }

//     setError('');
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) {
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:8000/api/signup/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: formData.email,
//           password: formData.password,
//           username: formData.username,
//           state: formData.state,
//           contact_number: formData.contact_number
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setMessage(data.message || 'Registration failed');
//       } else {
//         setMessage('OTP sent to your email');
//         setShowOtp(true);
//       }
//     } catch (error) {
//       setMessage('An error occurred. Please try again later.');
//     }
//   };

//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:8000/api/verify-otp/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: formData.email,
//           password: formData.password,
//           username: formData.username,
//           state: formData.state,
//           contact_number: formData.contact_number,
//           otp: formData.otp

//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setMessage(data.message || 'OTP verification failed');
//       } else {
//         setMessage('Registration successful!');
//       }
//     } catch (error) {
//       setMessage('An error occurred. Please try again later.');
//     }
//   };

//   const containerStyle = {
//     maxWidth: '400px',
//     margin: '0 auto',
//     padding: '20px',
//     fontFamily: 'Arial, sans-serif',
//   };

//   const headingStyle = {
//     textAlign: 'center',
//     color: '#333',
//   };

//   const formStyle = {
//     display: 'flex',
//     flexDirection: 'column',
//   };

//   const inputContainerStyle = {
//     position: 'relative',
//     marginBottom: '15px',
//   };

//   const inputStyle = {
//     width: '100%',
//     padding: '10px',
//     paddingLeft: '30px',
//     border: '1px solid #ccc',
//     borderRadius: '4px',
//     fontSize: '16px',
//   };

//   const iconStyle = {
//     position: 'absolute',
//     left: '10px',
//     top: '50%',
//     transform: 'translateY(-50%)',
//     color: '#888',
//   };

//   const selectStyle = {
//     ...inputStyle,
//     appearance: 'none',
//   };

//   const buttonStyle = {
//     backgroundColor: '#4CAF50',
//     color: 'white',
//     padding: '10px',
//     border: 'none',
//     borderRadius: '4px',
//     fontSize: '16px',
//     cursor: 'pointer',
//   };

//   const messageStyle = {
//     textAlign: 'center',
//     marginTop: '10px',
//     color: error ? 'red' : 'green',
//   };

//   const footerStyle = {
//     textAlign: 'center',
//     marginTop: '20px',
//   };

//   return (
//     <div style={containerStyle}>
//       <h2 style={headingStyle}>Join the Adventure</h2>
//       <h3 style={headingStyle}>Become part of our explorer journey</h3>
//       <form onSubmit={handleSubmit} style={formStyle}>
//         <div style={inputContainerStyle}>
//           <i className="fas fa-user" style={iconStyle}></i>
//           <input
//             type="text"
//             name="username"
//             placeholder="Username"
//             value={formData.username}
//             onChange={handleChange}
//             required
//             style={inputStyle}
//           />
//         </div>
//         <div style={inputContainerStyle}>
//           <i className="fas fa-envelope" style={iconStyle}></i>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             style={inputStyle}
//           />
//         </div>
//         <div style={inputContainerStyle}>
//           <i className="fas fa-phone" style={iconStyle}></i>
//           <input
//             type="text"
//             name="contact_number"
//             placeholder="Contact Number"
//             value={formData.contact_number}
//             onChange={handleChange}
//             required
//             style={inputStyle}
//           />
//         </div>
//         <div style={inputContainerStyle}>
//           <i className="fas fa-map-marker-alt" style={iconStyle}></i>
//           <select
//             name="state"
//             value={formData.state}
//             onChange={handleChange}
//             required
//             style={selectStyle}
//           >
//             <option value="" disabled>Select your State</option>
//             {indianStates.map((state, index) => (
//               <option key={index} value={state}>{state}</option>
//             ))}
//           </select>
//         </div>
//         <div style={inputContainerStyle}>
//           <i className="fas fa-lock" style={iconStyle}></i>
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             style={inputStyle}
//           />
//         </div>
//         {showOtp && (
//           <div style={inputContainerStyle}>
//             <i className="fas fa-key" style={iconStyle}></i>
//             <input
//               type="text"
//               name="otp"
//               placeholder="Enter OTP"
//               value={formData.otp}
//               onChange={handleChange}
//               required
//               style={inputStyle}
//             />
//           </div>
//         )}
//         {!showOtp ? (
//           <button type="submit" style={buttonStyle}>Sign Up</button>
//         ) : (
//           <button onClick={handleVerifyOtp} style={buttonStyle}>Verify OTP</button>
//         )}
//       </form>
//       {(message || error) && <p style={messageStyle}>{message || error}</p>}
//       <footer style={footerStyle}>
//         <p>
//           Already have an account? <a href="/login">Login</a>
//         </p>
//       </footer>
//     </div>
//   );
// }

import React, { useState } from 'react';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    contact_number: '',
    state: '',
    password: '',
    otp: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showOtp, setShowOtp] = useState(false);

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
    'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { username, email, contact_number, state, password } = formData;

    if (!username.trim() || !email.trim() || !contact_number.trim() || !state || !password.trim()) {
      setError('All fields are required');
      return false;
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (!/^\d{10}$/.test(contact_number)) {
      setError('Please enter a valid 10-digit contact number');
      return false;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    if (!/\d/.test(password)) {
      setError('Password must contain at least one number');
      return false;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setError('Password must contain at least one special character');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          username: formData.username,
          state: formData.state,
          contact_number: formData.contact_number
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || 'Registration failed');
      } else {
        setMessage('OTP sent to your email');
        setShowOtp(true);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/verify-otp/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          username: formData.username,
          state: formData.state,
          contact_number: formData.contact_number,
          otp: formData.otp

        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || 'OTP verification failed');
      } else {
        setMessage('Registration successful!');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
    }
  };

  const containerStyle = {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  };

  const headingStyle = {
    textAlign: 'center',
    color: '#333',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const inputContainerStyle = {
    position: 'relative',
    marginBottom: '15px',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    paddingLeft: '30px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
  };

  const iconStyle = {
    position: 'absolute',
    left: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#888',
  };

  const selectStyle = {
    ...inputStyle,
    appearance: 'none',
  };

  const buttonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  };

  const messageStyle = {
    textAlign: 'center',
    marginTop: '10px',
    color: error ? 'red' : 'green',
  };

  const footerStyle = {
    textAlign: 'center',
    marginTop: '20px',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Join the Adventure</h2>
      <h3 style={headingStyle}>Become part of our explorer journey</h3>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputContainerStyle}>
          <i className="fas fa-user" style={iconStyle}></i>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={inputContainerStyle}>
          <i className="fas fa-envelope" style={iconStyle}></i>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={inputContainerStyle}>
          <i className="fas fa-phone" style={iconStyle}></i>
          <input
            type="text"
            name="contact_number"
            placeholder="Contact Number"
            value={formData.contact_number}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={inputContainerStyle}>
          <i className="fas fa-map-marker-alt" style={iconStyle}></i>
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            style={selectStyle}
          >
            <option value="" disabled>Select your State</option>
            {indianStates.map((state, index) => (
              <option key={index} value={state}>{state}</option>
            ))}
          </select>
        </div>
        <div style={inputContainerStyle}>
          <i className="fas fa-lock" style={iconStyle}></i>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        {showOtp && (
          <div style={inputContainerStyle}>
            <i className="fas fa-key" style={iconStyle}></i>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>
        )}
        {!showOtp ? (
          <button type="submit" style={buttonStyle}>Sign Up</button>
        ) : (
          <button onClick={handleVerifyOtp} style={buttonStyle}>Verify OTP</button>
        )}
      </form>
      {(message || error) && <p style={messageStyle}>{message || error}</p>}
      <footer style={footerStyle}>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </footer>
    </div>
  );
}