import React, { useState } from 'react';

interface LoginFormProps {
  changePage: (page: string) => void;
}


const LoginForm: React.FC<LoginFormProps> = ({ changePage }) => {
  const handleSignupClick = () => {
    changePage('signup'); // Llama a la función changePage para cambiar a la página de registro (signup)
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        
        console.log('VAMAAAAAA');
        
        changePage('pokemons'); // aersthf
      } else {
        
        console.log('Error al iniciar sesión');
        
      }
    } catch (error) {
      console.log('Error de red:', error);
    }
  };

  return (
    <><form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input className="border px-2" type="email" id="email" name="email" required />
      <label htmlFor="password">Password</label>
      <input className="border px-2" type="password" id="password" name="password" required />
      <button className="bg-red-600 text-white px-2 py-1" type="submit">Iniciar sesión</button>
    </form><button className="bg-blue-600 text-white px-2 py-1 mt-2" onClick={handleSignupClick}>
        Registrarse
      </button></>
    
  );
};

export default LoginForm;


