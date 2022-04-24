import { useMutation, useQueryClient } from "react-query";
import { api } from "../../api";


const deleteAnnouncement = async ({ code, announcementId }) => {
    const { data } = await api.delete(`/classes/${code}/announcements/${announcementId}`)
    return data
}


export default function useDeleteAnnouncement() {
    const queryClient = useQueryClient()

    return useMutation(deleteAnnouncement, {
        onSuccess: (data, { code }) => {
            queryClient.invalidateQueries(['announcements', code])
        }
    })
}
