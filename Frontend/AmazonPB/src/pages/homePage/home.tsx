import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Item {
    id: number;
    name: string;
    value: number;
    img: string | null;
    descripton: string;
    tags: string[];
}

export function HomePage() {
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
                {items.map(item => (
                    <Card key={item.id} sx={{ width: 300, m: 2 }}>
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
                            <Button size="small">Add to cart</Button>
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