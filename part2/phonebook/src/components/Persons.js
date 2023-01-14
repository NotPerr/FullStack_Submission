const Persons = ({showPhoneBook}) => {
    return (
        <>
            {showPhoneBook.map(person => {return (
                <div key={person.name}>
                    <p>{person.name} {person.number}</p>
                </div>
            )})}
        </>
    )
}

export default Persons