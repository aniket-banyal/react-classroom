import { LoadingButton } from '@mui/lab';
import { Button, Stack, Typography } from "@mui/material";
import BasicModal from './BasicModal';

function ConfirmationModal({ open, setOpen, title, body, onConfirm, isLoading }) {

    const handleSubmit = e => {
        e.preventDefault()
        onConfirm()
    }


    return (
        <BasicModal
            open={open}
            setOpen={setOpen}
            title={title}
            fullWidth={false}
        >
            <Stack spacing={2}>
                <Typography>
                    {body}
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Stack
                        direction='row'
                        spacing={2}
                        justifyContent='flex-end'
                    >
                        <LoadingButton
                            type="submit"
                            loadingIndicator="Deleting..."
                            loading={isLoading}
                            size='small'
                        >
                            Yes
                        </LoadingButton >

                        <Button
                            onClick={() => setOpen(false)}
                            color="secondary"
                            size='small'
                        >
                            Cancel
                        </Button>
                    </Stack>
                </form>
            </Stack>
        </BasicModal>
    )
}

export default ConfirmationModal
