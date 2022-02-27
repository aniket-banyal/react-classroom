import { useMutation, useQueryClient } from "react-query";
import { api } from "../../api/api";


const deleteComment = async ({ code, announcementId, commentId }) => {
    const { data } = await api.delete(`/classes/${code}/announcements/${announcementId}/comments/${commentId}`)
    return data
}


export default function useDeleteComment() {
    const queryClient = useQueryClient()

    return useMutation(deleteComment, {
        onSuccess: (data, { code, announcementId }) => {
            queryClient.invalidateQueries(['comments', code, announcementId])
        }
    })
}
