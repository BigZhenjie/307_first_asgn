import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Table from './Table';
import MyForm from './MyForm';

function App() {
  const [characters, setCharacters] = useState([]);

  function fetchUsers(){
    axios.get('http://localhost:8000/users')
    .then(res => {
      setCharacters(res.data.users_list);
    })
    .catch(err => console.log(err));
  }
  function postUser(user){
    axios.post('http://localhost:8000/users', user)
    .then(res => {
      fetchUsers();
    })
    .catch(err => console.log(err));
  }

  useEffect(() => {
    fetchUsers();
  }, []);
  function updateList(person) {
    postUser(person);
  }

  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      if (i !== index) {
        return true;
      }
      else{
        axios.delete(`http://localhost:8000/users/${character.id}`);
        return false;
      }
    });
    setCharacters(updated);
  }

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <MyForm handleSubmit={updateList}/>
    </div>
  );
}

export default App;
