import { useQuery } from "react-query";
import { api } from "../../api";


const getClassrooms = async () => {
    const { data } = await api.get('/classes')
    return data
}

export default function useClassrooms() {
    return useQuery('classrooms', getClassrooms)
}