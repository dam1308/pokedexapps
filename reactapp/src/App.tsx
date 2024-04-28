import React, { useState } from 'react';
import LoginForm from "./pages/login.tsx";
import SignupForm from "./pages/signup.js";
import PokemonsPage from "./pages/pokemons.tsx";

const App: React.FC = () => {
  // Estado para controlar qué página se muestra
  const [currentPage, setCurrentPage] = useState<string>('pokemons');

  // Función para cambiar la página
  const changePage = (page: string) => {
    setCurrentPage(page);
  };

  // Renderizar la página según el estado actual
  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginForm changePage={changePage} />;
      case 'signup':
        return <SignupForm changePage={changePage} />;
      case 'pokemons':
        return <PokemonsPage changePage={changePage} />;
      default:
        return <LoginForm changePage={changePage} />;
    }
  };

  return (
    <div>
      {/* Mostrar el contenido de la página actual */}
      {renderPage()}
    </div>
  );
};

export default App;
