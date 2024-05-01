
import LoginForm from "./pages/Login.tsx";
import SignupForm from "./pages/Signup.tsx";
import PokemonsPage from "./pages/Pokemons.tsx";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './pages/Auth';

//Ahora funciona lo de el guardado de la sesión. Si se cierra la pestaña y se vuelve a abrir, sigue logueado. y viceversa
// :)
const App: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <Router>
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
       <Route path="/" element={isAuthenticated ? <Navigate to="/pokemons" replace /> : <Navigate to="/login" />} />
        <Route path="/pokemons" element={<PokemonsPage />} />
    </Routes>
  </Router>
  );
};

export default App;
