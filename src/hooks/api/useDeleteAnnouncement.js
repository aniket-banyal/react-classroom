import { useMutation, useQueryClient } from "react-query";
import { api } from "../../api/api";


const deleteAnnouncement = async ({ code, announcement_id }) => {
    const { data } = await api.delete(`/classes/${code}/announcements/${announcement_id}`)
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
