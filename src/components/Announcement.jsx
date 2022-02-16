import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Comment from "./Comment";

function Announcement({ announcement, code }) {
    const [comments, setComments] = useState([])

    useEffect(() => {
        const fetchComments = async () => {
            const options = {
                method: 'GET',
                headers: new Headers({
                    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                    'content-Type': 'application/json',
                }),
            }

            const response = await fetch(`http://localhost:8000/api/classes/${code}/announcements/${announcement.id}/comments`, options)
            if (!response.ok) {
                // setError(true)
                return
            }
            const data = await response.json()
            setComments(data)
        }
        fetchComments()
    }, [code])

    return (
        <Box sx={{ border: 1, borderColor: 'black', marginTop: 5 }}>
            <p> {announcement.author_name} </p>
            <pre> {announcement.text} </pre>

            <Box sx={{ borderTop: 1, borderColor: 'black' }}>
                {comments.length > 0 && <h3>Comments</h3>}
                {comments.map(comment => <Comment key={comment.id} comment={comment} />)}
            </Box>
        </Box>
    )
}

export default Announcement
