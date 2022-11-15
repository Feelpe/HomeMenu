import { FiCheckSquare } from 'react-icons/fi';

import { useFood } from '../../hooks/useFood';

import { Input } from '../Input';
import { Modal } from '../Modal';
import { Form } from './styles';

interface ModalProps{
  isOpen: boolean;
  handleOpenEditModal: () => void;
  // editingFood: Food;
}

export const ModalEditFood = ({
  isOpen,
  handleOpenEditModal,
  // editingFood
}: ModalProps) => {
  const { handleUpdateFood } = useFood();
  
  return (
    <Modal isOpen={isOpen} setIsOpen={handleOpenEditModal}>
      <Form 
        onSubmit={handleUpdateFood} 
        // initialData={editingFood}
      >
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />
        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />
        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}
