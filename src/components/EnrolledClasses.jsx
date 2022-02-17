import { Button } from "@mui/material"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import JoinClassroom from "./JoinClassroom"
import SimpleSnackbar from "./SimpleSnackbar"


function EnrolledClasses({ setClassrooms }) {
    const [newDataAvailable, setNewDataAvailable] = useState(true)
    const [isInvalidCode, setIsInvalidCode] = useState(false)
    const [isAlreadyJoined, setIsAlreadyJoined] = useState(false)
    const [action, setAction] = useState()

    useEffect(() => {
        const fetchClassroomList = async () => {
            const options = {
                method: 'GET',
                headers: new Headers({
                    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                    'content-Type': 'application/json',
                }),
            }

            const response = await fetch('http://localhost:8000/api/classes_enrolled', options)
            const data = await response.json()
            setClassrooms(data)
            setNewDataAvailable(false)
        }
        if (newDataAvailable)
            fetchClassroomList()
    }, [newDataAvailable])

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

        setNewDataAvailable(true)
    }


    return (
        <>
            <SimpleSnackbar
                message='Invalid Classroom Code'
                open={isInvalidCode}
                setOpen={setIsInvalidCode}
            />
            <SimpleSnackbar
                message='You are already part of this classroom'
                open={isAlreadyJoined}
                setOpen={setIsAlreadyJoined}
                action={action}
            />
            <JoinClassroom onSubmit={joinClassroom} />
        </>
    )
}


export default EnrolledClasses
