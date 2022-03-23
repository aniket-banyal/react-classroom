import { useMutation, useQueryClient } from "react-query";
import { api } from "../../api/api";


const editAssignment = async ({ code, assignmentId, body }) => {
    return api.put(`/classes/${code}/assignments/${assignmentId}`, { ...body })
}


export default function useEditAssignment() {
    const queryClient = useQueryClient()

    return useMutation(editAssignment, {
        onSuccess: (data, { code, assignmentId }) => {
            queryClient.invalidateQueries(['assignments', code])
            queryClient.invalidateQueries(['assignments', code, assignmentId])
        }
    })
}
