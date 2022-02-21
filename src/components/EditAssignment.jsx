import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BaseDateTimePicker from "./BasicDateTimePicker"


function EditAssignment({ onSubmit, assignment_id }) {
    const { code } = useParams()
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [dueDateTime, setDueDateTime] = useState(new Date())


    const getDueDate = (assignment) => {
        const dueDateTime = new Date(assignment.due_date_time)
        return dueDateTime.getTime()
    }


    useEffect(() => {
        const fetchAssignment = async () => {
            const options = {
                method: 'GET',
                headers: new Headers({
                    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                    'content-Type': 'application/json',
                }),
            }

            const response = await fetch(`http://localhost:8000/api/classes/${code}/assignments/${assignment_id}`, options)
            if (!response.ok) {
                // setError(true)
                return
            }
            const data = await response.json()
            setTitle(data.title)
            setText(data.text)
            setDueDateTime(getDueDate(data))
        }
        fetchAssignment()
    }, [code, assignment_id])


    const handleSubmit = e => {
        e.preventDefault()
        const due_date_time = new Date(dueDateTime).getTime()
        onSubmit(title, text, due_date_time)
        setText('')
        setTitle('')
        setDueDateTime(new Date())
    }


    return (
        <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <input
                        type="text"
                        value={title}
                        placeholder="Title"
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea
                        rows={10}
                        cols={50}
                        placeholder="New Assignment"
                        value={text}
                        required
                        onChange={e => setText(e.target.value)}
                    />
                </div>
                <div>
                    <BaseDateTimePicker
                        value={dueDateTime}
                        onChange={setDueDateTime}
                    />
                </div>
            </div>
            <input type="submit" value='Save' />
        </form>
    )

}

export default EditAssignment
