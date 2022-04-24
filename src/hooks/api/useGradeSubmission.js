import { useMutation, useQueryClient } from "react-query";
import { api } from "../../api";


const gradeSubmission = async ({ code, assignmentId, submissionId, body }) => {
    const { data } = await api.patch(`/classes/${code}/assignments/${assignmentId}/submissions/${submissionId}`, { ...body })
    return data
}


export default function useGradeSubmission() {
    const queryClient = useQueryClient()

    return useMutation(gradeSubmission, {
        onSuccess: (data, { code, assignmentId }) => {
            queryClient.invalidateQueries(['submissions', code, assignmentId])
        }
    })
}
