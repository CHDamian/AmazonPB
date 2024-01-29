import { Outlet, useNavigate } from "react-router-dom";
import { AppBar, Box, Button, TextField, Toolbar, Typography, alpha, styled } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

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

    return(
        <>
            {/* <Box sx={{ display: 'flex', background: 'red', width: '100%' }}> */}
                <AppBar position="static">
                    <Toolbar sx={{display:'flex', justifyContent:'space-between'}}>
                    <Button
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={() => navigate('/home')}
                    >
                        AmazonPB
                    </Button>
                    <Search>
                        <TextField
                        placeholder="Search…"
                        onChange={(e) => setSearch(e.target.value)}
                        />
                    </Search>
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