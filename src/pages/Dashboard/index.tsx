import { Component } from 'react';
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { api } from '../../services/api';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';

interface FoodProps {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;  
}

export function Dashboard() {

  const [modalOpen, setModalOpen] = useState<Boolean>(false);
  const [editingFood, setEditingFood] = useState<FoodProps>({} as FoodProps);
  const [foods, setFoods] = useState<FoodProps[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);


  useEffect(() => {

    api.get<FoodProps[]>('/foods')
    .then(response => {
      setFoods(response.data);
    });

  }, [])


  async function handleAddFood(food: FoodProps){
    try {
      
      const res: FoodProps = {...food, available: true};

      const response = await api.post<FoodProps>('/foods', {
        ...res,
      });
      const newFoods = [...foods, response.data];
      setFoods(newFoods);


    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(food: FoodProps) {

 
    try {
      const foodUpdated = await api.put<FoodProps>(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );
      

   const newFoods = foods.map(f => { return f.id === editingFood.id ? f = foodUpdated.data  : f });
   setFoods(newFoods);


    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteFood (id: FoodProps["id"]) {


    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);


    setFoods(foodsFiltered);
  }

  function toggleModal(){


    setModalOpen(!modalOpen);
  }

  function toggleEditModal(){

    setEditModalOpen(!editModalOpen);

  }

  function handleEditFood(food: FoodProps) {

    setEditingFood(food);
    toggleEditModal();

  }



  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );

};

export default Dashboard;
