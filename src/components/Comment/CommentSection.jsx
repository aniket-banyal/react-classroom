import { Box } from "@mui/material"
import { useParams } from "react-router-dom"
import useComments from "../../hooks/api/useComments"
import Comment from "./Comment"
import CreateComment from "./CreateComment"

function CommentSection({ announcementId }) {
    const { code } = useParams()
    const { data: comments, isLoading } = useComments(code, announcementId)

    if (isLoading) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <>
            <Box sx={{ borderTop: 1, borderColor: 'black' }}>
                {comments.length > 0 && <h3>Comments</h3>}
                {comments.map(comment => <Comment key={comment.id} comment={comment} announcementId={announcementId} />)}
            </Box>

            <CreateComment announcementId={announcementId} />
        </>)

}

export default CommentSection
