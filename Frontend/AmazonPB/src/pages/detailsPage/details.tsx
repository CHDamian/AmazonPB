import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const response = {
    "id": 2,
    "name": "Potop",
    "value": 49,
    "img": 'https://ecsmedia.pl/c/potop-b-iext141296637.jpg',
    "description": "Książka Henryka Sienkiewicza Książka Henryka Sienkiewicza Książka Henryka Sienkiewicza Książka Henryka Sienkiewicza Książka Henryka Sienkiewicza",
    "tags": ["Book"]
};

function DetailsPage() {
    const params = useParams();
    const data = useCart();
    
    return (
        <>
            <Typography gutterBottom variant="h5" component="div">
                {response.name}
            </Typography>
            <img src={response.img} style={{width: 200}}/>
            <Typography variant="subtitle2" color="text.secondary" sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                {response.description}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "green" }}>
                {response.value + " "}PLN
            </Typography>
        </>
    );
}

export default DetailsPage;