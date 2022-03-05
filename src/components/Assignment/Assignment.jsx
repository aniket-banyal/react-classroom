import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useUserRole from "../../hooks/api/useUserRole";
import BasicModal from "../BasicModal";
import EditAssignment from "./EditAssignment";
import useCreateEditDateTime from "../../hooks/useCreateEditDateTime";
import useCreateDateTime from "../../hooks/useCreateDateTime";
import useDeleteAssignment from "../../hooks/api/useDeleteAssignment";


function Assignment({ assignment }) {
    const [editing, setEditing] = useState(false)
    const [contextMenu, setContextMenu] = useState({
        allowEdit: false,
        allowDelete: false
    })
    const { code } = useParams()
    const { data: userRole } = useUserRole(code)
    const createdDateTime = useCreateEditDateTime(assignment.created_at, assignment.edited_at)
    const dueDateTime = useCreateDateTime(assignment.due_date_time)
    const { mutate } = useDeleteAssignment()


    useEffect(() => {
        setContextMenu(
            {
                allowEdit: userRole === 'teacher',
                allowDelete: userRole === 'teacher'
            }
        )
    }, [userRole])


    const onEdit = () => setEditing(false)

    const onDelete = () => {
        mutate({ code, assignmentId: assignment.id })
    }


    return (
        <>
            <BasicModal
                open={editing}
                setOpen={setEditing}
                title='Edit Assignment'
            >
                <span>
                    <EditAssignment assignmentId={assignment.id} onSubmit={onEdit} />
                </span>
            </BasicModal>

            <Card>
                <CardContent>
                    <Box style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <Box style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }} >
                            <Box>
                                <Typography variant="h5" gutterBottom>{assignment.title}
                                </Typography>

                                <Typography variant="subtitle2">
                                    Posted at - {createdDateTime}
                                </Typography>

                                <Typography variant="subtitle2">
                                    Due date - {dueDateTime}
                                </Typography>
                            </Box>
                        </Box>

                        <Box style={{ display: 'flex', flexDirection: 'column' }}>
                            {contextMenu.allowEdit && <Button onClick={() => setEditing(true)}> Edit </Button>}

                            {contextMenu.allowDelete && <Button onClick={onDelete}> Delete </Button>}

                            <Link to={`/${code}/assignments/${assignment.id}`}>
                                <Button> Details </Button>
                            </Link>
                        </Box>

                    </Box>
                </CardContent>
            </Card>
        </>
    )
}

export default Assignment
