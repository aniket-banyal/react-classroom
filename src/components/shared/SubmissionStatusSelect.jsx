import SimpleSelect from "./SimpleSelect"

const options = [
    'All',
    'Graded',
    'Turned In',
    'Missing',
    'Assigned'
]

function SubmissionStatusSelect({ value, onChange }) {

    return (
        <SimpleSelect
            label='Status'
            options={options}
            value={value}
            onChange={onChange}
        />
    )
}


export default SubmissionStatusSelect
