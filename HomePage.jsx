import React, { useState } from 'react';

const App = () => {
  const [tutoriais, setTutoriais] = useState(null);
  const [id, setId] = useState(null);
  const [tutorial, setTutorial] = useState(null);

  // Formulário para criar um tutorial
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState(null);
  const [publicado, setPublicado] = useState(false);

  const trazerLista = () => {
    fetch('http://localhost:9000/api/tutorials')
    .then(data => data.json()) 
    .then(resposta => {
      setTutoriais(resposta);
    })
    .catch(err => console.log('Erro de solicitação', err));
  };

  const criarTutorial = () => {
    const parametros = {
      title: titulo,
      description: descricao,
      published: publicado
    };

    fetch('http://localhost:9000/api/tutorials', {
      method: "POST",
      body: JSON.stringify(parametros),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(data => data.json()) 
    .then(response => console.log(response))
    .catch(err => console.log(err));

  };

  const buscarPorID = () => {
    const URL = 'http://localhost:9000/api/tutorials/' + id;
    fetch(URL)
    .then(data => data.json()) 
    .then(resposta => {
      if (resposta.title) {
        setTutorial(resposta);
      } else {
        alert(resposta.message)
      }
    })
    .catch(err => console.log('Erro de solicitação', err));
  };

  // GET e POST
  // buscar lista, buscar para um unico tutorial, criar tutorial

  // pendente: deletar tutorial, atualizar tutorial

  return (
    <div>
      <div>
        <button onClick={trazerLista}>Trazer a lista de tutoriais</button>
        {tutoriais !== null ? JSON.stringify(tutoriais) : 'Variável vazia' }
      </div>
      <br />----------------<br />
      <div>
        Buscar por ID
        <input type="number" onChange={(e) => setId(e.target.value)} />
        <button onClick={buscarPorID}>Buscar</button><br/>
        {tutorial !== null ? tutorial.title : 'Variável vazia' }
      </div>
      <br />----------------<br />
      <div>
        Titulo
        <input type="text" onChange={(e) => setTitulo(e.target.value)} />
      </div>
      <div>
        Descrição
        <input type="text" onChange={(e) => setDescricao(e.target.value)} />
      </div>
      <div>
        Publicado
        <input type="checkbox" onClick={(e) => setPublicado(e.target.checked)} />
      </div>
      <div>
        <button onClick={criarTutorial}>Criar</button>
      </div>
    </div>
  );
};

export default App;
