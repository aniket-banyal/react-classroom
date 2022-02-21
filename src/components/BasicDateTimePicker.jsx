import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';


function BaseDateTimePicker({ value, onChange }) {

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Due Date Time"
                value={value}
                onChange={(newValue) => { onChange(newValue) }}
            />
        </LocalizationProvider>
    );
}


export default BaseDateTimePicker
