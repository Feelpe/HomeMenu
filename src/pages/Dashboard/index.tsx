import { useState } from 'react';

import Header from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';

interface Food {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

interface UpdateProductAmount {
  productId: number;
  food: Food;
}

// interface Foods {
//   food: Food[];
//   handleAddFood: (food: Food) => Promise<void>;
//   removeProduct: (productId: number) => void;
//   updateProductAmount: ({ productId, food }: UpdateProductAmount) => void;
// }

export const Dashboard = () => {
  const [ food, setFood ] = useState<Food[]>([]);

  const [ addModal, setAddModal ] = useState<Boolean>(Boolean);
  const [ editModal, setEditModal ] = useState<Boolean>(Boolean);

  const componentDidMount = async () => {
    const response = await api.get('/foods');

    setFood(response.data);
  }

  const handleAddFood = async (food: Food) => {
    try {
      const savedFoods = [...foods];
      const response = await api.post('/foods', {
        ...savedFoods,
        available: true,
      });

      const newFood = {...response.data};
      savedFoods.push(newFood);
      
      setFood(savedFoods);
    } catch (err) {
      console.log(err);
    }
  }

  const handleUpdateFood = async ({ productId, foods }: UpdateProductAmount) => {
    try {
      const updatedFood = [...food];

      const foodUpdated = await api.put(
        `/foods/${productId}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      const newFood = {...response.data};
      savedFoods.push(newFood);
      
      setFood(savedFoods);
    } catch (err) {
      console.log(err);
    }
  }

  handleDeleteFood = async id => {
    const { foods } = this.state;

    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    this.setState({ foods: foodsFiltered });
  }

  toggleModal = () => {
    const { modalOpen } = this.state;

    this.setState({ modalOpen: !modalOpen });
  }

  toggleEditModal = () => {
    const { editModalOpen } = this.state;

    this.setState({ editModalOpen: !editModalOpen });
  }

  handleEditFood = food => {
    this.setState({ editingFood: food, editModalOpen: true });
  }

  return (
    <>
      <Header openModal={this.toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={this.toggleModal}
        handleAddFood={this.handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={this.toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={this.handleUpdateFood}
      />
      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={this.handleDeleteFood}
              handleEditFood={this.handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
}
