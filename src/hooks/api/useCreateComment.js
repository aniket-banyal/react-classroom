import { useMutation, useQueryClient } from "react-query";
import { api } from "../../api";


const createComment = async ({ code, announcementId, body }) => {
    const { data } = await api.post(`/classes/${code}/announcements/${announcementId}/comments`, { ...body })
    return data
}


export default function useCreateComment() {
    const queryClient = useQueryClient()

    return useMutation(createComment, {
        onSuccess: (data, { code, announcementId }) => {
            queryClient.invalidateQueries(['comments', code, announcementId])
        }
    })
}
