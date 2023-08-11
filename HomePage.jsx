import React, { useState, useEffect } from 'react';
import './HomePage.css';
import { Button, Col, Form, InputGroup, Row, ListGroup, Modal } from 'react-bootstrap';
import { ListaProdutos } from './components/listaProdutos';

const App = () => {
  const [produtos, setProdutos] = useState([]);
  const [showAdicionar, setShowAdicionar] = useState(false);
  const [state, setState] = useState({title: '', description: ''});
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    trazerLista();
  }, []);

  const trazerLista = () => {
    fetch('https://dummyjson.com/products')
    .then(data => data.json()) 
    .then(resposta => {
      setProdutos(resposta.products);
    })
    .catch(err => console.log('Erro de solicitação', err));
  };

  const adicionarProduto = () => {
    setShowAdicionar(true);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity()) { // caso de sucesso
      setProdutos(anterior => {
        let produtosAntigos = anterior;
        produtosAntigos.push({ id: produtos.length + 1, title: state.title, description: state.description });
        return produtosAntigos;
      });
      setShowAdicionar(false);
    }
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
  };

  const handleChange = e => {
    setState(anterior => { 
      return { 
        ...anterior,
        [e.target.name]: e.target.value 
      } 
    });
  };

  const buscarProduto = e => {
    fetch(`https://dummyjson.com/products/search?q=${e.target.value}`)
    .then(data => data.json()) 
    .then(resposta => {
      setProdutos(resposta.products);
    })
    .catch(err => console.log('Erro de solicitação', err));
  };

  return (
    <div style={{padding: '30px'}}>
        <Button onClick={adicionarProduto}>+ Produto</Button>
        <InputGroup className="mb-3 pt-3">
          <InputGroup.Text id="basic-addon1">Buscar</InputGroup.Text>
          <Form.Control
            placeholder="Nome"
            aria-label="nome"
            aria-describedby="basic-addon1"
            onChange={(e) => buscarProduto(e)}
          />
        </InputGroup>

      {
        produtos.length ? <ListaProdutos lista={produtos} /> : <></>
      }

      <Modal show={showAdicionar} onHide={() => setShowAdicionar(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Produto</Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Titulo</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  name="title"
                  type="text"
                  placeholder="Titulo"
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Campo obrigatório.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group className="pt-3">
              <Form.Label>Descrição</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  name="description"
                  type="text"
                  placeholder="Descrição"
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Campo obrigatório.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
              <Button variant="primary" type="submit">Criar</Button>
              <Button variant="secondary" onClick={() => setShowAdicionar(false)}>Cancelar</Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <div className="pt-5"></div>
    </div>
  );
};

export default App;
