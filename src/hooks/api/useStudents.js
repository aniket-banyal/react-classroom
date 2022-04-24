import { useQuery } from "react-query";
import { api } from "../../api";


const getStudents = async ({ queryKey }) => {
    const [, code] = queryKey
    const { data } = await api.get(`/classes/${code}/students`)
    return data
}

export function useStudents(code, select) {
    return useQuery(['students', code], getStudents, { select })
}

export function useStudentsCount(code) {
    return useStudents(code, (students) => students.length)
}
