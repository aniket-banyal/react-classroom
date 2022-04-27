import { useMutation } from "react-query";
import { api } from "../../api";


const joinClassroom = async (code) => {
    const { data } = await api.post(`/classes/${code}/students`)
    return data
}


export default function useJoinClassroom() {
    return useMutation(joinClassroom)
}
