import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext'; 
import { useNavigate } from 'react-router-dom';
import {Box, TextField, Button, Typography} from '@mui/material';

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
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      bgcolor: 'background.default',
      p: 3
    }}
  >
    <Typography variant="h4" sx={{ mb: 2 }}>
      Login
    </Typography>
    <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Username"
        variant="outlined"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        fullWidth
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">
        Login
      </Button>
    </Box>
    {loginMessage && (
      <Typography color="error" sx={{ mt: 2 }}>
        {loginMessage}
      </Typography>
    )}
  </Box>
);
};