import { Box, CircularProgress } from "@mui/material";


function CenteredCircularProgress() {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <CircularProgress />
        </Box>
    )
}

export default CenteredCircularProgress
