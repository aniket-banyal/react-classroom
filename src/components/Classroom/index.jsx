import { Link, useParams } from "react-router-dom";
import { Outlet } from "react-router-dom"
import BasicTabs from "../shared/BasicTabs"
import useClassroom from "../../hooks/api/useClassroom";
import { useEffect } from "react";
import CenteredCircularProgress from '../shared/CenteredCircularProgress'
import ClassroomHeaderCard from "./ClassroomHeaderCard";


const tabs = [
    {
        label: 'Announcements',
        link: ''
    },
    {
        label: 'Assignments',
        link: 'assignments'
    },
    {
        label: 'People',
        link: 'people'
    }
]


function Classroom() {
    const { code } = useParams()
    const { data: classroom, isLoading, isError } = useClassroom(code)

    useEffect(() => {
        //when going to some other class using sidebar, scroll state may remain same because the child components don't re-render if data comes from cache (react-query)
        window.scrollTo({ top: 0 })
    }, [classroom])


    if (isLoading) {
        return <CenteredCircularProgress />
    }

    if (isError)
        return (
            <div>
                <h1>Invalid class code</h1>
                <Link to='/'>Back to Classes</Link>
            </div>
        )

    return (
        <>
            <ClassroomHeaderCard classroom={classroom} />

            <BasicTabs tabs={tabs} />
            <Outlet />
        </>
    )
}

export default Classroom
