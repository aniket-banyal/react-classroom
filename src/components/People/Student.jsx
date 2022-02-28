import { Button } from "@mui/material"
import { useEffect, useState } from "react"
import useRemoveStudent from "../../hooks/api/useRemoveStudent"
import { useParams } from "react-router-dom"
import useUserRole from "../../hooks/api/useUserRole"


function Student({ student }) {
    const [contextMenu, setContextMenu] = useState({
        allowRemove: false
    })
    const { code } = useParams()
    const { data: userRole } = useUserRole(code)
    const { mutate } = useRemoveStudent()

    const onRemove = () => {
        mutate({ code, email: student.email })
    }

    useEffect(() => {
        setContextMenu(
            {
                allowRemove: userRole === 'teacher',
            }
        )
    }, [userRole])


    return (
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            {<p> {student.name} </p>}
            {contextMenu.allowRemove && <Button onClick={onRemove}> Remove </Button>}
        </div>
    )
}

export default Student
