import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"

const statuses = [
    'All',
    'Graded',
    'Done',
    'Submitted Late',
    'Missing',
    'Assigned'
]

function SubmissionStatusSelect({ value, onChange }) {

    return (
        <FormControl fullWidth>
            <InputLabel id="select-label">Status</InputLabel>
            <Select
                labelId="select-label"
                value={value}
                label="Status"
                onChange={(e) => onChange(e.target.value)}
            >
                {statuses.map(status =>
                    <MenuItem key={status} value={status}> {status} </MenuItem>
                )}
            </Select>
        </FormControl>
    )
}


export default SubmissionStatusSelect
