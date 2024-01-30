import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

function BuyPage() {

    const {user} = useAuth();
    const [address, setAddress] = useState(user?.address);
    const [email, setEmail] = useState(user?.email);
    const [errMessage, setErrMessage] = useState('');
    const {cart, Clear} = useCart();
    const navigate = useNavigate()

    const handleBuy = async (e: React.FormEvent) => {
        e.preventDefault();



        try {
            const response = await fetch('http://localhost:3000/buy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cart),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                Clear();
                localStorage.setItem('bought', 'true');
                navigate('/home');
            } else {
                setErrMessage(data.message);
            }
        } catch (error) {
            console.error('Error during login request:', error);
        }

    }

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
                Kup
            </Typography>
            <Box component="form" onSubmit={handleBuy} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    label="Address"
                    variant="outlined"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                />
                <Button type="submit" variant="contained" color="primary">
                    Login
                </Button>
            </Box>
            {errMessage && (
                <Typography color="error" sx={{ mt: 2 }}>
                    {errMessage}
                </Typography>
            )}
        </Box>
    );
}

export default BuyPage;