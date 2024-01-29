import { Button, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";

const response = [
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

function CartPage() {
    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            subheader={<ListSubheader>Settings</ListSubheader>}
        >
            {response.map((item) => <ListItem>
                <ListItemIcon>
                <img src={item.img} style={{width: 200}}/>
                </ListItemIcon>
                <ListItemText id="switch-list-label-wifi" primary={item.name} secondary={`${item.value} PLN`}/>
                <Button>Remove</Button>
            </ListItem>)}
        </List>
    );
}

export default CartPage;