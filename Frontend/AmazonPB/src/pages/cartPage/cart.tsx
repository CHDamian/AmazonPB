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
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            subheader={<ListSubheader>Settings</ListSubheader>}
        >
            {cart.map((item) => <ListItem>
                <ListItemText id="switch-list-label-wifi" primary={item.name}/>
                <ListItemText id="switch-list-label-wifi" primary={`${item.value} PLN`}/>
                <Button onClick={() => Remove(item)}>Remove</Button>
            </ListItem>)}
            <ListItem>
                <ListItemText id="switch-list-label-wifi" primary={`Razem: ${cart.reduce((sum, el) => sum + el.value, 0)} PLN`}/>
                <Button onClick={() => navigate('/buy')}>Buy</Button>
            </ListItem>
        </List>

    );
}

export default CartPage;