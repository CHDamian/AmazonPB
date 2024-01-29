import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext'; 
import { useNavigate } from 'react-router-dom';

export const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({ username: '', password: '',address:'',email:'' });
  const [loginMessage, setLoginMessage] = useState('');

  const navigate = useNavigate()
  // Use the useAuth hook to access the context
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
            setLoginMessage(data.message);
            login(data.user); // Update this line to use the user data from the server
            navigate('/home');
        } else {
            setLoginMessage(data.message);
        }
    } catch (error) {
        console.error('Error during login request:', error);
    }
};


  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <div className='dataFromContext'>
        <p>{loginMessage}</p>
      </div>
    </div>
  );
};