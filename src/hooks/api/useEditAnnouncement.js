import { useMutation, useQueryClient } from "react-query";
import { api } from "../../api";


const editAnnouncement = async ({ code, announcementId, body }) => {
    const { data } = await api.put(`/classes/${code}/announcements/${announcementId}`, { ...body })
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
