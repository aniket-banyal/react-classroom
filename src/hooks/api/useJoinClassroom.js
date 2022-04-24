import { useMutation } from "react-query";
import { api } from "../../api";


const joinClassroom = async (code) => {
    const { data } = await api.post('/join_class', { code })
    return data
}


export default function useJoinClassroom() {
    return useMutation(joinClassroom)
}
