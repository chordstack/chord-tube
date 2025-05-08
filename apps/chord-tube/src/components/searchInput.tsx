// components/SearchInput.tsx
import { InputBase, Paper, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchInput() {
    return (
        <Paper
            component="form"
            sx={{
                p: '2px 8px',
                display: 'flex',
                alignItems: 'center',
                width: "100%",
                // maxWidth: 500,
                borderRadius: '20px',
                color: 'rgbga(255, 255, 255, 0.3)',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
            }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1, color: "white" }}
                placeholder="Search"
                inputProps={{ 'aria-label': 'search' }}
            />
            <IconButton type="submit" sx={{ p: '8px' }} aria-label="search">
                <SearchIcon className=' text-white' />
            </IconButton>
        </Paper>
    );
};


