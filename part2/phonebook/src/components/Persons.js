

const Persons = ({showPhoneBook,removeContact}) => {


    return (
        <>
          {showPhoneBook.map(person => {return (
                <div key={person.name}>
                    {person.name} {person.number} <button onClick={() => removeContact(person.id)}>delete</button>
                </div>
            )})}  
        </>
    )
}

export default Persons