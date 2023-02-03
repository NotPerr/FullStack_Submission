import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

  // ---------------- fetch countries data ---------------- 
  const [list,setList] = useState([])
  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setList(response.data)
      })
  }, [])
  // ---------------- set search value ---------------- 
  const [search,setSearch] = useState('')
  const [hasSearch,setHasSearch] = useState(false)

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    console.log(search)
    let filter = search
    if(!filter) {
      
      setHasSearch(true)
    }else {
      setHasSearch(false)
    }
    console.log('has search:',hasSearch)
  }
  const addSearch = (event) => {
    event.preventDefault()
  }
  
  // ---------------- set show list ---------------- 
 
  const List = () => {
    let filter = search.toLowerCase()
    const setShowList = () => {
      if(filter)
      {
        const newList = list.filter((country) => country.name.common.toLowerCase().includes(filter))
        //console.log(newList)
        return newList
      }else {
        return []
      }
      
    }
    const showList = setShowList()
    console.log('show list: ',showList)
     // ---------------- send detail content ----------------
     const [showDetail,setShowDetail] = useState(false)
     const [detail,setDetail] = useState({})
     const Detail = (country) => {
      setShowDetail(!showDetail)
      console.log('country:',country)
      const copy = country
      console.log('copy: ',copy)
      setDetail(copy)
      console.log('detail: ',detail)
     }
     // ---------------- show detail content ----------------
     const ShowDetail = (detail) => {
      console.log('show content: ',detail)
      console.log('detail.name.common:',detail.detail.name.common)
      const languages = Object.keys(detail.detail.languages)
      return (
        <div>
          <h1>{detail.detail.name.common}</h1>
          <p>capital: {detail.detail.capital}</p>
          <p>area: {detail.detail.area}</p>
          <h2>languages:</h2>
          <ul>
          {languages.map(lan => <li key={lan}>{detail.detail.languages[lan]}</li>)}
          </ul>
          <img src={detail.detail.flags.png}/>
        </div>
      )
        
     }
    // ---------------- set show detail ---------------- 
    // showList.map(c => {arr.push({country:c,show:false})})
    // console.log('arr: ',arr)
    // arr.map(a => {console.log('a: ',a)})
    // console.log('showDetail: ',showDetail)
    if(showList.length > 10)
    {
      return(<p>Too many matches, specify another filter</p>)
    }else if(showList.length <=10 && showList.length > 1){
      console.log('showDetail',showDetail)
      return (
       <>
         {showList.map(country => {
          return(
            <div key={country.name.common}>
              <p >{country.name.common} <button onClick={() => Detail(country)}>
                show
                </button>
              </p>
              
            </div>
            
          )
        } )}
        {showDetail?<ShowDetail detail={detail}/>:null}

       </>
        
      )
    }else if(showList.length === 1)
    {
      const languages = Object.keys(showList[0].languages)
      return (
        <>
          <h1>{showList[0].name.common}</h1>
          <p>capital: {showList[0].capital}</p>
          <p>area: {showList[0].area}</p>
          <h2>languages:</h2>
          <ul>
            {languages.map(lan => <li key={lan}>{showList[0].languages[lan]}</li>)}
          </ul>
          <img src={showList[0].flags.png}/>
        </>
      )
    }
    
  }

   


  return (
    <div>
      <form onSubmit={addSearch}>
        <div>
          <br />
          find countries: <input value={search} onChange={handleSearchChange}/>
        </div>
      </form>
      <List />
    </div>
  );
}

export default App;
