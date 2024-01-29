import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';

export const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState({ 
        username: '', 
        password: '', 
        address: '', 
        email: '' 
    });
    const [registerMessage, setRegisterMessage] = useState('');

    const navigate = useNavigate();
    
    // Use the useAuth hook to access the context
    const { login } = useAuth();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setRegisterMessage(data.message);
                login(formData);
                navigate('/home');
            } else {
                setRegisterMessage(data.message);
            }
        } catch (error) {
            console.error('Error during registration request:', error);
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
                Register
            </Typography>
            <Box component="form" onSubmit={handleRegister} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
                <TextField
                    label="Address"
                    variant="outlined"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    fullWidth
                />
                <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    fullWidth
                />
                <Button type="submit" variant="contained" color="primary">
                    Register
                </Button>
            </Box>
            {registerMessage && (
                <Typography color="error" sx={{ mt: 2 }}>
                    {registerMessage}
                </Typography>
            )}
        </Box>
    );
};
