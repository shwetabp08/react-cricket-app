import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Series', path: '/series' },
  { name: 'Team', path: '/team' },
  { name: 'Players', path: '/players' },
];
const matches = [
  { name: 'Live Matches', path: '/matches/live' },
  { name: 'Recent Matches', path: '/matches/recent' },
  { name: 'Upcoming Matches', path: '/matches/upcoming' },
];
const settings = ['Profile', 'Account', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElMatches, setAnchorElMatches] = React.useState(null);

  const location = useLocation();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenMatchesMenu = (event) => {
    setAnchorElMatches(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseMatchesMenu = () => {
    setAnchorElMatches(null);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#14a44d',zIndex:'5' }}>
      <Container maxWidth="xl" sx={{ backgroundColor: '#14a44d' }}>
        <Toolbar disableGutters>
          <SportsCricketIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Link className="text-decoration-none text-white" to="/">
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <span
                className="bg-danger border border-2 border-white rounded-circle me-1"
                style={{ padding: '0 6px' }}
              >
                SP
              </span>{' '}
              CricBuzz
            </Typography>
          </Link>

          {/* Mobile menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link to={page.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Typography
  sx={{
    fontWeight: 'bold',
    textDecoration: isActive(page.path) ? 'underline' : 'none',
    textDecorationColor: isActive(page.path) ? '#a41422' : 'inherit',
    textDecorationThickness: isActive(page.path) ? '3px' : 'auto',
    textUnderlineOffset: isActive(page.path) ? '7px' : 'auto',
  }}
>
  {page.name}
</Typography>
                  </Link>
                </MenuItem>
              ))}
              <MenuItem onClick={handleOpenMatchesMenu}>
    <Typography
      sx={{
        fontWeight: 'bold',
        textAlign: 'center',
      }}
    >
      Matches
    </Typography>
  </MenuItem>
            </Menu>
          </Box>

          <SportsCricketIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Link className="text-decoration-none text-white" to="/">
            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <span
                className="bg-danger border border-2 border-white rounded-circle me-1"
                style={{ padding: '0 6px' }}
              >
                SP
              </span>{' '}
              CricBuzz
            </Typography>
          </Link>

          {/* Desktop menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
            {pages.map((page) => (
              <Link
                key={page.name}
                to={page.path}
                style={{ textDecoration: 'none' }}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: 'white',
                    display: 'block',
                    textDecoration: isActive(page.path) ? '3px underline solid #a41422' : 'none',
                    textUnderlineOffset:'7px',
                    borderRadius: 0,
                    '&:hover': {
      textDecoration: isActive(page.path) ? '3px underline solid #a41422' : 'none',
    },
                  }}
                >
                  {page.name}
                </Button>
              </Link>
            ))}
            <Button
  onClick={handleOpenMatchesMenu}
  sx={{
    my: 2,
    color: 'white',
    display: 'block',
    textDecoration: matches.some((match) => isActive(match.path))
      ? '3px underline #a41422'
      : 'none',
    textUnderlineOffset: '7px',
    borderRadius: 0,
    '&:hover': {
      textDecoration: matches.some((match) => isActive(match.path))
        ? '3px underline #a41422'
        : 'none',
      backgroundColor: 'transparent', // Optional: Prevent background change on hover
    },
  }}
>
  Matches
</Button>
            <Menu
              id="menu-matches"
              anchorEl={anchorElMatches}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElMatches)}
              onClose={handleCloseMatchesMenu}
            >
              {matches.map((match) => (
                <MenuItem key={match.name} onClick={handleCloseMatchesMenu}>
                  <Link to={match.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography
                      sx={{
                        fontWeight: 'bold',
                        borderBottom: isActive(match.path) ? '3px solid #a41422' : 'none',
                      }}
                    >
                      {match.name}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* User Avatar */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleIcon sx={{ color: 'white' }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
