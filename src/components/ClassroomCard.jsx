function ClassCard({ classroom }) {
    return (
        <div style={{ border: '1px solid black', marginBottom: 10 }} >
            <h3>{classroom.name}</h3>
            <p>Subject: {classroom.subject}</p>
            <p>Code: {classroom.code}</p>
            <ul>
                {classroom.students.map(student => <li key={student.email}>{student.first_name} {student.last_name} ({student.email})</li>)}
            </ul>
        </div>
    )
}

export default ClassCard
