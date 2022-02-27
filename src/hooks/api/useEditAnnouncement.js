import { useMutation, useQueryClient } from "react-query";
import { api } from "../../api/api";


const editAnnouncement = async ({ code, announcement_id, body }) => {
    const { data } = await api.put(`/classes/${code}/announcements/${announcement_id}`, { ...body })
    return data
}


export default function useEditAnnouncement() {
    const queryClient = useQueryClient()

    return useMutation(editAnnouncement, {
        onSuccess: (data, { code }) => {
            queryClient.invalidateQueries(['announcements', code])
        }
    })
}
