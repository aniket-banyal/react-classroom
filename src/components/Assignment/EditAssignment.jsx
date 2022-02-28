import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import useEditAssignment from "../../hooks/api/useEditAssignment"
import BaseDateTimePicker from "../BasicDateTimePicker"

const initialAssignment = {
    title: '',
    text: '',
    points: '',
    dueDateTime: new Date()
}

function EditAssignment({ assignmentId, onSubmit, onError }) {
    const { code } = useParams()
    const [assignment, setAssignment] = useState(initialAssignment)
    const { mutate } = useEditAssignment()

    useEffect(() => {
        const fetchAssignment = async () => {
            const options = {
                method: 'GET',
                headers: new Headers({
                    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                    'content-Type': 'application/json',
                }),
            }

            const response = await fetch(`http://localhost:8000/api/classes/${code}/assignments/${assignmentId}`, options)
            if (!response.ok) {
                // setError(true)
                return
            }
            const data = await response.json()
            setAssignment({
                title: data.title,
                text: data.text,
                dueDateTime: data.due_date_time,
                points: data.points
            })
        }

        fetchAssignment()
    }, [code, assignmentId])


    const handleSubmit = e => {
        e.preventDefault()
        assignment.dueDateTime = new Date(assignment.dueDateTime).getTime()

        const body = {
            title: assignment.title,
            text: assignment.text,
            due_date_time: assignment.dueDateTime,
            points: assignment.points
        }

        mutate({ code, assignmentId, body }, {
            onSuccess: () => {
                setAssignment(initialAssignment)
                onSubmit()
            },
            onError: (error) => {
                onError(error)
            }
        })
    }


    return (
        <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <input
                        type="text"
                        placeholder="Title"
                        required
                        value={assignment.title}
                        onChange={e => setAssignment({
                            ...assignment,
                            title: e.target.value,
                        })}
                    />
                    <textarea
                        rows={10}
                        cols={50}
                        placeholder="New Assignment"
                        required
                        value={assignment.text}
                        onChange={e => setAssignment({
                            ...assignment,
                            text: e.target.value,
                        })}
                    />
                    <input
                        type="number"
                        placeholder='Points'
                        required
                        min={0}
                        value={assignment.points}
                        onChange={e => setAssignment({
                            ...assignment,
                            points: e.target.value,
                        })}
                    />
                </div>
                <div>
                    <BaseDateTimePicker
                        value={assignment.dueDateTime}
                        onChange={value => setAssignment({
                            ...assignment,
                            dueDateTime: value,
                        })}
                    />
                </div>
            </div>
            <input type="submit" value='Save' />
        </form>
    )

}

export default EditAssignment
