import { useEffect } from "react"
import { Outlet, useParams } from "react-router-dom"
import useUser from "../hooks/useUser"
import BasicTabs from "./BasicTabs"


const tabs = [
    {
        label: 'Announcements',
        link: ''
    },
    {
        label: 'Assignment',
        link: 'assignments'
    },
    {
        label: 'Students',
        link: 'students'
    }
]


function Base() {
    const { code } = useParams()
    const { user, setUser } = useUser()

    useEffect(() => {
        const fetchUserRole = async () => {
            const options = {
                method: 'GET',
                headers: new Headers({
                    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                    'content-Type': 'application/json',
                }),
            }

            const response = await fetch(`http://localhost:8000/api/classes/${code}/user_role`, options)
            const data = await response.json()
            setUser({ ...user, role: data.role })
        }
        fetchUserRole()
    }, [code])


    return (
        <>
            <BasicTabs tabs={tabs} />
            <Outlet />
        </>
    )

}

export default Base
