import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container, Typography, Box, Card, CardContent, CardMedia } from '@mui/material';
import tmdbApi, { getMovieDetails } from '@/services/tmdbApi';
import { Movie } from '@/types/types';
import { useTranslation } from 'react-i18next';

const MovieDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState<Movie | null>(null);
  const { t, i18n } = useTranslation('common');
  const language = i18n.language;

  useEffect(() => {
    if (id) {
      getMovieDetails(parseInt(id as string), language)
        .then(data => setMovie(data))
        .catch(error => console.error('Error fetching movie details:', error));
    }
  }, [id, language]);

  if (!movie) return <div>{t('loading')}</div>;

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
            image={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "../../img/movie.svg"} 
          />
          <CardContent>
            <Typography variant="body1" component="p">
              {movie.overview}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('releaseDate')}: {new Date(movie.release_date).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('rating')}: {movie.vote_average}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default MovieDetails;