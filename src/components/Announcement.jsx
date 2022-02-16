import { Box } from "@mui/material";
import CommentSection from "./CommentSection";

function Announcement({ announcement, code }) {

    return (
        <Box sx={{ border: 1, borderColor: 'black', marginTop: 5 }}>
            <p> {announcement.author_name} </p>
            <pre> {announcement.text} </pre>

            <CommentSection code={code} id={announcement.id} />
        </Box>
    )
}

export default Announcement
