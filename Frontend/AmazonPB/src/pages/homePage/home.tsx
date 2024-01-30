import { AppBar, Box, Button, Card, CardActions, CardContent, CardMedia, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Toolbar, Typography, alpha, styled, Alert, AlertTitle } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useSearch } from "../../context/SearchContext";

interface Item {
    id: number;
    name: string;
    value: number;
    img: string | null;
    description: string;
    tags: string[];
}


export function HomePage() {
    const { Add } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const { Search, Fillters } = useSearch();
    const [filter, setFilter] = useState('');
    useEffect(() => {
        setFilter(Search);
    }, [Search]);
    useEffect(() => {
        const isBought = localStorage.getItem('bought') === 'true';
    
        if (isBought) {
          handleAlert('Purchase complete!');
          localStorage.removeItem('bought');
        }
      }, []);
    const [items, setItems] = useState<Item[]>([]);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3000/items')
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.error('Error fetching items:', error));
    }, []);

    const handleOpenDialog = (item: Item) => {
        setSelectedItem(item);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const [showAlert, setShowAlert] = useState(false);
    const [messAlert, setMessAlert] = useState('');
    const handleAlert = (mess: string) => {
        setMessAlert(mess);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 6000);
    }

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    return (
        <div>
            {showAlert && (
                <Alert 
                severity="success" 
                onClose={handleCloseAlert}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '50%',
                    textAlign: 'center',
                    zIndex: 1000,
                  }}
                >
                    <AlertTitle>Sukces</AlertTitle>
                    {messAlert}
                </Alert>
            )}
            <Box sx={{ my: 4, textAlign: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Discover Amazing Products!
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Explore our wide range of quality items and find what you love.
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {items.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))
                    .filter(item => Fillters.every(tag => item.tags.includes(tag)))
                    .map(item => <Card sx={{ width: 300, m: 2 }}>
                        <CardMedia
                            sx={{ height: 180 }}
                            image={item.img || '/images/default.png'}
                            title={item.name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {item.name}
                            </Typography>
                            <Typography variant="subtitle2" color="text.secondary" sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                                {item.description}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ color: "green" }}>
                                {item.value + " "}PLN
                            </Typography>
                        </CardContent>
                        <CardActions>
                            {user &&
                                <Button size="small" onClick={() => { Add(item); handleAlert(`${item.name} added to cart!`) }}>Add to cart</Button>
                            }
                            <Button size="small" onClick={() => handleOpenDialog(item)}>Details</Button>
                        </CardActions>
                    </Card>
                    )}

            </Box>
            <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Item Details</DialogTitle>
                <DialogContent>
                    {selectedItem?.img && (
                        <CardMedia
                            component="img"
                            image={selectedItem.img}
                            alt={selectedItem.name}
                            sx={{ width: '100%', height: 'auto', marginBottom: 2 }}
                        />
                    )}
                    <Typography>Name: {selectedItem?.name}</Typography>
                    <Typography>Value: {selectedItem?.value}</Typography>
                    <Typography>Description: {selectedItem?.description}</Typography>
                    <Typography>Tags: {selectedItem?.tags.join(', ')}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}