import { useQuery } from "react-query";
import { api } from "../../api/api";


const getUpcomingAssignment = async (code) => {
    const { data } = await api.get(`/classes/${code}/assignments?upcoming=true`)
    return data
}

export default function useUpcomingAssignment(code) {
    return useQuery(['assignments_upcoming', code], () => getUpcomingAssignment(code))
}