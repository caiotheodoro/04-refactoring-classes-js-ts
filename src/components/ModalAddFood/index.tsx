import { Component, createRef, useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import React, { useState } from 'react';
import { Form } from './styles';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { FoodProps } from '../../pages/Dashboard/index'

interface ModalAddFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (food: FoodProps) => void;
}


export function ModalAddFood({ setIsOpen, isOpen, handleAddFood }: ModalAddFoodProps) {

  const formRef = useRef(null);


  function handleSubmit(data: FoodProps) {

    handleAddFood(data);
    setIsOpen();
  };


  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );

};
