import { useFood } from "../../hooks/useFood";

import { CardFood } from "../../components/CardFood";
import { Header } from "../../components/Header";
import { ModalAddFood } from "../../components/ModalAddFood";
import { ModalEditFood } from "../../components/ModalEditFood";

import { FoodsContainer } from "./styles";

export const Dashboard = () => {
  const { 
    foods,
    editingFood,
    openAddModal,
    handleOpenAddModal, 
    openEditModal,
    handleOpenEditModal
  } = useFood();

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
        food={editingFood}
        isOpen={openEditModal}
        handleOpenEditModal={() => handleOpenEditModal(editingFood)}
      />
      <FoodsContainer data-testid="foods-list">
        {foods && foods.map((food) => (
          <CardFood
            key={food.id}
            food={food}
            handleOpenEditModal={() => handleOpenEditModal(food)}
          />
        ))}
      </FoodsContainer>
    </>
  );
};
