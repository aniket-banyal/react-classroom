import { useEffect, useState } from "react"
import { getDateAndTimeInLocale } from "../helpers/dateTime"

export default function useCreateDateTime(_createdAt) {
    const [createEditDateTime, setCreateEditDateTime] = useState('')

    useEffect(() => {
        if (!_createdAt) {
            setCreateEditDateTime('')
            return
        }

        const createdAt = new Date(_createdAt)
        const [createdDate, createdTime] = getDateAndTimeInLocale(createdAt)
        setCreateEditDateTime(`${createdDate} - ${createdTime}`)
    }, [_createdAt])

    return createEditDateTime
}
