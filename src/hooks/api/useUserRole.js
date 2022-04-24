import { useQuery } from "react-query";
import { api } from "../../api";


const getUserRole = async ({ queryKey }) => {
    const [, code] = queryKey
    const { data } = await api.get(`/classes/${code}/user_role`)
    return data.role
}


export default function useUserRole(code) {
    return useQuery(['userRole', code], getUserRole, {
        staleTime: Infinity,
        cacheTime: Infinity,
    })
}
