import { useMutation, useQueryClient } from "react-query";
import { api } from "../../api";


const editClassroom = async ({ code, body }) => {
    const { data } = await api.put(`/classes/${code}`, { ...body })
    return data
}


export default function useEditClassroom() {
    const queryClient = useQueryClient()

    return useMutation(editClassroom, {
        onSuccess: (data, { code }) => {
            queryClient.invalidateQueries(['classrooms'])
            queryClient.invalidateQueries(['classrooms', code])
        }
    })
}
