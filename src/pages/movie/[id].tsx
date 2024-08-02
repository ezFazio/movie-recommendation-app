import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container, Typography, Box, Card, CardContent, CardMedia } from '@mui/material';
import tmdbApi from '@/services/tmdbApi';
import { Movie } from '@/types/types';

const MovieDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (id) {
      tmdbApi.get(`/movie/${id}`)
        .then(response => setMovie(response.data))
        .catch(error => {
          console.error('Error fetching movie:', error);
        });
    }
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          {movie.title}
        </Typography>
        <Card>
          <CardMedia
            component="img"
            alt={movie.title}
            height="500"
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          />
          <CardContent>
            <Typography variant="body1" component="p">
              {movie.overview}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Release Date: {new Date(movie.release_date).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Rating: {movie.vote_average}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default MovieDetails;