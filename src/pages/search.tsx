import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, CardMedia } from '@mui/material';
import Link from 'next/link';
import tmdbApi from '../services/tmdbApi';
import { Movie } from '@/types/types';

const Search = () => {
  const router = useRouter();
  const { query } = router.query;
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (query) {
      setLoading(true);
      tmdbApi.get('/search/movie', { params: { query, include_adult: false } })
        .then(response => {
          setResults(response.data.results);
        })
        .catch(error => {
          console.error('Error fetching search results:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [query]);

  if (loading) return <Container>Loading...</Container>;

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Search Results
      </Typography>
      <Grid container spacing={4}>
        {results.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4}>
            <Link href={`/movie/${movie.id}`} passHref>
              <Card>
                <CardMedia
                  component="img"
                  alt={movie.title}
                  height="140"
                  image={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "./img/movie.svg"} 
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(movie.release_date).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Search;