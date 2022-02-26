import { Button } from "@mui/material"
import { useEffect, useState } from "react"
import useUser from "../../hooks/useUser"

function Student({ student, onRemove }) {
    const [contextMenu, setContextMenu] = useState({
        allowRemove: false
    })
    const { user } = useUser()

    useEffect(() => {
        setContextMenu(
            {
                allowRemove: user.role === 'teacher',
            }
        )
    }, [user.role])


    return (
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            {<p> {student.name} </p>}
            {contextMenu.allowRemove && <Button onClick={() => onRemove(student.email)}> Remove </Button>}
        </div>
    )
}

export default Student
