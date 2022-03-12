import { useMutation, useQueryClient } from "react-query";
import { api } from "../../api/api";


const removeStudent = async ({ code, id }) => {
    const { data } = await api.delete(`/classes/${code}/students/${id}`)
    return data
}


export default function useRemoveStudent() {
    const queryClient = useQueryClient()

    return useMutation(removeStudent, {
        onSuccess: (data, { code }) => {
            queryClient.invalidateQueries(['students', code])
        }
    })
}
