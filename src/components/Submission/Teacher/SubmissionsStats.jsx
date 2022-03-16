import { Paper, Stack, Typography } from "@mui/material"

const labels = ['Done', 'Graded', 'Missing']

function SubmissionsStats({ submissions }) {
    if (!submissions) {
        return null
    }

    const getNumberOfSubmissionsFromLabel = (label) => submissions.filter(submission => submission.status === label).length

    return (
        <Stack direction='row' spacing={4}>
            {labels.map(label =>
                <Stat
                    key={label}
                    number={getNumberOfSubmissionsFromLabel(label)}
                    label={label}
                />
            )}
        </Stack>
    )
}

export default SubmissionsStats


function Stat({ number, label }) {

    return (
        <Paper
            sx={{ p: 2 }}
        >
            <Typography variant='h4'>
                {number}
            </Typography>

            <Typography variant='subtitle2'>
                {label}
            </Typography>
        </Paper>
    )
}
