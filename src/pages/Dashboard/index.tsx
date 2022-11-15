import { useState } from "react";

import { useFood } from "../../hooks/useFood";

import { CardFood } from "../../components/CardFood";
import { Header } from "../../components/Header";
import { ModalAddFood } from "../../components/ModalAddFood";
import { ModalEditFood } from "../../components/ModalEditFood";

import { FoodsContainer } from "./styles";

export const Dashboard = () => {
  const { foods, handleUpdateFood, handleDeleteFood } = useFood();

  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);

  const handleOpenAddModal = () => {
    setOpenAddModal(!openAddModal)
  }
  
  const handleOpenEditModal = () => {
    setOpenEditModal(!openEditModal)
  }

  return (
    <>
      <Header 
        handleOpenAddModal={handleOpenAddModal}
      />
      <ModalAddFood
        isOpen={openAddModal}
        handleOpenAddModal={handleOpenAddModal}
      />
      <ModalEditFood
        isOpen={openEditModal}
        handleOpenEditModal={handleOpenEditModal}
        // editingFood={'editingFood'}
      />
      <FoodsContainer data-testid="foods-list">
        {foods && foods.map((food) => (
          <CardFood
            key={food.id}
            food={food}
            handleDelete={handleDeleteFood}
            handleEditFood={handleUpdateFood}
          />
        ))}
      </FoodsContainer>
    </>
  );
};
