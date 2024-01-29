import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const ProfilePage: React.FC = () => {
    const { user, login } = useAuth();
    const [newUsername, setNewUsername] = useState('');
    const [updateMessage, setUpdateMessage] = useState('');
    const navigate = useNavigate();

    const handleUsernameUpdate = async (event: React.FormEvent) => {
        event.preventDefault();

        if (user) {
            try {
                const response = await fetch('http://localhost:3000/updateUsername', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ oldUsername: user.username, newUsername })
                });

                const data = await response.json();
                if (response.ok) {
                    setUpdateMessage('wbiłem.');
                    login({ ...user, username: newUsername });
                    setUpdateMessage(data.masage);
                    navigate('/home');
                } else {
                    setUpdateMessage('Failed to update username.');
                }
            } catch (error) {
                console.error('Error updating username:', error);
                setUpdateMessage('Error updating username.');
            }
        }
    };

    return (
        <div>
            <h2>Profile Page</h2>
            <p>Current Username: {user?.username}</p>
            <p>Current Password: {user?.password}</p>
            <form onSubmit={handleUsernameUpdate}>
                <label>
                    New Username:
                    <input
                        type="text"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Update Username</button>
            </form>
            <p>{updateMessage}</p>
        </div>
    );
};
