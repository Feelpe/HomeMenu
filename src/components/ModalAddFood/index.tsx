import { FiCheckSquare } from 'react-icons/fi';
import { useFood } from '../../hooks/useFood';

import { Input } from '../Input';
import { Modal } from '../Modal';
import { Form } from './styles';

interface ModalProps{
  isOpen: boolean;
  handleOpenAddModal: () => void;
}

export const ModalAddFood = ({ 
  isOpen, 
  handleOpenAddModal,
}: ModalProps) => {
  const { handleAddFood } = useFood();

  return (
    <Modal isOpen={isOpen} setIsOpen={() => handleOpenAddModal()}>
      <Form onSubmit={handleAddFood}>
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
      </Form>
    </Modal>
  );
}
