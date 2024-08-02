import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '@/theme/theme';
import CssBaseline from '@mui/material/CssBaseline';
import store from '@/store/index';
import NavBar from '@/components/NavBar';
import { useEffect, useState } from 'react';

function MovieRecommendationApp({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem('darkMode', newMode.toString());
      return newMode;
    });
  };
  
  return (
    <Provider store={store}>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Component {...pageProps} toggleDarkMode={toggleDarkMode}/>
      </ThemeProvider>
    </Provider>
  );
}

export default MovieRecommendationApp;