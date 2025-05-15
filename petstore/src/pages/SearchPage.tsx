// SearchPage.tsx
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchPets, getPetsByPrice } from '../services/petService';
import { PetList } from '../components/PetList';
import { SearchBar } from '../components/SearchBar';
import { styled } from '@mui/system';

const SearchHeader = styled('div')({
  background: 'linear-gradient(to right, #a8c6e6, #d0e2f2)',
  padding: '2rem',
  borderRadius: '20px',
  marginBottom: '2rem',
  textAlign: 'center'
});

const SearchTitle = styled('h1')({
  color: '#2a4b6a',
  margin: 0,
  fontFamily: '"Verdana", sans-serif'
});
export const SearchPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [pets, setPets] = useState([]);
    const query = new URLSearchParams(location.search).get('q');
    const price = new URLSearchParams(location.search).get('price');

    useEffect(() => {
        const fetchResults = async () => {
            try {
                if (query) {
                    const data = await searchPets(query);
                    setPets(data);
                } else if (price) {
                    const data = await getPetsByPrice(parseFloat(price));
                    setPets(data);
                }
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        fetchResults();
    }, [query, price]);

    const handleSearch = (query: string) => {
        navigate(`/search?q=${query}`);
    };

    const handlePriceSearch = (price: number) => {
        navigate(`/search?price=${price}`);
    };

    return (
        <div style={{ padding: '1rem' }}>
            <SearchHeader>
                <SearchTitle>Find Your Perfect Pet Companion</SearchTitle>
            </SearchHeader>
            
            <SearchBar onSearch={handleSearch} onPriceSearch={handlePriceSearch} />
            
            {pets.length === 0 ? (
                <div style={{color: '#3a7d44', textAlign: 'center', marginTop: '2rem'}}>
                    No matching pets found. Try a different search!
                </div>
            ) : (
                <PetList pets={pets} />
            )}
        </div>
    );
};