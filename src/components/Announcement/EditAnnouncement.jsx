import { useState } from "react"
import { useParams } from "react-router-dom"
import useEditAnnouncement from "../../hooks/api/useEditAnnouncement"
import BasicDialog from "../BasicDialog"


function EditAnnouncement({ announcement, onSubmit, open, setOpen }) {
    const [text, setText] = useState(announcement.text)
    const { code } = useParams()
    const { mutate } = useEditAnnouncement()

    const handleSubmit = () => {
        const body = { text }
        mutate({ code, announcement_id: announcement.id, body }, {
            onSuccess: () => {
                setText('')
                onSubmit()
            }
        })
    }

    return (
        <BasicDialog
            open={open}
            setOpen={setOpen}
            title='Edit Announcement'
            action={{ name: 'Save', run: handleSubmit }}
        >
            <textarea
                rows={10}
                cols={50}
                value={text}
                required
                onChange={e => setText(e.target.value)}
            />
        </BasicDialog>
    )

}

export default EditAnnouncement
