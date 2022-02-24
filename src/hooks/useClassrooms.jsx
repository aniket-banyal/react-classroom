import { useContext } from "react";
import { ClassroomsContext } from "../context/ClassroomsContext";

const useClassrooms = () => {
    return useContext(ClassroomsContext)
}

export default useClassrooms
