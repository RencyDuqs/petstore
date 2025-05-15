// EditPetPage.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPetById, updatePet } from '../services/petService';
import { PetForm } from '../components/PetForm';
import { Pet } from '../types/Pet';
import { styled } from '@mui/system';

const EditWrapper = styled('div')({
  background: 'linear-gradient(145deg, #e6f0ff, #d0e2f2)',
  padding: '2.5rem',
  borderRadius: '20px',
  maxWidth: '700px',
  margin: '2rem auto',
  border: '1px solid #c8d8e8'
});

const EditTitle = styled('h2')({
  color: '#2a4b6a',
  textAlign: 'center',
  marginBottom: '1.5rem',
  fontFamily: '"Trebuchet MS", sans-serif',
  fontSize: '2rem'
});

export const EditPetPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [pet, setPet] = useState<Pet | null>(null);

    useEffect(() => {
        const fetchPet = async () => {
            try {
                const data = await getPetById(Number(id));
                setPet(data);
            } catch (error) {
                console.error('Error fetching pet:', error);
            }
        };

        fetchPet();
    }, [id]);

    const handleSubmit = async (updatedPet: Pet) => {
        try {
            await updatePet(Number(id), updatedPet);
            navigate(`/pets/${id}`);
        } catch (error) {
            console.error('Error updating pet:', error);
        }
    };

    if (!pet) return <div style={{color: '#3a7d44', textAlign: 'center'}}>Loading pet details...</div>;

    return (
        <EditWrapper>
            <EditTitle>Update Pet Profile</EditTitle>
            <PetForm initialPet={pet} onSubmit={handleSubmit} isEditing />
        </EditWrapper>
    );
};