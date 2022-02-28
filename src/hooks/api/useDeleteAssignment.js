import { useMutation, useQueryClient } from "react-query";
import { api } from "../../api/api";


const deleteAssignment = async ({ code, assignmentId }) => {
    const { data } = await api.delete(`/classes/${code}/assignments/${assignmentId}`)
    return data
}


export default function useDeleteAssignment() {
    const queryClient = useQueryClient()

    return useMutation(deleteAssignment, {
        onSuccess: (data, { code }) => {
            queryClient.invalidateQueries(['assignments', code])
        }
    })
}
