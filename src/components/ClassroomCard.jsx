function ClassCard({ classroom }) {
    return (
        <div style={{ border: '1px solid black', marginBottom: 10 }} >
            <h3>{classroom.name}</h3>
            <p>{classroom.subject}</p>
        </div>
    )
}

export default ClassCard
