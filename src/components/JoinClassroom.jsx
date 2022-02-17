import { Button } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import SimpleSnackbar from "./SimpleSnackbar"

function JoinClassroom() {
    const [code, setCode] = useState('')
    const [isAlreadyJoined, setIsAlreadyJoined] = useState(false)
    const [isInvalidCode, setIsInvalidCode] = useState(false)
    const [action, setAction] = useState()
    const navigate = useNavigate()

    const joinClassroom = async (code) => {
        const options = {
            method: 'POST',
            headers: new Headers({
                Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                'content-Type': 'application/json',
            }),
            body: JSON.stringify({ code })
        }

        const response = await fetch('http://localhost:8000/api/join_class', options)
        if (response.status == 409) {
            setIsAlreadyJoined(true)
            setAction((
                <Link to={`/classes/${code}`}>
                    <Button color="primary">
                        Go to Class
                    </Button>
                </Link>
            ))
            return
        }

        if (!response.ok) {
            // setIsInvalidCode is set to false in SimpleSnackbar when it is dismissed
            setIsInvalidCode(true)
            return
        }

        navigate(`/classes/${code}`)
    }


    const handleSubmit = e => {
        e.preventDefault()
        joinClassroom(code)
        setCode('')
    }

    return (
        <>
            <SimpleSnackbar
                message='You are already part of this classroom'
                open={isAlreadyJoined}
                setOpen={setIsAlreadyJoined}
                action={action}
            />
            <SimpleSnackbar
                message='Invalid Classroom Code'
                open={isInvalidCode}
                setOpen={setIsInvalidCode}
            />

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='Classroom code'
                    value={code}
                    required
                    onChange={e => setCode(e.target.value)}
                />
                <input type='submit' value="Join Classroom" />
            </form>
        </>
    )
}


export default JoinClassroom
