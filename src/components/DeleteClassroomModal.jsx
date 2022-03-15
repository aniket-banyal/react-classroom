import useDeleteClassroom from "../hooks/api/useDeleteClassroom";
import { LoadingButton } from '@mui/lab';
import { Button, Stack, Typography } from "@mui/material";
import BasicModal from './BasicModal';

function DeleteClassroomModal({ open, setOpen, classroom }) {
    const { mutate, isLoading } = useDeleteClassroom()

    const onDelete = () => {
        mutate({ code: classroom.code })
    }

    const handleSubmit = e => {
        e.preventDefault()
        onDelete()
    }


    return (
        <BasicModal
            open={open}
            setOpen={setOpen}
            title={`Delete Classroom?`}
            fullWidth={false}
        >
            <Stack spacing={2}>
                <Typography>
                    {`You are deleting classroom ${classroom.name}`}
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Stack
                        direction='row'
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
                            No
                        </Button>
                    </Stack>
                </form>
            </Stack>
        </BasicModal>
    )
}

export default DeleteClassroomModal
