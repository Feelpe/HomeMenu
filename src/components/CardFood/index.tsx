import { FiEdit3, FiTrash } from "react-icons/fi";

import { Container } from "./styles";

import { useFood } from "../../hooks/useFood";

interface Food {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

interface FoodProps {
  food: Food; 
  handleOpenEditModal: () => void;
}

export const CardFood = ({ food, handleOpenEditModal }: FoodProps) => {
  const { handleDeleteFood, toggleAvailable } = useFood();

  return (
    <Container available={food.available}>
      <header>
        <img src={food.image} alt={food.name} />
      </header>
      <section className="body">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">
          R$ <b>{food.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={handleOpenEditModal}
            data-testid={`edit-food-${food.id}`}
          >
            <FiEdit3 size={20} />
          </button>
          <button
            type="button"
            className="icon"
            onClick={() => handleDeleteFood(food.id)}
            data-testid={`remove-food-${food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>
        <div className="availability-container">
          <p>{food.available ? "Disponível" : "Indisponível"}</p>
          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={food.available}
              onChange={() => toggleAvailable(food)}
              data-testid={`change-status-food-${food.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
};
