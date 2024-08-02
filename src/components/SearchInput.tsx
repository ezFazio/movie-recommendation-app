import { useRouter } from 'next/router';
import { useState, ChangeEvent, FormEvent } from 'react';
import { TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchInput = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>(router.query.query as string || '');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${searchQuery}`);
    }
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <TextField
        variant="outlined"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search for a movie..."
        InputProps={{
          endAdornment: (
            <IconButton type="submit">
              <SearchIcon />
            </IconButton>
          ),
        }}
        fullWidth
      />
    </form>
  );
};

export default SearchInput;