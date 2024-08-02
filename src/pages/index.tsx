import { SetStateAction, useState } from 'react';
import { useRouter } from 'next/router';
import { Container, TextField, Button, Box, Typography } from '@mui/material';

const Home = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  return (
    <Container maxWidth="sm">
      <Box my={4} textAlign="center">
        <Typography variant="h3" component="h1" gutterBottom>
          Movie Recommendation
        </Typography>
        <form onSubmit={handleSearch}>
          <TextField
            fullWidth
            label="Search for movies"
            variant="outlined"
            value={query}
            onChange={(e: { target: { value: SetStateAction<string>; }; }) => setQuery(e.target.value)}
            margin="normal"
          />
          <Button variant="contained" color="primary" type="submit">
            Search
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Home