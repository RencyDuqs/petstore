// SearchBar.tsx
import { useState } from 'react';
import { styled } from '@mui/system';

interface SearchBarProps {
    onSearch: (query: string) => void;
    onPriceSearch?: (price: number) => void;
}

const SearchContainer = styled('div')({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    marginBottom: '2rem',
    width: '100%',
    maxWidth: '800px',
    '@media (max-width: 600px)': {
        flexDirection: 'column'
    }
});

const SearchInput = styled('input')({
    flex: '1',
    minWidth: '200px',
    padding: '0.75rem',
    border: '1px solid #c8d8e8',
    borderRadius: '25px',
    fontSize: '1rem',
    '&:focus': {
        outline: 'none',
        borderColor: '#3a6d84',
        boxShadow: '0 0 0 2px rgba(58, 109, 132, 0.2)'
    }
});


const PriceInput = styled('input')({
    width: '120px',
    padding: '0.75rem',
    border: '1px solid #b8e0c8',
    borderRadius: '25px',
    fontSize: '1rem',
    '&:focus': {
        outline: 'none',
        borderColor: '#3a7d44',
        boxShadow: '0 0 0 2px rgba(58, 125, 68, 0.2)'
    }
});

const SearchButton = styled('button')({
    backgroundColor: '#3a6d84',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '25px',
    border: 'none',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s',
    '&:hover': {
        backgroundColor: '#2a5b74'
    }
});

export const SearchBar = ({ onSearch, onPriceSearch }: SearchBarProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [priceQuery, setPriceQuery] = useState('');

    const handleSearch = () => {
        onSearch(searchQuery);
    };

    const handlePriceSearch = () => {
        if (onPriceSearch && priceQuery) {
            onPriceSearch(parseFloat(priceQuery));
        }
    };

    return (
        <SearchContainer>
            <SearchInput
                type="text"
                placeholder="Search pets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchButton onClick={handleSearch}>
                Search
            </SearchButton>
            
            {onPriceSearch && (
                <>
                    <PriceInput
                        type="number"
                        placeholder="Max price"
                        value={priceQuery}
                        onChange={(e) => setPriceQuery(e.target.value)}
                        min="0"
                        step="0.01"
                    />
                    <SearchButton onClick={handlePriceSearch}>
                        Filter Price
                    </SearchButton>
                </>
            )}
        </SearchContainer>
    );
};