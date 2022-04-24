import { useQuery } from "react-query";
import { api } from "../../api";


const getTeachingClassrooms = async () => {
    const { data } = await api.get('/classes_teaching')
    return data
}

export default function useTeachingClassrooms() {
    return useQuery('teachingClassrooms', getTeachingClassrooms)
}