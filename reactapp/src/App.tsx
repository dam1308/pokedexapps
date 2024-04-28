import React, { useState } from 'react';
import LoginForm from "./pages/login.tsx";
import SignupForm from "./pages/signup.js";
import PokemonsPage from "./pages/pokemons.tsx";

const App: React.FC = () => {
  
  //!!!!!!!!!!!!!!!!
  const [currentPage, setCurrentPage] = useState<string>('login'); //no te olvides de cambiarlo a login para entregar.

  // Función para cambiar la página
  const changePage = (page: string) => { //que dolor de cabeza
    setCurrentPage(page);
  };

  // Renderizar la página según el estado actual
  const renderPage = () => {
    switch (currentPage) {//arriba pqf
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
      
      {renderPage()}
    </div>
  );
};

export default App;
