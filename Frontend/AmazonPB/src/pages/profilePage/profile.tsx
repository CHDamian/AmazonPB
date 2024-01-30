import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useFilePicker } from 'use-file-picker';
import { Box, TextField, Button, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Checkbox, FormControlLabel } from '@mui/material';


interface ItemToAdd {
    id: number;
    name: string;
    value: number;
    img: string | null;
    description: string;
    tags: string[];
}

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

    const { openFilePicker, filesContent, clear } = useFilePicker({
        accept: '.png',
    });


    const [nameForm, setNameForm] = useState('');
    const [valueForm, setValueForm] = useState(0);
    const [descriptionForm, setDescriptionForm] = useState('');
    const [tagForm, setTagForm] = useState<string[]>([]);

    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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

    const handleSubmit = async () => {

        try{

        const response = await fetch('http://localhost:3000/addItem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: nameForm,
                value: valueForm,
                description: descriptionForm,
                img: null,
                tags: tagForm
            }),
        });
        console.log(response);
        setNameForm('');
        setValueForm(0);
        setDescriptionForm('')
        setTagForm([]);
        clear();
        setOpen(false);
        }
        catch(e)
        {
            console.log('NIe działa!');
        }
    }

    const handleTags = (el: string) =>
    {
        let array = tagForm;
        array.includes(el)? array = array.filter(elm => elm !== el) : array.push(el);
        setTagForm(array);
    }

    return (
        <>
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
            <React.Fragment>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button variant="outlined" onClick={handleClickOpen}>
                     Add new item
                    </Button>
                </div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle>Add new item</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            label="Name"
                            variant="standard"
                            onChange={(e) => setNameForm(e.target.value)}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="value"
                            label="Value"
                            type='number'
                            variant="standard"
                            onChange={(e) => setValueForm(parseInt(e.target.value))}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="description"
                            label="Description"
                            variant="standard"
                            onChange={(e) => setDescriptionForm(e.target.value)}
                        />

                        <div style={{ display: 'flex', alignItems: 'center', margin: 'dense' }}>
                                <Typography style={{ marginRight: '8px' }}>
                                 Add img:
                                </Typography>
                            <Button onClick={() => openFilePicker()}>Add</Button>
                        </div>
                        
                        <FormControlLabel control={<Checkbox onChange={() => handleTags('Book')}/>} label="Book" id='isBook' />
                        <FormControlLabel control={<Checkbox onChange={() => handleTags('Electronics')}/>} label="Electronics" id='isElectronics' />
                        <FormControlLabel control={<Checkbox onChange={() => handleTags('Food')}/>} label="Food" id='isFood' />
                        <FormControlLabel control={<Checkbox onChange={() => handleTags('Game')}/>} label="Game" id='isGame' />
                        <FormControlLabel control={<Checkbox onChange={() => handleTags('Other')}/>} label="Other" id='isOther' />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit" onClick={handleSubmit}>Add</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </>
    );
};