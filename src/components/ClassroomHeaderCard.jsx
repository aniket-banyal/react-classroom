import { Card, CardContent } from "@mui/material"
import { Typography } from '@mui/material';


function ClassroomHeaderCard({ classroom }) {
    return (
        <Card
            sx={{ mb: 2 }}
        >
            <CardContent>
                <Typography variant="h4" color='primary'>
                    {classroom.name}
                </Typography>

                <Typography variant='h6' gutterBottom>
                    Subject: {classroom.subject}
                </Typography>

                <Typography variant='subtitle2'>
                    Teacher: {classroom.teacher.name}
                </Typography>

                <Typography variant='subtitle2'>
                    Code: {classroom.code}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default ClassroomHeaderCard
