import React, { useState } from 'react';
import { ListGroup, Modal, Button } from 'react-bootstrap';

export const ListaProdutos = (props) => {
	const [showDetalhes, setShowDetalhes] = useState(false);
	const [showDeletar, setShowDeletar] = useState(false);
	const [linhaSelecionada, setLinhaSelecionada] = useState({});
	const [lista, setLista] = useState(props.lista);

	const mostrarModalDetalhes = (produto) => {
		setLinhaSelecionada(produto);
		setShowDetalhes(true);
	};

		const mostrarModalDeletar = (produto) => {
		setLinhaSelecionada(produto);
		setShowDeletar(true);
	}; 

	const deletarPorId = () => {
		fetch(`https://dummyjson.com/products/${linhaSelecionada.id}`,{
		 	method: 'DELETE'
		 })
    .then(data => data.json()) 
    .then(resposta => {
			setLista(listaAnterior => {
				return listaAnterior.filter(produto => produto.id !== linhaSelecionada.id);
			});
    })
    .catch(err => console.log('Erro de solicitação', err));
    setShowDeletar(false);
	};

	return (
		<>
			<ListGroup>
	    	{
	    		lista.map(produto => {
	    			return (
	    			<div style={{display: 'flex', margin: '5px 0'}}>
	    				<ListGroup.Item 
	    					key={produto.id}
	    					action
	    					onClick={() => mostrarModalDetalhes(produto)}
	  					>
	  					   	{produto.title}
  					  </ListGroup.Item>
  					  &nbsp;
  					  <Button
  					  	variant="danger" 
  					  	onClick={() => mostrarModalDeletar(produto)}
  					  >Deletar</Button>
	    			</div>
	    			);
	    		})
	    	}
	    </ListGroup>
	    <Modal show={showDetalhes} onHide={() => setShowDetalhes(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{linhaSelecionada.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{linhaSelecionada.description}</Modal.Body>
	    </Modal>

	   	<Modal show={showDeletar} onHide={() => setShowDeletar(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Deletar Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>Você realmente deseja excluir esse produto?</Modal.Body>
	    	<Modal.Footer>
	    	  <Button variant="primary" onClick={() => deletarPorId()}>Confirmar</Button>
          <Button variant="secondary" onClick={() => setShowDeletar(false)}>Cancelar</Button>
        </Modal.Footer>
	    </Modal>
		</>
	);
};
