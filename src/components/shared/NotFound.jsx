import { Stack, Typography } from "@mui/material"

function NotFound({ msg, children }) {
    return (
        <Stack spacing={2} alignItems='center'>
            <Typography variant="h5">
                {msg}
            </Typography>

            {children}
        </Stack>
    )
}

export default NotFound
