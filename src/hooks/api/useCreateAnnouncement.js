import { useMutation } from "react-query";
import { api } from "../../api/api";


const createAnnouncement = async ({ code, body }) => {
    const { data } = await api.post(`/classes/${code}/announcements`, { ...body })
    return data
}


export default function useCreateAnnouncement() {
    return useMutation(createAnnouncement)
}
