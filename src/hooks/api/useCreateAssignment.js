import { useMutation, useQueryClient } from "react-query";
import { api } from "../../api";


const createAssignment = async ({ code, body }) => {
    return api.post(`/classes/${code}/assignments/`, { ...body })
}


export default function useCreateAssignment() {
    const queryClient = useQueryClient()

    return useMutation(createAssignment, {
        onSuccess: (data, { code }) => {
            queryClient.invalidateQueries(['assignments', code])
        }
    })
}
