import { Box } from "@mui/material"

function Comment({ comment }) {

    return (
        <Box sx={{ borderBottom: 1, borderColor: 'black' }}>
            <h5> {comment.author_name} </h5>
            <p> {comment.text} </p>
        </Box>
    )

}

export default Comment
