import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Comment from "./Comment"
import CreateComment from "./CreateComment"

function CommentSection({ announcementId }) {
    const [comments, setComments] = useState([])
    const [newDataAvailable, setNewDataAvailable] = useState(true)
    const { code } = useParams()

    const createNewComment = async (text) => {
        const options = {
            method: 'POST',
            headers: new Headers({
                Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                'content-Type': 'application/json',
            }),
            body: JSON.stringify({ text })
        }

        const response = await fetch(`http://localhost:8000/api/classes/${code}/announcements/${announcementId}/comments`, options)
        setNewDataAvailable(true)
    }

    const deleteComment = async (comment_id) => {
        const options = {
            method: 'DELETE',
            headers: new Headers({
                Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                'content-Type': 'application/json',
            }),
        }

        const response = await fetch(`http://localhost:8000/api/classes/${code}/announcements/${announcementId}/comments/${comment_id}`, options)
        setNewDataAvailable(true)
    }

    useEffect(() => {
        const fetchComments = async () => {
            const options = {
                method: 'GET',
                headers: new Headers({
                    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                    'content-Type': 'application/json',
                }),
            }

            const response = await fetch(`http://localhost:8000/api/classes/${code}/announcements/${announcementId}/comments`, options)
            if (!response.ok) {
                // setError(true)
                return
            }
            const data = await response.json()
            setComments(data)
            setNewDataAvailable(false)
        }
        if (newDataAvailable)
            fetchComments()
    }, [code, announcementId, newDataAvailable])


    return (
        <>
            <Box sx={{ borderTop: 1, borderColor: 'black' }}>
                {comments.length > 0 && <h3>Comments</h3>}
                {comments.map(comment => <Comment key={comment.id} comment={comment} onDelete={deleteComment} />)}
            </Box>

            <CreateComment onSubmit={createNewComment} />
        </>)

}

export default CommentSection