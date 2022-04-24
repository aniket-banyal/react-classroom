import { useMutation, useQueryClient } from "react-query";
import { api } from "../../api";


const deleteClassroom = async ({ code }) => {
    const { data } = await api.delete(`/classes/${code}`)
    return data
}


export default function useDeleteClassroom() {
    const queryClient = useQueryClient()

    return useMutation(deleteClassroom, {
        onSuccess: () => {
            queryClient.invalidateQueries(['classrooms'])
        }
    })
}
