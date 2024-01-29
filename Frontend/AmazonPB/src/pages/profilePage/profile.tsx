import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const ProfilePage: React.FC = () => {
    const { user, login } = useAuth();
    const [newAddress, setNewAddress] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [updateMessage, setUpdateMessage] = useState('');
    const navigate = useNavigate();

    const handleProfileUpdate = async (event: React.FormEvent) => {
        event.preventDefault();

        if (user) {
            try {
                const response = await fetch('http://localhost:3000/updateProfile', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: user.username, 
                        oldPassword, 
                        newPassword, 
                        newAddress, 
                        newEmail
                    })
                });

                const data = await response.json();
                if (response.ok) {
                    setUpdateMessage('Profile updated successfully.');
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
        <div>
            <h2>Profile Page</h2>
            <p>Current Username: {user?.username}</p>
            <p>Current Address: {user?.address}</p>
            <p>Current Email: {user?.email}</p>
            <form onSubmit={handleProfileUpdate}>
                {/* Fields for address, email, and password */}
                <label>
                    New Address:
                    <input
                        type="text"
                        value={newAddress}
                        onChange={(e) => setNewAddress(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    New Email:
                    <input
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Old Password:
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    New Password:
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Update Profile</button>
            </form>
            <p>{updateMessage}</p>
        </div>
    );
};