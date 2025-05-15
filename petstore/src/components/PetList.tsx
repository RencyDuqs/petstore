// PetList.tsx
import { Pet } from '../types/Pet';
import { PetCard } from './PetCard';
import { styled } from '@mui/system';

interface PetListProps {
    pets: Pet[];
    onDelete?: (id: number) => void;
}

const ListContainer = styled('div')({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '1.5rem',
    padding: '1rem',
    maxWidth: '1400px',
    margin: '0 auto'
});

export const PetList = ({ pets, onDelete }: PetListProps) => {
    return (
        <ListContainer>
            {pets.map((pet) => (
                <PetCard key={pet.id} pet={pet} onDelete={onDelete} />
            ))}
        </ListContainer>
    );
};