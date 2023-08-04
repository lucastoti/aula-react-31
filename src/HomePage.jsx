import React, { useState, useEffect } from 'react';
import { Button, ProgressBar, ListGroup } from 'react-bootstrap';
import './HomePage.css';

// import ListGroup from 'react-bootstrap/ListGroup';
// import Button from 'react-bootstrap/Button';
// import ProgressBar from 'react-bootstrap/ProgressBar';

const App = () => {
  const [tutoriais, setTutoriais] = useState([]);
  const [id, setId] = useState(null);
  const [tutorial, setTutorial] = useState(null);

  // Formulário para criar um tutorial
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState(null);
  const [publicado, setPublicado] = useState(false);

  const [novaDescricao, setNovaDescricao] = useState(null);

  useEffect(() => {
    console.log('vai executar em qualquer evento da tela');
    // requisição, click de um botao que tem alguma ação, mudança no input
  });

  useEffect(() => {
    trazerLista();
  }, []); // só vai ser executado no primeiro load da página (carregar a primeira vez)

  useEffect(() => {
    console.log('titulo mudou');
  }, [titulo]); // vai ser executado sempre que a variável mudar de valor

  const trazerLista = () => {
    fetch('https://dummyjson.com/products')
    .then(data => data.json()) 
    .then(resposta => {
      setTutoriais(resposta.products);
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
    .then(response => trazerLista())
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

  const deletarPorID = () => {
    const URL = 'http://localhost:9000/api/tutorials/' + id;
    fetch(URL, {
      method: "DELETE"
    })
    .then(data => data.json()) 
    .then(response => trazerLista())
    .catch(err => console.log(err));
  };

  const atualizarPorID = () => {
    const URL = 'http://localhost:9000/api/tutorials/' + id;
    const atualizarTutorial = {
      description: novaDescricao
    };
    fetch(URL, {
      method: "PUT", // PATCH
      body: JSON.stringify(atualizarTutorial),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(data => data.json()) 
    .then(response => trazerLista())
    .catch(err => console.log(err));
  };
  // GET, POST, PUT/PATCH, DELETE

  // for ou map

  return (
    <div style={{padding: '30px'}}>
      {/*{JSON.stringify(tutoriais)}*/}
      <ListGroup>
        {
          tutoriais.length ? 
            tutoriais.map(tutorial => {
              return <ListGroup.Item key={tutorial.id}>{tutorial.id} - {tutorial.title} - {tutorial.description}</ListGroup.Item>
            })
          : <div></div>
        }
      </ListGroup>
{/*      <div>
        <button
          className="botao-azul"
          onClick={trazerLista}
        >
          Trazer a lista de tutoriais
        </button>
        {tutoriais !== null ? JSON.stringify(tutoriais) : 'Variável vazia' }
      </div>
      <br />----------------<br />
      <div>
        <span className="titulo">Buscar por ID</span>
        <input type="number" onChange={(e) => setId(e.target.value)} />
        <button onClick={buscarPorID}>Buscar</button><br/>
        {tutorial !== null ? tutorial.title : 'Variável vazia' }
      </div>*/}
      <br />----------------<br />
      <div>
        <span>Titulo</span>
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
      <br />----------------<br />
      <div>
        Deletar por ID
        <input type="number" onChange={(e) => setId(e.target.value)} />
        <button onClick={deletarPorID}>Deletar</button><br/>
      </div>
      <br />----------------<br />
           <br />----------------<br />
      <div>
        Atualizar por ID
        <input type="number" onChange={(e) => setId(e.target.value)} /><br />
        Nova descrição:<input type="text" onChange={(e) => setNovaDescricao(e.target.value)} />
        <button onClick={atualizarPorID}>Atualizar</button><br/>
      </div>
      <br />----------------<br />
      <br /><br /><br /><br /><br /><br /><br />
    </div>
  );
};

export default App;
