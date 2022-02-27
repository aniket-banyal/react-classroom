import { useMutation } from "react-query";
import { api } from "../../api/api";


const createClassroom = async (classroom) => {
    const { data } = await api.post('/classes_teaching', { ...classroom })
    return data
}


export default function useCreateClassroom() {
    return useMutation(createClassroom)
}
