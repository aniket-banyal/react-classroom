import { useEffect, useState } from "react"
import { getDateAndTimeInLocale } from "../helpers/dateTime"

const BUFFER_TIME = 60 * 1000 //1 minute

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

        if (!_editedAt || (editedAt.getTime() - createdAt.getTime() < BUFFER_TIME)) {
            setCreateEditDateTime(`${createdDate} - ${createdTime}`)
        }
        else {
            const [editedDate, editedTime] = getDateAndTimeInLocale(editedAt)
            setCreateEditDateTime(`${createdDate} - ${createdTime} (Edited ${editedDate} - ${editedTime})`)
        }
    }, [_createdAt, _editedAt])

    return createEditDateTime
}
