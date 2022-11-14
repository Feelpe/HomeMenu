import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import api from "../services/api";

interface Food {
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
  handleAddFood: (food: InputFood) => Promise<void>;
  handleUpdateFood: (id: number) => void;
  handleDeleteFood: (id: number) => void;
}

interface FoodProviderProps {
  children: ReactNode;
}

const FoodContext = createContext<FoodContextData>({} as FoodContextData);

export function FoodProvider({ children }: FoodProviderProps) {
  const [ foods, setFoods ] = useState<Food[]>([]);

  const [ addModal, setAddModal ] = useState<Boolean>(Boolean);
  const [ editModal, setEditModal ] = useState<Boolean>(Boolean);

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
  
  const handleUpdateFood = async (id: number) => {
    try {  
      const response = await api.put(`/foods/${id}`)
    
      const { foodsUpdated } = response.data;
      
      setFoods([
        ...foods,
        foodsUpdated
      ]);
    } catch (err) {
      console.log(err);
    }
  }
  
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
      handleAddFood, 
      handleUpdateFood, 
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