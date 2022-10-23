import { useEffect, useState } from "react";

import api from "../../services/api";

import { Header } from "../../components/Header";
import { CardFood } from "../../components/CardFood";
import { ModalAddFood } from "../../components/ModalAddFood";
// import { ModalEditFood } from "../../components/ModalEditFood";

import { FoodsContainer } from "./styles";

interface Food {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

export const Dashboard = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [openAddModal, setOpenAddModal] = useState<Boolean>(false);
  // const [modalEdit, setModalEdit] = useState<Boolean>(false);

  const handleOpenAddModal = () => {
    setOpenAddModal(!openAddModal)
  }

  useEffect(() => {
    const getFoods = async () => {
      const response = await api.get('/foods');
    
      setFoods(response.data);
    }

    getFoods();
  }, [])

  return (
    <>
      <Header 
        handleOpenAddModal={handleOpenAddModal}
      />
      <ModalAddFood
        isOpen={openAddModal}
        handleOpenAddModal={handleOpenAddModal}
      />
      {/* <ModalEditFood
        isOpen={'editModalOpen'}
        setIsOpen={'this.toggleEditModal'}
        editingFood={'editingFood'}
        handleUpdateFood={'this.handleUpdateFood'}
      /> */}
      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map((food) => (
            <CardFood
              key={food.id}
              food={food}
              // handleDelete={'this.handleDeleteFood'}
              // handleEditFood={'this.handleEditFood'}
            />
          ))}
      </FoodsContainer>
    </>
  );
};
