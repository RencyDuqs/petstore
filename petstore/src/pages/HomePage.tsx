// HomePage.tsx
import { useEffect, useState } from 'react';
import { PetList } from '../components/PetList';
import { SearchBar } from '../components/SearchBar';
import { getAllPets, searchPets, getPetsByPrice, deletePet } from '../services/petService';
import { Pet } from '../types/Pet';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

const StoreHeader = styled('header')({
  background: '#3a6d84',
  color: '#f0f7ff',
  padding: '1.5rem',
  borderRadius: '0 0 20px 20px',
  marginBottom: '2rem',
  textAlign: 'center'
});

const StoreTitle = styled('h1')({
  margin: 0,
  fontSize: '2.5rem',
  fontFamily: '"Pacifico", cursive'
});

const ActionBar = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '2rem',
  flexWrap: 'wrap',
  gap: '1rem'
});

const AddButton = styled(Link)({
  backgroundColor: '#4a8da8',
  color: 'white',
  padding: '0.75rem 1.5rem',
  borderRadius: '25px',
  textDecoration: 'none',
  fontWeight: 'bold',
  transition: 'all 0.3s',
  '&:hover': {
    backgroundColor: '#3a7d98',
    transform: 'scale(1.05)'
  }
});

export const HomePage = () => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const data = await getAllPets();
                setPets(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching pets:', error);
                setLoading(false);
            }
        };

        fetchPets();
    }, []);

    const handleSearch = async (query: string) => {
        try {
            const data = await searchPets(query);
            setPets(data);
        } catch (error) {
            console.error('Error searching pets:', error);
        }
    };

    const handlePriceSearch = async (price: number) => {
        try {
            const data = await getPetsByPrice(price);
            setPets(data);
        } catch (error) {
            console.error('Error filtering by price:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deletePet(id);
            setPets(pets.filter(pet => pet.id !== id));
        } catch (error) {
            console.error('Error deleting pet:', error);
        }
    };

    return (
        <div style={{ padding: '0 1rem' }}>
            <StoreHeader>
                <StoreTitle>Pet Store</StoreTitle>
            </StoreHeader>
            
            <ActionBar>
                <SearchBar onSearch={handleSearch} onPriceSearch={handlePriceSearch} />
                <AddButton to="/add">+ New Pet</AddButton>
            </ActionBar>
            
            {loading ? (
                <div style={{color: '#3a7d44', textAlign: 'center'}}>Loading our furry friends...</div>
            ) : pets.length === 0 ? (
                <div style={{color: '#3a7d44', textAlign: 'center'}}>No pets currently available</div>
            ) : (
                <PetList pets={pets} onDelete={handleDelete} />
            )}
        </div>
    );
};