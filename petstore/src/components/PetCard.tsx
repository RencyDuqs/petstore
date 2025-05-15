// PetCard.tsx
import { Pet } from '../types/Pet';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';

interface PetCardProps {
    pet: Pet;
    onDelete?: (id: number) => void;
}

const CardContainer = styled('div')({
    backgroundColor: '#f8f9ff',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(100, 150, 200, 0.2)',
    width: '280px',
    margin: '1rem',
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 20px rgba(100, 150, 200, 0.3)'
    }
});

const PetImage = styled('img')({
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderBottom: '2px solid #c8d8e8'
});

const Content = styled('div')({
    padding: '1.5rem'
});

const PetName = styled('h3')({
    color: '#2a4b6a',
    margin: '0 0 0.5rem',
    fontSize: '1.4rem'
});

const PetMeta = styled('p')({
    color: '#5a7d95',
    fontSize: '0.9rem',
    margin: '0 0 0.5rem'
});

const PetPrice = styled('p')({
    color: '#3a6d84',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    margin: '0.5rem 0'
});


const PetDescription = styled('p')({
    color: '#333',
    fontSize: '0.9rem',
    lineHeight: '1.5',
    margin: '0.5rem 0 1rem'
});

const ButtonGroup = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1rem',
    flexWrap: 'wrap',
    gap: '0.5rem'
});

const ActionButton = styled(Link)({
    backgroundColor: '#3a6d84',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    textDecoration: 'none',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    transition: 'all 0.3s',
    '&:hover': {
        backgroundColor: '#2a5b74'
    }
});

const DeleteButton = styled('button')({
    backgroundColor: '#ff6b6b',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    border: 'none',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s',
    '&:hover': {
        backgroundColor: '#ff5252'
    }
});

export const PetCard = ({ pet, onDelete }: PetCardProps) => {
    return (
        <CardContainer>
            <PetImage
                src={pet.image || 'https://placekitten.com/300/200'}
                alt={pet.name}
            />
            <Content>
                <PetName>{pet.name}</PetName>
                <PetMeta>
                    {pet.species} • {pet.breed} • {pet.gender}
                </PetMeta>
                <PetPrice>${pet.price.toFixed(2)}</PetPrice>
                <PetDescription>
                    {pet.description.length > 100 
                        ? `${pet.description.substring(0, 100)}...` 
                        : pet.description}
                </PetDescription>
                
                <ButtonGroup>
                    <ActionButton to={`/pets/${pet.id}`}>
                        Details
                    </ActionButton>
                    <ActionButton to={`/edit/${pet.id}`}>
                        Edit
                    </ActionButton>
                    {onDelete && (
                        <DeleteButton onClick={() => onDelete(pet.id!)}>
                            Delete
                        </DeleteButton>
                    )}
                </ButtonGroup>
            </Content>
        </CardContainer>
    );
};