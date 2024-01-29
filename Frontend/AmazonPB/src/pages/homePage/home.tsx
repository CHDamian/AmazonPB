import { AppBar, Box, Button, Card, CardActions, CardContent, CardMedia, IconButton, TextField, Toolbar, Typography, alpha, styled } from "@mui/material"
import { SearchBox } from "../../components"
import { useContext, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const items = [
    {
        "id": 1,
        "name": "Potop",
        "value": 49,
        "img": 'https://ecsmedia.pl/c/potop-b-iext141296637.jpg',
        "descripton": "Książka Henryka Sienkiewicza",
        "tags": ["Book"]
    },
    {
        "id": 2,
        "name": "Potop",
        "value": 49,
        "img": 'https://ecsmedia.pl/c/potop-b-iext141296637.jpg',
        "descripton": "Książka Henryka Sienkiewicza Książka Henryka Sienkiewicza Książka Henryka Sienkiewicza Książka Henryka Sienkiewicza Książka Henryka Sienkiewicza",
        "tags": ["Book"]
    },
    {
        "id": 3,
        "name": "Quo vadis",
        "value": 49,
        "img": 'https://ecsmedia.pl/c/potop-b-iext141296637.jpg',
        "descripton": "Książka Henryka Sienkiewicza",
        "tags": ["Book"]
    }
]


export function HomePage() {
    const tempSearch = "Pot" // Do kontekstu algo reduxa
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
                {items.filter(item => item.name.toLowerCase().includes(tempSearch.toLowerCase()))
                .map(item => <Card sx={{ width: 300, m: 2}}>
                    <CardMedia
                        sx={{ height: 180 }}
                        image={item.img}
                        title="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {item.name}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary" sx={{textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>
                            {item.descripton}
                        </Typography>
                        <Typography variant="subtitle1" sx={{color: "green"}}>
                            {item.value + " "}PLN
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Add to cart</Button>
                        <Button size="small">Details</Button>
                    </CardActions>
                </Card>)}
            </Box>
        </div>
    )
}
