import { useNavigate } from "react-router-dom"
import { useState } from "react"
import useJoinClassroom from "../hooks/api/useJoinClassroom"
import { toast } from "react-toastify"

function JoinClassroom() {
    const [code, setCode] = useState('')
    const navigate = useNavigate()
    const { mutate } = useJoinClassroom()

    const notifyInvalidCode = () => toast("Invalid Classroom Code")

    const handleSubmit = e => {
        e.preventDefault()

        mutate(code, {
            onSuccess: (data) => {
                navigate(`${data.code}/dashboard`)
            },
            onError: (error) => {
                const status = error.response.status

                if (status === 409)
                    navigate(`/${code}/dashboard`)
                else if (status === 404)
                    notifyInvalidCode()
            }
        })
    }

    return (
        <>
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
