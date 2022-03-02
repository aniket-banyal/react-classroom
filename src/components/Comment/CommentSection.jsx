import { Button, LinearProgress, Typography } from "@mui/material"
import { useParams } from "react-router-dom"
import useComments from "../../hooks/api/useComments"
import Comment from "./Comment"
import CreateComment from "./CreateComment"
import { Stack } from "@mui/material"
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { useState } from "react"

function CommentSection({ announcementId }) {
    const { code } = useParams()
    const { data: comments, isLoading } = useComments(code, announcementId)
    const [collapsed, setCollapsed] = useState(true)


    return (
        <>
            {isLoading ? <LinearProgress />
                :
                <>
                    {comments.length > 0 &&
                        <Button
                            size='small'
                            onClick={() => setCollapsed(!collapsed)}
                            focusRipple={false}
                            sx={{ mt: 1, ml: 1, px: 1 }}
                        >
                            <Stack
                                direction='row'
                                spacing={1}
                            >
                                <PeopleOutlineIcon />

                                <Typography variant="subtitle1">
                                    Comments ({comments.length})
                                </Typography>
                            </Stack>
                        </Button>
                    }

                    {!collapsed &&
                        <Stack spacing={1}>
                            {comments.map(comment =>
                                <Comment
                                    key={comment.id}
                                    comment={comment}
                                    announcementId={announcementId}
                                />
                            )}
                        </Stack>
                    }

                    <CreateComment announcementId={announcementId} />
                </>
            }
        </>
    )
}

export default CommentSection
