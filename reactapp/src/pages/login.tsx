import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const LoginForm: React.FC = () => {
  const page = useNavigate();

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
        body: JSON.stringify({ email, password }),
        credentials: 'include',
        //credentials: 'include', //cookies?? nose
      });

      if (response.ok) {
        
        console.log('VAMAAAAAA');
        
        page('/pokemons');// aersthf
      } else {
        //estos son para que salgan en pantalla los mensajes de error
        setError('Error al iniciar sesión. Verifica tus credenciales.');
      }
    } catch (error) {
      console.log('Error de red:', error);
      //este también sale en pantalla
      setError('Error de red. Por favor, intenta nuevamente más tarde.');
    }
    setEmail('');
    setPass('');

  };

  const [email, setEmail] = useState(''); //estos se usan mas abajo para que se borren los campos despues del submit
  const [pass, setPass] = useState('');
  const [error, setError] = useState<string | null>(null);//para que salga en pantalla, está en el return


const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  
  setEmail(event.target.value);
};
const handlePassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  
  setPass(event.target.value);
};



  
  return (
    <div className="flex flex-col items-center justify-center h-screen">
  <form onSubmit={handleSubmit} className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-xs">
    <div className="mb-4">
      <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
      <input  className="border px-2 w-full py-1"
            type="email"
            id="email"
            name="email"
            value={email} 
            onChange={handleEmailChange} 
            required />
    </div>
    <div className="mb-6">
      <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
      <input className="border px-2 w-full py-1" 
              type="password" 
              id="password"
              name="password"
              value={pass} 
             onChange={handlePassChange} 
            required />
    </div>
    <button className="bg-red-600 text-white px-4 py-2 w-full rounded-full" type="submit">Iniciar sesión</button>
    {error && <p className="text-red-600 mt-2">{error}</p>} {/* */}
  </form>
  <button className="bg-blue-600 text-white px-4 py-2 rounded-full" onClick={() => page('/signup')}>
    Registrarse
  </button>
</div>
    
  );
};

export default LoginForm;


