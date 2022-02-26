import { Button } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import SimpleSnackbar from "./SimpleSnackbar"
import { useMutation } from "react-query"
import { joinClassroom } from "../api/api"

function JoinClassroom() {
    const [code, setCode] = useState('')
    const [isAlreadyJoined, setIsAlreadyJoined] = useState(false)
    const [isInvalidCode, setIsInvalidCode] = useState(false)
    const [action, setAction] = useState()
    const navigate = useNavigate()
    const { mutate } = useMutation(joinClassroom)


    const handleSubmit = e => {
        e.preventDefault()

        mutate(code, {
            onSuccess: ({ data }) => {
                navigate(`${data.code}/dashboard`)
            },
            onError: (error) => {
                const status = error.response.status

                if (status === 409) {
                    setIsAlreadyJoined(true)
                    setAction((
                        <Link to={`/${code}/dashboard`}>
                            <Button color="primary">
                                Go to Class
                            </Button>
                        </Link>
                    ))
                }
                else if (status === 404) {
                    // setIsInvalidCode is set to false in SimpleSnackbar when it is dismissed
                    setIsInvalidCode(true)
                }
            }
        })
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
