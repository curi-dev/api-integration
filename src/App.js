import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [ repositories, setRepository ] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      console.log(response);
      setRepository(response.data);
    })
  }, [])


  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Repository ${Date.now()}`,
      owner: "Tiago Lindgren Curi"
    });
    
    const newRepository = response.data;

    setRepository([...repositories, newRepository]);
  };

  
  async function handleRemoveRepository(id) {
    
    try {
      const response = await api.delete(`repositories/` + id);
      
      const newRepos = repositories.filter(repository => repository.id != id);

      setRepository(newRepos);


    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        
        {repositories.map(repository => {
          return (
            <li key={repository.id}>
              {repository.title}
              <small>{repository.id}</small>
              <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
              </button>
            </li>
            )
          }  
        )}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
