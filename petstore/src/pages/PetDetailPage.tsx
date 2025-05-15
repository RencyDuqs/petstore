// PetDetailPage.tsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPetById } from '../services/petService';
import { Pet } from '../types/Pet';
import { styled } from '@mui/system';

const DetailCard = styled('div')({
  backgroundColor: '#f8f9ff',
  borderRadius: '20px',
  overflow: 'hidden',
  boxShadow: '0 6px 15px rgba(100, 150, 200, 0.3)',
  maxWidth: '800px',
  margin: '2rem auto'
});

const PetImage = styled('img')({
  width: '100%',
  height: '400px',
  objectFit: 'cover',
  borderBottom: '3px solid #b8e0c8'
});

const PetContent = styled('div')({
  padding: '2rem'
});

const PetName = styled('h2')({
  color: '#2a4b6a',
  margin: '0 0 1rem',
  fontSize: '2.2rem'
});

const PetMeta = styled('div')({
  color: '#5a8d65',
  fontSize: '1.2rem',
  marginBottom: '1.5rem'
});

const PetPrice = styled('div')({
  color: '#3a7d44',
  fontSize: '1.8rem',
  fontWeight: 'bold',
  margin: '1.5rem 0'
});

const PetDescription = styled('p')({
  color: '#333',
  lineHeight: '1.6',
  fontSize: '1.1rem'
});

const ButtonGroup = styled('div')({
  display: 'flex',
  gap: '1rem',
  marginTop: '2rem',
  flexWrap: 'wrap'
});

const BackButton = styled(Link)({
  backgroundColor: '#f8fffa',
  color: '#3a7d44',
  border: '2px solid #3a7d44',
  padding: '0.75rem 1.5rem',
  borderRadius: '25px',
  textDecoration: 'none',
  fontWeight: 'bold',
  transition: 'all 0.3s',
  '&:hover': {
    backgroundColor: '#e0f7e9'
  }
});

const EditButton = styled(Link)({
  backgroundColor: '#3a6d84',
  color: 'white',
  padding: '0.75rem 1.5rem',
  borderRadius: '25px',
  textDecoration: 'none',
  fontWeight: 'bold',
  transition: 'all 0.3s',
  '&:hover': {
    backgroundColor: '#2a5b74'
  }
});

export const PetDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const [pet, setPet] = useState<Pet | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPet = async () => {
            try {
                const data = await getPetById(Number(id));
                setPet(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching pet:', error);
                setLoading(false);
            }
        };

        fetchPet();
    }, [id]);

    if (loading) return <div style={{color: '#3a7d44', textAlign: 'center'}}>Loading pet details...</div>;
    if (!pet) return <div style={{color: '#3a7d44', textAlign: 'center'}}>Pet not found in our records</div>;

    return (
        <div style={{ padding: '1rem' }}>
            <DetailCard>
                <PetImage
                    src={pet.image || 'https://placekitten.com/800/400'}
                    alt={pet.name}
                />
                <PetContent>
                    <PetName>{pet.name}</PetName>
                    <PetMeta>
                        {pet.species} • {pet.breed} • {pet.gender}
                    </PetMeta>
                    <PetPrice>${pet.price.toFixed(2)}</PetPrice>
                    <PetDescription>{pet.description}</PetDescription>
                    
                    <ButtonGroup>
                        <EditButton to={`/edit/${pet.id}`}>
                            Edit Profile
                        </EditButton>
                        <BackButton to="/">
                            Back to All Pets
                        </BackButton>
                    </ButtonGroup>
                </PetContent>
            </DetailCard>
        </div>
    );
};