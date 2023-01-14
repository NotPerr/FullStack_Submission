import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  //--------------- states declaration ---------------
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter,setFilter] = useState('')
  const [hasFilter,setHasFilter] = useState(false)
  

  //--------------- handle input name change  ---------------
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  //--------------- handle input number change  ---------------
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  //--------------- handle filter change  ---------------
  const handleFilterChange = (event) => {
    
    setFilter(event.target.value)
    console.log(filter)
    
  }

  //--------------- submit filter  ---------------
  const addFilter = (event) => {
    event.preventDefault()
    let search = filter
    if(!search)
    {
      console.log('has filter!')
      setHasFilter(true)
    }else if (search){
      setHasFilter(false)
    }
  }
  
  //--------------- set show phonebook  ---------------
  const showPhoneBook = hasFilter
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter))

  //--------------- add new contact when submit ---------------
  const addContact = (event) => {
    event.preventDefault()
    // console.log('add contact',event.target)
    const exist = persons.findIndex(person => person.name === newName)
    if(exist === -1)
    {
      const newContact = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(newContact))
      setNewName('')
      setNewNumber('')
    }else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter addFilter={addFilter} filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>add a new contact</h2>
      <PersonForm addContact={addContact} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber}
        handleNumberChange={handleNumberChange}  
      />
      <h2>Numbers</h2>
      <Persons showPhoneBook={showPhoneBook}/>
    </div>
  )
}

export default App
