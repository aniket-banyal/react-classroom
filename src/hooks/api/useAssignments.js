import { useQuery } from "react-query";
import { api } from "../../api";


const getAssignments = async ({ queryKey }) => {
    const [, code] = queryKey
    const { data } = await api.get(`/classes/${code}/assignments`)
    return data
}

export default function useAssignments(code) {
    return useQuery(['assignments', code], getAssignments)
}
