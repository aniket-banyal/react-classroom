import { useEffect, useState } from "react"
import { getDateAndTimeInLocale } from "../helpers/dateTime"

export default function useCreateEditDateTime(_createdAt, _editedAt) {
    const [createEditDateTime, setCreateEditDateTime] = useState('')

    useEffect(() => {
        if (!_createdAt) {
            setCreateEditDateTime('')
            return
        }

        const createdAt = new Date(_createdAt)
        const editedAt = new Date(_editedAt)

        const [createdDate, createdTime] = getDateAndTimeInLocale(createdAt)

        if (!_editedAt || (createdAt.getTime() === editedAt.getTime())) {
            setCreateEditDateTime(`${createdDate} - ${createdTime}`)
        }
        else {
            const [editedDate, editedTime] = getDateAndTimeInLocale(editedAt)
            setCreateEditDateTime(`${createdDate} - ${createdTime} (Edited ${editedDate} - ${editedTime})`)
        }
    }, [_createdAt, _editedAt])

    return createEditDateTime
}
