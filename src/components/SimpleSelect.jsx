import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"


function SimpleSelect({ label, options, value, onChange }) {

    return (
        <FormControl fullWidth>
            <InputLabel id="select-label">{label}</InputLabel>
            <Select
                labelId="select-label"
                value={value}
                label={label}
                onChange={(e) => onChange(e.target.value)}
            >
                {options.map(option =>
                    <MenuItem key={option} value={option}> {option} </MenuItem>
                )}
            </Select>
        </FormControl>
    )
}


export default SimpleSelect
