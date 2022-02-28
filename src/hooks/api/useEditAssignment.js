import { useMutation, useQueryClient } from "react-query";
import { api } from "../../api/api";


const editAssignment = async ({ code, assignmentId, body }) => {
    const { data } = await api.put(`/classes/${code}/assignments/${assignmentId}`, { ...body })
    return data
}


export default function useEditAssignment() {
    const queryClient = useQueryClient()

    return useMutation(editAssignment, {
        onSuccess: (data, { code }) => {
            queryClient.invalidateQueries(['assignments', code])
        }
    })
}
