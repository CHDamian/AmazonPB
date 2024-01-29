import { AppBar, Box, Button, Card, CardActions, CardContent, CardMedia, IconButton, Dialog, DialogTitle, DialogContent, DialogActions , TextField, Toolbar, Typography, alpha, styled } from "@mui/material"
import { SearchBox } from "../../components"
import { useContext, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useSearch } from "../../context/SearchContext";

const items = [
    {
        "id": 1,
        "name": "Potop",
        "value": 49,
        "img": 'https://ecsmedia.pl/c/potop-b-iext141296637.jpg',
        "description": "Książka Henryka Sienkiewicza",
        "tags": ["Book"]
    },
    {
        "id": 2,
        "name": "Potop",
        "value": 49,
        "img": 'https://ecsmedia.pl/c/potop-b-iext141296637.jpg',
        "description": "Książka Henryka Sienkiewicza Książka Henryka Sienkiewicza Książka Henryka Sienkiewicza Książka Henryka Sienkiewicza Książka Henryka Sienkiewicza",
        "tags": ["Book"]
    },
    {
        "id": 3,
        "name": "Quo vadis",
        "value": 49,
        "img": 'https://ecsmedia.pl/c/potop-b-iext141296637.jpg',
        "description": "Książka Henryka Sienkiewicza",
        "tags": ["Book"]
    }
]
        
interface Item {
    id: number;
    name: string;
    value: number;
    img: string | null;
    descripton: string;
    tags: string[];
}


export function HomePage() {
    const tempSearch = "Pot" // Do kontekstu algo reduxa
    const { Add } = useCart();
    const navigate = useNavigate();
    const {Search} = useSearch();
    const [filter, setFilter] = useState('');
    useEffect(() => {setFilter(Search);
    }, [Search]);
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

    return (
        <div>
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
                .map(item => <Card sx={{ width: 300, m: 2}}>
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
                                {item.descripton}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ color: "green" }}>
                                {item.value + " "}PLN
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => Add(item)}>Add to cart</Button>
                            <Button size="small" onClick={() => handleOpenDialog(item)}>Details</Button>
                        </CardActions>
                    </Card>
                ))}

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
                    <Typography>Description: {selectedItem?.descripton}</Typography>
                    <Typography>Tags: {selectedItem?.tags.join(', ')}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}