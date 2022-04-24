import { Typography } from "@mui/material"

const statusColorMapping = {
    'Assigned': 'white',
    'Done': '#6fbf73',
    'Submitted Late': '#6fbf73',
    'Missing': '#f44336',
    'Graded': 'white',
}

function SubmissionStatus({ status, variant = 'subtitle1' }) {

    return (
        <Typography
            variant={variant}
            color={statusColorMapping[status]}
        >
            {status}
        </Typography>

    )
}

export default SubmissionStatus
