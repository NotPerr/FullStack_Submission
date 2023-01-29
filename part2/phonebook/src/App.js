import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import bookService from './services/persons'

const App = () => {
  //--------------- states declaration ---------------
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter,setFilter] = useState('')
  const [hasFilter,setHasFilter] = useState(false)

  useEffect(() => {
    console.log('effect')
    bookService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'notes')
  

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
        number: newNumber
      }
      bookService
        .create(newContact)
        .then(response => {
          setPersons(persons.concat(newContact))
          setNewName('')
          setNewNumber('')
        })
      
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
