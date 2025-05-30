// components/SearchInput.tsx
import { InputBase, Paper, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useSearchStore } from '../stores/useVideoStore';
import { useNavigate } from 'react-router-dom';

interface Props {
  onSubmit?: () => void;
}

export default function SearchInput({ onSubmit }: Props) {
  const navigate = useNavigate();
  const { input, setInput, submitQuery } = useSearchStore();

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!input.trim()) return; 
  navigate(`/?q=${encodeURIComponent(input.trim())}`);
  submitQuery();
  onSubmit?.();
};

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: '2px 8px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        borderRadius: '20px',
        color: 'rgba(255, 255, 255, 0.3)',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, color: 'white' }}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search' }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <IconButton type="submit" sx={{ p: '8px' }} aria-label="search">
        <SearchIcon className="text-white" />
      </IconButton>
    </Paper>
  );
}
