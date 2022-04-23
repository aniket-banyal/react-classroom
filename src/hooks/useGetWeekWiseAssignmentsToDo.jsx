import { useEffect, useState } from "react"
import { endOfWeek } from 'date-fns';


export default function useGetWeekWiseAssignmentsToDo(assignments, accordionLabels) {
    const [weekWiseAssignments, setWeekWiseAssignments] = useState({})

    useEffect(() => {
        const now = new Date()
        const endOfThisWeek = endOfWeek(now, { weekStartsOn: 1 })
        const endOfNextWeek = new Date(endOfThisWeek.getTime())
        endOfNextWeek.setDate(endOfNextWeek.getDate() + 7)

        const weekWiseAssignments = {}
        accordionLabels.forEach(accordionLabel => {
            weekWiseAssignments[accordionLabel] = []
        })

        assignments.forEach(assignment => {
            const assignmentDueDate = new Date(assignment.due_date_time)

            if (assignmentDueDate.getTime() < endOfThisWeek)
                weekWiseAssignments[accordionLabels[0]].push(assignment)

            else if (assignmentDueDate.getTime() < endOfNextWeek)
                weekWiseAssignments[accordionLabels[1]].push(assignment)

            else
                weekWiseAssignments[accordionLabels[2]].push(assignment)
        })

        setWeekWiseAssignments(weekWiseAssignments)

    }, [assignments, accordionLabels])

    return weekWiseAssignments
}