import { CircularProgress, Typography, Box } from '@mui/material';

export const Loading = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="80vh"
            width={"100%"}
        >
            <CircularProgress color="primary" size={60} />
            <Typography variant="h6" mt={2}>
                Loading, please wait...
            </Typography>
        </Box>
    );
};
