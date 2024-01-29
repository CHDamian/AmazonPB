import { Outlet, useNavigate } from "react-router-dom";
import { AppBar, Box, Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField, Theme, Toolbar, Typography, alpha, styled, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useSearch } from "../context/SearchContext";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const names = [
    'Book',
    'Electronics',
    'Food',
    'Games',
    'Other',
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function RootLayout() {
    const [search, setSearch] = useState('');
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { Add } = useSearch();

    const theme = useTheme();
    const [personName, setPersonName] = React.useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <>
            {/* <Box sx={{ display: 'flex', background: 'red', width: '100%' }}> */}
            <AppBar position="static">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                        color="inherit"
                        aria-label="logo"
                        sx={{ mr: 2, p: 0 }}
                        onClick={() => navigate('/home')}
                    >
                        <img src="/images/OIG.png" alt="Logo" style={{ height: '90px' }} />
                    </Button>
                    <Search>
                        <TextField sx={{ m: 1, width: 300 }}
                            placeholder="Search…"
                            onChange={(e) => Add(e.target.value)}
                        />
                        <FormControl sx={{ m: 1, width: 200 }}>
                            <InputLabel id="demo-multiple-name-label">Tags</InputLabel>
                            <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                multiple
                                value={personName}
                                onChange={handleChange}
                                input={<OutlinedInput label="Name" />}
                                MenuProps={MenuProps}
                            >
                                {names.map((name) => (
                                    <MenuItem
                                        key={name}
                                        value={name}
                                        style={getStyles(name, personName, theme)}
                                    >
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Search>
                    <Button onClick={() => navigate('/cart')} color="inherit">Cart</Button>
                    {
                        !user ?
                            <Box>
                                <Button onClick={() => navigate('/login')} color="inherit">
                                    Login
                                </Button>
                                <Button onClick={() => navigate('/register')} color="inherit">
                                    Register
                                </Button>
                            </Box> :
                            <Box>
                                <Button onClick={() => navigate('/profile')} color="inherit">{user.username}</Button>
                                <Button onClick={() => logout()} color="inherit">Logout</Button>
                            </Box>
                    }
                </Toolbar>
            </AppBar>
            {/* </Box> */}
            <Outlet />
        </>
    )
}