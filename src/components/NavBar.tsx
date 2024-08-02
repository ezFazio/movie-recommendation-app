import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Link from 'next/link';

const NavBar = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Movie Recommendation
      </Typography>
      <Button color="inherit" component={Link} href="/">
        Home
      </Button>
    </Toolbar>
  </AppBar>
);

export default NavBar;