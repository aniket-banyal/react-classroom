import { useEffect, useState } from "react"


export default function useGetWeekWiseAssignmentsToReview(data, accordionLabels) {
    const [weekWiseAssignments, setWeekWiseAssignments] = useState({})

    useEffect(() => {
        const weekWiseAssignments = {}
        accordionLabels.forEach(accordionLabel => {
            weekWiseAssignments[accordionLabel] = []
        })

        const now = new Date()
        data.forEach(data => {
            const assignmentDueDate = new Date(data.assignment.due_date_time)

            if (now.getTime() < assignmentDueDate.getTime())
                weekWiseAssignments[accordionLabels[0]].push(data)

            else
                weekWiseAssignments[accordionLabels[1]].push(data)
        })

        setWeekWiseAssignments(weekWiseAssignments)

    }, [data, accordionLabels])

    return weekWiseAssignments
}