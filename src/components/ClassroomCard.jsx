import { Link } from "react-router-dom"

function ClassCard({ classroom }) {
    return (
        <div style={{ border: '1px solid black', marginTop: 10 }} >
            <Link to={`classes/${classroom.code}`}>
                <h3>{classroom.name}</h3>
                <p>Subject: {classroom.subject}</p>
                <p>Code: {classroom.code}</p>
            </ Link>
        </div>
    )
}

export default ClassCard
