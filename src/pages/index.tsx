import { SetStateAction, useState } from 'react';
import { useRouter } from 'next/router';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const { t } = useTranslation('common');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  return (
    <Container maxWidth="sm">
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
            onChange={(e: { target: { value: SetStateAction<string>; }; }) => setQuery(e.target.value)}
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

export default Home