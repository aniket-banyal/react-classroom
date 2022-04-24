import { useMutation, useQueryClient } from "react-query";
import { api } from "../../api";


const unenrollStudent = async ({ code, id }) => {
    const { data } = await api.delete(`/classes/${code}/students/${id}`)
    return data
}


export default function useUnenrollStudent() {
    const queryClient = useQueryClient()

    return useMutation(unenrollStudent, {
        onSuccess: () => {
            queryClient.invalidateQueries(['classrooms'])
        }
    })
}
