
import LoginForm from "./pages/login.tsx";
import SignupForm from "./pages/signup.tsx";
import PokemonsPage from "./pages/pokemons.tsx";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const App: React.FC = () => {
  
  return (
    <Router>
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/pokemons" element={<PokemonsPage />} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  </Router>
  );
};

export default App;
