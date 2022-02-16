import { useState } from "react"

function JoinClassroom({ onSubmit }) {
    const [code, setCode] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        onSubmit(code)
        setCode('')
    }

    return (
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
    )
}


export default JoinClassroom
