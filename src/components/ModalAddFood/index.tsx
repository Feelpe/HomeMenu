import { Component, createRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { InputHTMLAttributes } from 'react';

import { Form } from './styles';
import { Modal } from '../Modal';
import { Input } from '../Input';

interface ModalProps{
  isOpen: Boolean;
  handleOpenAddModal: () => void;
}

export const ModalAddFood = ({ 
  isOpen, 
  handleOpenAddModal,
  
}: ModalProps) => {
  // handleSubmit = async data => {
  //   const { setIsOpen, handleAddFood } = this.props;

  //   handleAddFood(data);
  //   setIsOpen();
  // };

  return (
    <Modal isOpen={isOpen} setIsOpen={() => handleOpenAddModal()}>
      {/* <Form ref={this.formRef} onSubmit={this.handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />
        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />
        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form> */}
    </Modal>
  );
}
