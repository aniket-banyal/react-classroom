import { LinearProgress, Typography } from "@mui/material"
import { useParams } from "react-router-dom"
import useComments from "../../hooks/api/useComments"
import Comment from "./Comment"
import CreateComment from "./CreateComment"
import { Stack } from "@mui/material"
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

function CommentSection({ announcementId }) {
    const { code } = useParams()
    const { data: comments, isLoading } = useComments(code, announcementId)


    return (
        <>
            {isLoading ? <LinearProgress />
                :
                <>
                    {comments.length > 0 &&
                        <Stack
                            direction='row'
                            spacing={1}
                            sx={{ pt: 1, pl: 2 }}
                        >
                            <PeopleOutlineIcon />

                            <Typography variant="subtitle1">
                                Comments
                            </Typography>
                        </Stack>
                    }

                    <Stack spacing={1}>
                        {comments.map(comment =>
                            <Comment
                                key={comment.id}
                                comment={comment}
                                announcementId={announcementId}
                            />
                        )}
                    </Stack>
                    <CreateComment announcementId={announcementId} />
                </>
            }
        </>
    )
}

export default CommentSection
