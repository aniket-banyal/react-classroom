import { useQuery } from "react-query";
import { api } from "../../api";


const getStudent = async ({ queryKey }) => {
    const [, code, studentId] = queryKey
    const { data } = await api.get(`/classes/${code}/students/${studentId}`)
    return data
}

export default function useStudent(code, studentId) {
    return useQuery(['student', code, studentId], getStudent)
}
