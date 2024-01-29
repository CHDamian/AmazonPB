import { Outlet, useNavigate } from "react-router-dom";
import { AppBar, Box, Button, TextField, Toolbar, Typography, alpha, styled } from "@mui/material";
import { useState } from "react";
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

export default function RootLayout(){
    const [search, setSearch] = useState('');
    const {user, logout} = useAuth();
    const navigate = useNavigate();
    const {Add} = useSearch();

    return(
        <>
            {/* <Box sx={{ display: 'flex', background: 'red', width: '100%' }}> */}
                <AppBar position="static">
                    <Toolbar sx={{display:'flex', justifyContent:'space-between'}}>
                    <Button
                        color="inherit"
                        aria-label="logo"
                        sx={{ mr: 2, p: 0 }}
                        onClick={() => navigate('/home')}
                    >
                         <img src="/images/OIG.png" alt="Logo" style={{ height: '90px' }} />
                    </Button>
                    <Search>
                        <TextField
                        placeholder="Search…"
                        onChange={(e) => Add(e.target.value)}
                        />
                    </Search>
                    <Button onClick={() => navigate('/cart')} color="inherit">Cart</Button>
                    {
                        !user?
                        <Box>
                            <Button onClick={() => navigate('/login')} color="inherit">
                                Login
                            </Button>
                            <Button onClick={() => navigate('/register')} color="inherit">
                                Register
                            </Button>
                        </Box>:
                        <Box>
                            <Button onClick={() => navigate('/profile')} color="inherit">{user.username}</Button>
                            <Button onClick={() => logout()} color="inherit">Logout</Button>
                        </Box>
                    }
                    </Toolbar>
                </AppBar>
                {/* </Box> */}
            <Outlet/>
        </>
    )
}