import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import api from "../services/api";

export interface Food {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

type InputFood = Omit<Food, 'id'>; 

interface FoodContextData {
  foods: Food[];
  editingFood: Food;
  openAddModal: boolean;
  handleOpenAddModal: () => void;
  openEditModal: boolean;
  handleOpenEditModal: (food: Food) => void;
  handleAddFood: (food: InputFood) => Promise<void>;
  handleUpdateFood: (food: Food) => void;
  toggleAvailable: (food: Food) => void;
  handleDeleteFood: (id: number) => void;
}

interface FoodProviderProps {
  children: ReactNode;
}

const FoodContext = createContext<FoodContextData>({} as FoodContextData);

export function FoodProvider({ children }: FoodProviderProps) {
  const [ foods, setFoods ] = useState<Food[]>([]);

  const [editingFood, setEditingFood] = useState({} as Food);

  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);

  const handleOpenAddModal = () => {
    setOpenAddModal(!openAddModal)
  }
  
  const handleOpenEditModal = (food: Food) => {
    setEditingFood(food)
    setOpenEditModal(!openEditModal);
  }

  useEffect(() => {
    api.get('/foods').then(response => setFoods(response.data))
  })
    
  const handleAddFood = async (food: InputFood) => {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      const { foodsAdd } = response.data;
        
      setFoods([
        ...foods,
        foodsAdd
      ]);
    } catch (err) {
      console.log(err);
    }
  }
  
  const handleUpdateFood = async (food: Food) => {
    try {  
      const response = await api.put(`/foods/${food.id}`, {
        ...food,
      })
    
      const { foodsUpdated } = response.data;
      
      setFoods([
        ...foods,
        foodsUpdated
      ]);
    } catch (err) {
      console.log(err);
    }
  }

  const toggleAvailable = async (food: Food) => {
    await api.put(`/foods/${food.id}`, {
      ...food,
      available: !food.available,
    });
  };
  
  const handleDeleteFood = async (id: number) => {
    const response = await api.delete(`/foods/${id}`);

    const { foodsDeleted } = response.data;
      
    setFoods([
      ...foods,
      foodsDeleted
    ]);
  }

  return(
    <FoodContext.Provider value={{ 
      foods,
      editingFood,
      openAddModal,
      handleOpenAddModal,
      openEditModal,
      handleOpenEditModal,
      handleAddFood, 
      handleUpdateFood,
      toggleAvailable, 
      handleDeleteFood
    }}>
      {children}
    </FoodContext.Provider>
  )
};

export function useFood() {
  const context = useContext(FoodContext);

  return context;
}