import NotFound from "./NotFound"


function Page404() {
    return (
        <NotFound
            msg='404'
            redirectLink={'/'}
            redirectMsg='Back to Home'
        />
    )
}

export default Page404
