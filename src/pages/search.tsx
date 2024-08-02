import { GetServerSideProps } from 'next';
import { Container, Grid, Card, CardContent, Typography, CardMedia, Box } from '@mui/material';
import Link from 'next/link';
import { searchMovies } from '../services/tmdbApi';
import { Movie } from '@/types/types';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import SearchInput from '../components/SearchInput';

interface SearchProps {
  initialResults: Movie[];
  query: string;
}

const Search = ({ initialResults, query }: SearchProps) => {
  const { t, i18n } = useTranslation('common');
  const [results, setResults] = useState<Movie[]>(initialResults);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await searchMovies(query, i18n.language);
      setResults(response.results);
      setLoading(false);
    };

    fetchData();
  }, [i18n.language, query]);

  if (loading) return <Container>{t('loading')}...</Container>;

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4" component="h2" gutterBottom>
          {t('searchResults')}
        </Typography>
      </Box>
      <Box mb={4}>
        <SearchInput />
      </Box>
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
                    {new Date(movie.release_date).toLocaleDateString(i18n.language)}
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context.query;
  const language = context.locale || 'en';
  let initialResults: Movie[] = [];

  if (query) {
    try {
      const response = await searchMovies(query as string, language);
      initialResults = response.results;
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  }

  return {
    props: {
      initialResults,
      query,
    },
  };
};

export default Search;