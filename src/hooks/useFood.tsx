import { useState } from "react";

import api from "../services/api";

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
  foods: Food[];
}

interface Foods {
  food: Food[];
  handleAddFood: (food: Food) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, food }: UpdateProductAmount) => void;
}

const useFood = () => {
  const [ foods, setFoods ] = useState<Food[]>([]);
  
  const [ addModal, setAddModal ] = useState<Boolean>(Boolean);
  const [ editModal, setEditModal ] = useState<Boolean>(Boolean);
  
  // const componentDidMount = async () => {
  //   const response = await api.get('/foods');
  
  //   setFoods(response.data);
  // }
  
  // const handleAddFood = async (food: Food) => {
  //   try {
  //     const savedFoods = [...foods];
  //     const response = await api.post('/foods', {
  //       ...savedFoods,
  //       available: true,
  //     });
  
  //     const newFood = {...response.data};
  //     savedFoods.push(newFood);
      
  //     setFoods(savedFoods);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  
  // const handleUpdateFood = async ({ productId, foods }: UpdateProductAmount) => {
  //   try {
  //     const updatedFood = [...foods];
  
  //     const foodUpdated = await api.put(`/foods/${productId}`)
  //     .then(console.log(response))
  
  //     const foodsUpdated = foods.map(f =>
  //       f.id !== foodUpdated.data.id ? f : foodUpdated.data,
  //     );
  
  //     const newFood = {...response.data};
  //     savedFoods.push(newFood);
      
  //     setFood(savedFoods);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  
  // handleDeleteFood = async id => {
  //   const { foods } = this.state;
  
  //   await api.delete(`/foods/${id}`);
  
  //   const foodsFiltered = foods.filter(food => food.id !== id);
  
  //   this.setState({ foods: foodsFiltered });
  // }  
};
