import { useQuery } from "react-query";
import { api } from "../../api/api";


const getAllAssignments = async () => {
    const { data } = await api.get(`all_assignments`)
    return data
}

export default function useAllAssignments() {
    return useQuery(['allAssignments'], getAllAssignments)
}
