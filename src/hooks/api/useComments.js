import { useQuery } from "react-query";
import { api } from "../../api/api";


const getComments = async ({ queryKey }) => {
    const [, code, announcementId] = queryKey
    const { data } = await api.get(`/classes/${code}/announcements/${announcementId}/comments`)
    return data
}

export default function useComments(code, announcementId) {
    return useQuery(['comments', code, announcementId], getComments)
}
