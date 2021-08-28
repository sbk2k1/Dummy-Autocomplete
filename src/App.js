import './App.css';
import axios from 'axios';
import {useEffect, useState} from 'react';
import './custom.css'

function App() {
  const [text, setText] = useState('')
  const [user, setuser] = useState([])
  const [suggestions, setSuggestions] = useState([])
  useEffect(() => {
    const loadUser = async () => {
      const response= await axios.get('https://reqres.in/api/users');
      setuser(response.data.data)
    }
    loadUser();
  },[])

  const onSuggestHandler = (text) =>{
    setText(text);
    setSuggestions([])
  }

  const onChangeHandler = (text) => {
    let matches= []
    if(text.length>0){
      matches=user.filter(user => {
        const regex= new RegExp(`${text}`, "gi")
        return user.email.match(regex)
      })
    }
    setSuggestions(matches)
    setText(text)
  }

  return (
    <div className="container">
      <input type="text" className="col-md-12" style={{ marginTop: '10px' }} onChange={ e => onChangeHandler(e.target.value)} value={text} onBlur={() => {
        setTimeout(() => {
          setSuggestions([])
        }, 100);
      }}/>
    
      {suggestions && suggestions.map((suggestion, i) => 
      <div key={i}  className="suggestion col-md-12 justify-content-md-center" onClick={() => onSuggestHandler(suggestion.email)}>{suggestion.email}</div>
      )}
    
    </div>
    
  );
}

export default App;
