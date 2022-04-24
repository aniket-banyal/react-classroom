import { Card, CardContent, Grid, Stack, Typography } from "@mui/material"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import Login from "./Login"

function LoginPage() {
    const navigate = useNavigate()
    const { isAuth } = useAuth()

    useEffect(() => {
        if (isAuth)
            navigate('/')
    }, [isAuth])

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
        >
            <Grid item>
                <Card
                    sx={{ minHeight: 200 }}
                >
                    <CardContent>
                        {!isAuth &&
                            <Stack spacing={12} alignItems='space-between'>
                                <Typography variant='h5'>
                                    Login to Classroom
                                </Typography>

                                <Login />
                            </Stack>
                        }
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default LoginPage
