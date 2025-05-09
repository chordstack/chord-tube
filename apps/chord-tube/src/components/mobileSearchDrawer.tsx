import { useState } from 'react';
import { Drawer, IconButton, Box, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SearchInput from './searchInput';

export default function MobileSearchDrawer() {
    const [open, setOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width:1025px)');

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <>
            {isMobile && (
                <>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <IconButton onClick={toggleDrawer} sx={{ color: 'white' }}>
                            <SearchIcon />
                        </IconButton>
                    </Box>

                    <Drawer
                        anchor="top"
                        open={open}
                        onClose={toggleDrawer}
                        PaperProps={{
                            sx: {
                                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                                height: "100%",
                                padding: 2,
                            }
                        }}
                    >
                        <Box sx={{ mt: 1, width: "100%" }}>
                            <SearchInput onSubmit={() => setOpen(false)} />
                        </Box>
                    </Drawer>
                </>
            )}
        </>
    );
}
