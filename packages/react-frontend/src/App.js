import { useState } from 'react';
import './App.css';
import Table from './Table';

function App() {
  const [characters, setCharacters] = useState([
    {
      name: "Charlie",
      job: "Janitor"
    } // the rest of the data
  ]);

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
    </div>
  );
}

export default App;
