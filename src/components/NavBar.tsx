import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import Link from 'next/link';
import { Brightness4, Brightness7, Language } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

interface NavBarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ darkMode, toggleDarkMode }) => {
  const { t } = useTranslation('common');
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    handleMenuClose();
  };

  return( 
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        {t('title')}
      </Typography>
      <IconButton
          edge="end"
          color="inherit"
          onClick={handleMenuOpen}
          aria-label="change language"
          sx={{ color: 'white' }}
        >
          <Language />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleLanguageChange('en')}>English</MenuItem>
          <MenuItem onClick={() => handleLanguageChange('es')}>Español</MenuItem>
        </Menu>
      <IconButton
        edge="end"
        color="inherit"
        onClick={toggleDarkMode}
        aria-label="toggle dark mode"
      >
        {darkMode ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
      <Button color="inherit" component={Link} href="/">
        {t("home")}
      </Button>
    </Toolbar>
  </AppBar>
  );
};

export default NavBar;