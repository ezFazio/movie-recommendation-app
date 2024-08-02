import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { Brightness4, Brightness7, Language } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { setLocale } from '@/store/localeSlice';
import { useRouter } from 'next/router';

interface NavBarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ darkMode, toggleDarkMode }) => {
  const { t, i18n } = useTranslation('common');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { locale, asPath } = router;

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    dispatch(setLocale(lng));
  
    const path = router.asPath;
    const newUrl = path.replace(`/${locale}`, `/${lng}`);
  
    router.push(newUrl, undefined, { locale: lng });
    handleMenuClose();
  };

  return (
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
        <Button color="inherit" href={`/${locale}`}>
          {t("home")}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;