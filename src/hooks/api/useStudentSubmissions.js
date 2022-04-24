import { useQuery } from "react-query";
import { api } from "../../api";


const getStudentSubmissions = async ({ queryKey }) => {
    const [, code, studentId] = queryKey
    const { data } = await api.get(`classes/${code}/student_submissions/${studentId}`)
    return data
}


export default function useStudentSubmissions(code, studentId) {
    return useQuery(['student_submission', code, studentId], getStudentSubmissions)
}
