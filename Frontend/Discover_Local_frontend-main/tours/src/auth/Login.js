// // // components/Login.js
// // import React, { useState } from 'react';
// // import axios from '../axiosConfig'; // Import the axios configuration
// // import './auth.css'; // Import the CSS file

// // const Login = () => {
// //   const [username, setUsername] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [message, setMessage] = useState('');

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const response = await axios.post('/login/', { username, password });
// //       localStorage.setItem('token', response.data.token); // Store token in localStorage
// //       setMessage('Login successful');
// //     } catch (error) {
// //       setMessage('Login failed');
// //     }
// //   };

// //   return (
// //     <div className="container">

// //       <h2>Login</h2>
// //       <h3>Welcome back !</h3>
// //       <form onSubmit={handleSubmit}>
// //         <input
// //           type="text"
// //           placeholder="Username"
// //           value={username}
// //           onChange={(e) => setUsername(e.target.value)}
// //         />
// //         <input
// //           type="password"
// //           placeholder="Password"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //         />
// //         <button type="submit">Login</button>
// //       </form>
// //       {message && <p className="message">{message}</p>}
// //       <footer>
// //         <p>
// //           Don't have an account? <a href="/register">Sign Up</a>
// //         </p>
// //       </footer>
// //     </div>
// //   );
// // };

// // export default Login;

// // components/Login.js
// import React, { useState } from 'react';
// import axios from '../axiosConfig'; // Import the axios configuration
// import './auth.css'; // Import the CSS file

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/login/', { username, password });
//       localStorage.setItem('token', response.data.token); // Store token in localStorage
//       setMessage('Login successful');
//     } catch (error) {
//       setMessage('Login failed');
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Welcome back !</h2>
//       <h3>Your next journy awaits..!!</h3>
//       <form onSubmit={handleSubmit}>
//         <div className="input-container">
//           <i className="fas fa-user icon"> </i>
//           <br>
//           </br>
//           <br></br>
//           <input
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>
//         <div className="input-container">
//           <i className="fas fa-lock icon"  ></i> 
//           <br>
//           </br>
//           <br></br>
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//       {message && <p className="message">{message}</p>}
//       <footer>
//         <p>
//           New Explorer ? <a href="/register">Sign Up here for new Journey</a>
//         </p>
//       </footer>
//     </div>
//   );
// };
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    console.log(formData);
    
    try {
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        const authorizationHeader = response.headers.get('Authorization');
        if (authorizationHeader) {
          const token = authorizationHeader.split(' ')[1];
          console.log(token);
          
          if (token) {
            
            Cookies.set('auth_token', token, { expires: 7, secure: true, sameSite: 'Lax', path: '/' });
            Cookies.set('username' , data.username ,  { expires: 7, secure: true, sameSite: 'Lax', path: '/' })
            // setSuccessMessage('Login successful!');
            console.log("success");
            if(data.username == 'admin'){
              navigate('/admin')
            }
            else{
            navigate('/');
            }
          }
        }
      } else {
        setError(data.error || 'An error occurred during login');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
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

  const linkStyle = {
    color: '#4CAF50',
    textDecoration: 'none',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Welcome Back</h2>
      <h3 style={headingStyle}>Continue your adventure</h3>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputContainerStyle}>
          <i className="fas fa-envelope" style={iconStyle}></i>
          <input
            type="username"
            name="username"
            placeholder="username"
            value={formData.username}
            onChange={handleChange}
            required
            style={inputStyle}
          />
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
        <button type="submit" style={buttonStyle}>Login</button>
      </form>
      {(message || error) && <p style={messageStyle}>{message || error}</p>}
      <footer style={footerStyle}>
        <p>
          <a href="#" style={linkStyle}>Forgot Password?</a>
        </p>
        <p>
          Don't have an account? <a href="/signup" style={linkStyle}>Sign Up</a>
        </p>
      </footer>
    </div>
  );
};

export default Login;