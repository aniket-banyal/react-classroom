import { Button } from "@mui/material"
import { useEffect, useState } from "react"
import useRemoveStudent from "../../hooks/api/useRemoveStudent"
import useUser from "../../hooks/useUser"
import { useParams } from "react-router-dom"


function Student({ student }) {
    const [contextMenu, setContextMenu] = useState({
        allowRemove: false
    })
    const { user } = useUser()
    const { code } = useParams()
    const { mutate } = useRemoveStudent()

    const onRemove = () => {
        mutate({ code, email: student.email })
    }

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
            {contextMenu.allowRemove && <Button onClick={onRemove}> Remove </Button>}
        </div>
    )
}

export default Student
