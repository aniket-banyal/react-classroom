import { useMutation, useQueryClient } from "react-query";
import { api } from "../../api";


const createAnnouncement = async ({ code, body }) => {
    const { data } = await api.post(`/classes/${code}/announcements/`, { ...body })
    return data
}


export default function useCreateAnnouncement() {
    const queryClient = useQueryClient()

    return useMutation(createAnnouncement, {
        onSuccess: (data, { code }) => {
            queryClient.invalidateQueries(['announcements', code])
        }
    })
}
