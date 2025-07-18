import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';



const pages = ['Home', 'Career', 'SignUp', 'Login'];

function ComponenteEncabezado() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    

    return (
        <AppBar 
            position="static" 
            sx={{ 
                backgroundColor: '#333',
                boxShadow: 'none',
                borderBottom: 'none'
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Academic System
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Academic System
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>

                        <Button component={Link} to='/' onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block', mx: 2 }} >
                            <Typography color="white">Home</Typography>
                        </Button>
                        <Button component={Link} to='/career' onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block', mx: 2 }}>
                            <Typography color="white">Career</Typography>
                        </Button>
                        <Button component={Link} to='/login' onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block', mx: 2 }}>
                            <Typography color="white">Login</Typography>
                        </Button>
                        <Button component={Link} to='/signup' onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block', mx: 2 }}>
                            <Typography color="white">Sign Up</Typography>
                        </Button>

                    </Box>
                    
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ComponenteEncabezado;
