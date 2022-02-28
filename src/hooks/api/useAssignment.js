import { useQuery } from "react-query";
import { api } from "../../api/api";


const getAssignment = async ({ queryKey }) => {
    const [, code, assignmentId] = queryKey
    const { data } = await api.get(`/classes/${code}/assignments/${assignmentId}`)
    return data
}

export function useAssignment(code, assignmentId, select) {
    return useQuery(['assignment', code, assignmentId], getAssignment, { select })
}

export function useAssignmentPoints(code, assignmentId) {
    return useAssignment(code, assignmentId, (data) => data.points)
}