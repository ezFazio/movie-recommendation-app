import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';

const Home = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const { locale } = router;
  const { t, i18n } = useTranslation('common');
  
  useEffect(() => {
    if (locale && locale !== i18n.language && (locale === 'es' || locale === 'en')) {
      i18n.changeLanguage(locale);
    }
  }, [locale, i18n]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/${i18n.language}/search?query=${query}`);
  };

  return (
    <Container maxWidth="sm">
      <Head>
        <title>{t('title')}</title>
      </Head>
      <Box my={4} textAlign="center">
        <Typography variant="h3" component="h1" gutterBottom>
          {t('title')}
        </Typography>
        <form onSubmit={handleSearch}>
          <TextField
            fullWidth
            label={t('searchForMovies')}
            variant="outlined"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            margin="normal"
          />
          <Button variant="contained" color="primary" type="submit">
            {t('search')}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Home;