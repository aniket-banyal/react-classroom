import { useQuery } from "react-query";
import { api } from "../../api/api";


const getAssignment = async ({ queryKey }) => {
    const [, code, assignmentId] = queryKey
    const { data } = await api.get(`/classes/${code}/assignments/${assignmentId}`)
    return data
}

export default function useAssignment(code, assignmentId) {
    return useQuery(['assignment', code, assignmentId], getAssignment)
}
