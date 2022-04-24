import { useQuery } from "react-query";
import { api } from "../../api";


const getSubmission = async ({ queryKey }) => {
    const [, code, assignmentId] = queryKey
    const { data } = await api.get(`/classes/${code}/assignments/${assignmentId}/student_submission`)
    return data
}

export default function useStudentSubmission(code, assignmentId) {
    return useQuery(['studentSubmission', code, assignmentId], getSubmission)
}
