import { useQuery } from "react-query";
import { api } from "../../api";


const getAllAssignmentsToDo = async () => {
    const { data } = await api.get(`all_assignments_to_do`)
    return data
}

export default function useAllAssignmentsToDo() {
    return useQuery(['allAssignmentsToDo'], getAllAssignmentsToDo)
}
