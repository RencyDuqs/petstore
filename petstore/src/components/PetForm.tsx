// PetForm.tsx
import { Pet } from '../types/Pet';
import { useState, useEffect } from 'react';
import { styled } from '@mui/system';

interface PetFormProps {
    initialPet?: Pet;
    onSubmit: (pet: Pet) => void;
    isEditing?: boolean;
}

const FormContainer = styled('div')({
    backgroundColor: '#f0f7ff',
    padding: '2rem',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(100, 150, 200, 0.2)',
    maxWidth: '600px',
    margin: '0 auto'
});
const FormTitle = styled('h2')({
    color: '#2a4b6a',
    textAlign: 'center',
    marginBottom: '1.5rem'
});

const FormField = styled('div')({
    marginBottom: '1.5rem'
});

const Label = styled('label')({
    display: 'block',
    marginBottom: '0.5rem',
    color: '#3a6d84',
    fontWeight: 'bold'
});

const Input = styled('input')({
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #c8d8e8',
    borderRadius: '8px',
    fontSize: '1rem',
    '&:focus': {
        outline: 'none',
        borderColor: '#3a6d84',
        boxShadow: '0 0 0 2px rgba(58, 109, 132, 0.2)'
    }
});

const TextArea = styled('textarea')({
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #b8e0c8',
    borderRadius: '8px',
    fontSize: '1rem',
    minHeight: '100px',
    resize: 'vertical',
    '&:focus': {
        outline: 'none',
        borderColor: '#3a7d44',
        boxShadow: '0 0 0 2px rgba(58, 125, 68, 0.2)'
    }
});

const Select = styled('select')({
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #b8e0c8',
    borderRadius: '8px',
    fontSize: '1rem',
    '&:focus': {
        outline: 'none',
        borderColor: '#3a7d44',
        boxShadow: '0 0 0 2px rgba(58, 125, 68, 0.2)'
    }
});

const SubmitButton = styled('button')({
    backgroundColor: '#3a6d84',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '25px',
    border: 'none',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    width: '100%',
    transition: 'all 0.3s',
    '&:hover': {
        backgroundColor: '#2a5b74'
    }
});

export const PetForm = ({ initialPet, onSubmit, isEditing = false }: PetFormProps) => {
    const [pet, setPet] = useState<Pet>(initialPet || {
        name: '',
        species: '',
        breed: '',
        gender: '',
        image: '',
        description: '',
        price: 0
    });

    useEffect(() => {
        if (initialPet) {
            setPet(initialPet);
        }
    }, [initialPet]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPet(prev => ({
            ...prev,
            [name]: name === 'price' ? parseFloat(value) || 0 : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(pet);
    };

    return (
        <FormContainer>
            <form onSubmit={handleSubmit}>
                <FormTitle>{isEditing ? 'Edit Pet Profile' : 'Add New Pet'}</FormTitle>
                
                <FormField>
                    <Label>Name</Label>
                    <Input
                        type="text"
                        name="name"
                        value={pet.name}
                        onChange={handleChange}
                        required
                    />
                </FormField>
                
                <FormField>
                    <Label>Species</Label>
                    <Input
                        type="text"
                        name="species"
                        value={pet.species}
                        onChange={handleChange}
                        required
                    />
                </FormField>
                
                <FormField>
                    <Label>Breed</Label>
                    <Input
                        type="text"
                        name="breed"
                        value={pet.breed}
                        onChange={handleChange}
                        required
                    />
                </FormField>
                
                <FormField>
                    <Label>Gender</Label>
                    <Select
                        name="gender"
                        value={pet.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </Select>
                </FormField>
                
                <FormField>
                    <Label>Image URL</Label>
                    <Input
                        type="text"
                        name="image"
                        value={pet.image}
                        onChange={handleChange}
                    />
                </FormField>
                
                <FormField>
                    <Label>Description</Label>
                    <TextArea
                        name="description"
                        value={pet.description}
                        onChange={handleChange}
                        required
                    />
                </FormField>
                
                <FormField>
                    <Label>Price</Label>
                    <Input
                        type="number"
                        name="price"
                        value={pet.price}
                        onChange={handleChange}
                        required
                        min="0"
                        step="0.01"
                    />
                </FormField>
                
                <SubmitButton type="submit">
                    {isEditing ? 'Update Pet' : 'Add Pet'}
                </SubmitButton>
            </form>
        </FormContainer>
    );
};