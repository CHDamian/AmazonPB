import { Button, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";
import { useCart } from "../../context/CartContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CartPage() {
    const { cart, Remove } = useCart();
    useEffect(() => {
    }, [cart]);
    const navigate = useNavigate();

    return (
        <List
            sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
                margin: 'auto',
                marginTop: '5rem',
                borderRadius: '10px',
                boxShadow: '0px 0px 10px rgba(0,0,0,0.1)'
            }}
            subheader={
                <ListSubheader component="div" sx={{ bgcolor: 'primary.main', color: 'white', borderRadius: '10px 10px 0 0' }}>
                    Your Cart
                </ListSubheader>
            }
        >
            {cart.map((item, index) => (
                <ListItem key={index} sx={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                    <ListItemText primary={item.name} secondary={`${item.value} PLN`} />
                    <Button
                        onClick={() => Remove(item)}
                        variant="outlined"
                        color="error"
                        sx={{ ml: 2 }}
                    >
                        Remove
                    </Button>
                </ListItem>
            ))}
            <ListItem>
                <ListItemText primary={`Total: ${cart.reduce((sum, el) => sum + el.value, 0)} PLN`} />
                <Button
                    onClick={() => navigate('/buy')}
                    variant="contained"
                    color="primary"
                    sx={{ ml: 2 }}
                >
                    Buy
                </Button>
            </ListItem>
        </List>
    );
}

export default CartPage;