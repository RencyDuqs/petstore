import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PetDetailPage } from './pages/PetDetailPage';
import { AddPetPage } from './pages/AddPetPage';
import { EditPetPage } from './pages/EditPetPage';
import { SearchPage } from './pages/SearchPage';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#4a148c',
        },
        secondary: {
            main: '#ff6f00',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
});

export const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/pets/:id" element={<PetDetailPage />} />
                    <Route path="/add" element={<AddPetPage />} />
                    <Route path="/edit/:id" element={<EditPetPage />} />
                    <Route path="/search" element={<SearchPage />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
};