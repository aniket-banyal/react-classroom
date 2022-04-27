import { Stack, Typography } from "@mui/material"
import { Link } from "@mui/material"
import { Link as RouterLink } from 'react-router-dom';


function NotFound({ msg, redirectLink, redirectMsg }) {
    return (
        <Stack
            sx={{
                minHeight: "50vh"
            }}
            spacing={2}
            alignItems='center'
            justifyContent='center'
        >
            <Typography variant="h4">
                {msg}
            </Typography>

            <Link
                variant="h6"
                component={RouterLink}
                to={redirectLink}
            >
                {redirectMsg}
            </Link>
        </Stack>
    )
}

export default NotFound
