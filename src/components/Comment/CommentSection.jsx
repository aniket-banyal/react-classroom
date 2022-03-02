import { Grid, Typography } from "@mui/material"
import { useParams } from "react-router-dom"
import useComments from "../../hooks/api/useComments"
import Comment from "./Comment"
import CreateComment from "./CreateComment"
import { Stack } from "@mui/material"
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

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
            {comments.length > 0 &&
                <Grid
                    container
                    spacing={1}
                    sx={{ pl: 2 }}
                >
                    <Grid item>
                        <PeopleOutlineIcon />
                    </Grid>

                    <Grid item>
                        <Typography variant="subtitle1">
                            Comments
                        </Typography>
                    </Grid>
                </Grid>
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
        </>)

}

export default CommentSection
