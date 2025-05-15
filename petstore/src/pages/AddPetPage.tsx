// AddPetPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addPet } from '../services/petService';
import { PetForm } from '../components/PetForm';
import { Pet } from '../types/Pet';
import { styled } from '@mui/system';

const MintContainer = styled('div')({
  backgroundColor: '#f0f7ff',
  minHeight: '100vh',
  padding: '2rem',
  borderRadius: '16px',
  boxShadow: '0 4px 12px rgba(100, 150, 200, 0.2)'
});

const Title = styled('h1')({
  color: '#3a6d84',
  fontFamily: '"Comic Sans MS", cursive, sans-serif',
  textAlign: 'center',
  marginBottom: '2rem',
  textShadow: '1px 1px 2px #c8d8e8'
});

export const AddPetPage = () => {
    const navigate = useNavigate();

    const handleSubmit = async (pet: Pet) => {
        try {
            await addPet(pet);
            navigate('/');
        } catch (error) {
            console.error('Error adding pet:', error);
        }
    };

    return (
        <MintContainer>
            <Title>Welcome a New Furry Friend</Title>
            <PetForm onSubmit={handleSubmit} />
        </MintContainer>
    );
};