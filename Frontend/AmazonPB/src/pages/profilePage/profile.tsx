import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';
export const ProfilePage: React.FC = () => {
    const { user, login } = useAuth();
    const [editAddress, setEditAddress] = useState(false);
    const [editEmail, setEditEmail] = useState(false);
    const [editPassword, setEditPassword] = useState(false);
    const [newAddress, setNewAddress] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [updateMessage, setUpdateMessage] = useState('');
    const navigate = useNavigate();

    const handleProfileUpdate = async (event: React.FormEvent) => {
        event.preventDefault();
    
        if (user) {
            const updateData = {
                username: user.username,
                ...(editPassword && { oldPassword, newPassword }),
                ...(editAddress && { newAddress }),               
                ...(editEmail && { newEmail }),                   
            };
    
            try {
                const response = await fetch('http://localhost:3000/updateProfile', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updateData)
                });
    
                const data = await response.json();
                if (response.ok) {
                    setUpdateMessage('Profile updated successfully.');
                    setEditAddress(false);
                    setEditEmail(false);
                    setEditPassword(false);
                    setNewAddress('');
                    setNewEmail('');
                    setOldPassword('');
                    setNewPassword('');
                    navigate('/home');
                } else {
                    setUpdateMessage(data.message);
                }
            } catch (error) {
                console.error('Error updating profile:', error);
                setUpdateMessage('Error updating profile.');
            }
        }
    };

    return (
        <Box sx={{ p: 3, maxWidth: 500, mx: 'auto' }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
               Your Profile
            </Typography>
            <Typography sx={{ mb: 1 }}>Current Username: {user?.username}</Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography sx={{ mr: 2 }}>
                    Current Address: {editAddress ? '' : user?.address}
                </Typography>
                {editAddress ? 
                    <TextField
                        size="small"
                        type="text"
                        value={newAddress}
                        onChange={(e) => setNewAddress(e.target.value)}
                        sx={{ mr: 1 }}
                    /> : 
                    <Button onClick={() => setEditAddress(true)} variant="outlined" size="small">Edit</Button>}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography sx={{ mr: 2 }}>
                    Current Email: {editEmail ? '' : user?.email}
                </Typography>
                {editEmail ? 
                    <TextField
                        size="small"
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        sx={{ mr: 1 }}
                    /> : 
                    <Button onClick={() => setEditEmail(true)} variant="outlined" size="small">Edit</Button>}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography sx={{ mr: 2 }}>
                    Current Password: {!editPassword ? '********' : ''}
                </Typography>
                {!editPassword && (
                    <Button onClick={() => setEditPassword(true)} variant="outlined" size="small">
                        Edit Password
                    </Button>
                )}
            </Box>
            {editPassword && (
                <Box sx={{ mb: 2 }}>
                    <TextField
                        label="Old Password"
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        size="small"
                        fullWidth
                        sx={{ mb: 1 }}
                    />
                    <TextField
                        label="New Password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        size="small"
                        fullWidth
                    />
                </Box>
            )}

            {(editAddress || editEmail || editPassword) && (
                <Button type="submit" onClick={handleProfileUpdate} variant="contained" color="primary">
                    Update Profile
                </Button>
            )}

            {updateMessage && (
                <Typography color="error" sx={{ mt: 2 }}>
                    {updateMessage}
                </Typography>
            )}
        </Box>
    );
};