import { useParams } from "react-router-dom"
import { useAssignment } from "../../hooks/api/useAssignment"
import useEditAssignment from "../../hooks/api/useEditAssignment"
import EditAssignmentForm from "./EditAssignmentForm"


function EditAssignment({ assignmentId, onSubmit, onError }) {
    const { code } = useParams()
    const { mutate } = useEditAssignment()
    const { data: assignment, isLoading } = useAssignment(code, assignmentId)


    const handleSubmit = (e, newAssignment) => {
        e.preventDefault()
        newAssignment.due_date_time = new Date(newAssignment.due_date_time).getTime()

        const body = {
            title: newAssignment.title,
            text: newAssignment.text,
            due_date_time: newAssignment.due_date_time,
            points: newAssignment.points
        }

        mutate({ code, assignmentId, body }, {
            onSuccess: () => {
                onSubmit()
            },
            onError: (error) => {
                onError(error)
            }
        })
    }


    if (isLoading) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <>
            {assignment ?
                <EditAssignmentForm
                    initialAssignment={assignment}
                    handleSubmit={handleSubmit}
                /> :
                null
            }
        </>
    )
}

export default EditAssignment
