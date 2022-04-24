import { useQuery } from "react-query";
import { api } from "../../api";


const getAllToReview = async () => {
    const { data } = await api.get(`all_to_review`)
    return data
}

export default function useAllToReview() {
    return useQuery(['allToReview'], getAllToReview)
}
