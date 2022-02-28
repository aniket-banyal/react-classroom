import { useQuery } from "react-query";
import { api } from "../../api/api";


const getStudents = async ({ queryKey }) => {
    const [, code] = queryKey
    const { data } = await api.get(`/classes/${code}/students`)
    return data
}

export default function useStudents(code) {
    return useQuery(['students', code], getStudents)
}
