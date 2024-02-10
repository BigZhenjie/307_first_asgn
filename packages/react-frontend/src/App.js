import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Table from './Table';
import MyForm from './MyForm';

function App() {
  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
  }, []);

  const [characters, setCharacters] = useState([]);

  function fetchUsers(){
    axios.get('http://localhost:8000/users')
    .then(res => {
      console.log(res.data);
      setCharacters(res.data);
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
        console.log(character._id);
        axios.delete(`http://localhost:8000/users/${character._id}`);
        return false;
      }
    });
    setCharacters(updated);
  }

  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  function updateList(person) {
    postUser(person)
      .then(() => setCharacters([...characters, person]))
      .catch((error) => {
        console.log(error);
      })
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
