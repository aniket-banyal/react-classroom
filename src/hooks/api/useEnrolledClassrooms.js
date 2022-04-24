import { useQuery } from "react-query";
import { api } from "../../api";


const getEnrolledClassrooms = async () => {
    const { data } = await api.get('/classes_enrolled')
    return data
}

export default function useEnrolledClassrooms() {
    return useQuery('enrolledClassrooms', getEnrolledClassrooms)
}