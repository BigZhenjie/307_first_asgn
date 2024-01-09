import { useState } from 'react';
import './App.css';
import Table from './Table';
import MyForm from './MyForm';

function App() {
  const [characters, setCharacters] = useState([]);

  function updateList(person) {
    setCharacters([...characters, person]);
  }

  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i !== index;
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
