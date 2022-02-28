import { useMutation, useQueryClient } from "react-query";
import { api } from "../../api/api";


const createAssignment = async ({ code, body }) => {
    const { data } = await api.post(`/classes/${code}/assignments`, { ...body })
    return data
}


export default function useCreateAssignment() {
    const queryClient = useQueryClient()

    return useMutation(createAssignment, {
        onSuccess: (data, { code }) => {
            queryClient.invalidateQueries(['assignments', code])
        }
    })
}
