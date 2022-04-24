import { useQuery } from "react-query";
import { api } from "../../api";


const getAnnouncements = async (code) => {
    const { data } = await api.get(`/classes/${code}/announcements`)
    return data
}

export default function useAnnouncements(code) {
    return useQuery(['announcements', code], () => getAnnouncements(code))
}