import { Card, CardActionArea, CardContent, Typography } from "@mui/material"
import { Link } from "react-router-dom"

function ClassCard({ classroom }) {
    return (
        <Card>
            <CardActionArea component={Link} to={`${classroom.code}/dashboard`} >
                <CardContent>
                    <Typography variant="h4">
                        {classroom.name}
                    </Typography>

                    <Typography variant="subtitle1">
                        Subject: {classroom.subject}
                    </Typography>

                    <Typography variant="subtitle2">
                        Teacher: {classroom.teacher.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default ClassCard
