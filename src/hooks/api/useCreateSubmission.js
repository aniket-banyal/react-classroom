import { useMutation, useQueryClient } from "react-query";
import { api } from "../../api";


const createSubmission = async ({ code, assignmentId, body }) => {
    const { data } = await api.post(`/classes/${code}/assignments/${assignmentId}/submissions`, { ...body })
    return data
}


export default function useCreateSubmission() {
    const queryClient = useQueryClient()

    return useMutation(createSubmission, {
        onSuccess: (data, { code, assignmentId }) => {
            queryClient.invalidateQueries(['studentSubmission', code, assignmentId])
        }
    })
}
