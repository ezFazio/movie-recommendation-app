import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import Link from 'next/link';
import { Brightness4, Brightness7 } from '@mui/icons-material';

interface NavBarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ darkMode, toggleDarkMode }) => {
  return( 
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Movie Recommendation
      </Typography>
      <IconButton
        edge="end"
        color="inherit"
        onClick={toggleDarkMode}
        aria-label="toggle dark mode"
      >
        {darkMode ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
      <Button color="inherit" component={Link} href="/">
        Home
      </Button>
    </Toolbar>
  </AppBar>
  );
};

export default NavBar;