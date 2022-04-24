import { useQuery } from "react-query";
import { api } from "../../api";


const getSubmissions = async ({ queryKey }) => {
    const [, code, assignmentId] = queryKey
    const { data } = await api.get(`/classes/${code}/assignments/${assignmentId}/submissions`)
    return data
}

export default function useSubmissions(code, assignmentId) {
    return useQuery(['submissions', code, assignmentId], getSubmissions)
}
