import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []); // array vazio para executar apenas uma vez a função do useEffect

  async function handleAddDev(data) {
    const response = await api.post('/devs', data) 
    
    
    setDevs([...devs, response.data]) // pros devs serem adicionados e já aparecerem, pega todos os devs + o novo que for entrar, por isso o array.
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>
      <main>
        <ul> 
          {devs.map( dev => ( // parenteses porque é return, não o corpo da função (seria o mesmo que { return () }).
            <DevItem key={dev._id} dev={dev} />
         ))}
        </ul>
      </main>
    </div>
    
  );
}

export default App;

          
