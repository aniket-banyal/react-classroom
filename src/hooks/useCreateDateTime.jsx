import { useEffect, useState } from "react"
import { getDateAndTimeInLocale } from "../helpers/dateTime"

export default function useCreateDateTime(_createdAt) {
    const createdAt = new Date(_createdAt)
    const [createEditDateTime, setCreateEditDateTime] = useState('')

    useEffect(() => {
        const [createdDate, createdTime] = getDateAndTimeInLocale(createdAt)
        setCreateEditDateTime(`${createdDate} - ${createdTime}`)
    }, [_createdAt])

    return createEditDateTime
}
