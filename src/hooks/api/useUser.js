import { useQuery } from "react-query";
import { api } from "../../api/api";


const getUser = async () => {
    const { data } = await api.get(`/user_details`)
    return data
}


export default function useUser() {
    return useQuery(['user'], getUser, {
        staleTime: Infinity,
        cacheTime: Infinity,
    })
}
