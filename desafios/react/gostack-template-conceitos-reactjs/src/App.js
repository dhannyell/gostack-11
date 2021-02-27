import React, {useState, useEffect} from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const techList = ["C#", "Java", "Javascript", "Dart", 
  "GO", "Rust", "C++", "Python", "Lua", "C"];
  
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(...repositories, response.data)
    });  
  }, []);

  async function handleAddRepository() {

    function getRandonTech(){
      return techList[Math.floor(Math.random()* techList.length)]
    }

    const response = await api.post('repositories', {
      title: `Repositorio ${Date.now()}`,
      url: "https://github.com/dhannyell",
      techs: [getRandonTech(), getRandonTech()],
    })

    //console.log(response.data)
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {

    const response = await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repository => repository.id !== id));

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
