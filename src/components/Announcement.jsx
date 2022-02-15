import { Box } from "@mui/material";

function Announcement({ announcement }) {

    return (
        <Box sx={{ border: 1, borderColor: 'black', marginTop: 5 }}>
            <pre> {announcement.text} </pre>
        </Box >
    )
}

export default Announcement
