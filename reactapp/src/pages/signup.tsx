import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



interface LayoutProps {
  title: string;
  children: React.ReactNode; // asi se arregla porque no es un .jsx. porwkejfnfk ij gracias copilot, dps investigo mejor q onda eso
}

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  );
};



const SignupForm: React.FC = () => {

  const page = useNavigate();
 
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        
        console.log('Registro exitoso');
        page('/login'); 
      } else {
        
        setError('Error en el registro');
      }
    } catch (error) {
      setError("Intente más tarde");
    }
    setEmail('');
    setPass('');

  };

  const [email, setEmail] = useState(''); //estos se usan mas abajo para que se borren los campos despues del submit
  const [pass, setPass] = useState('');
  const [error, setError] = useState<string | null>(null);

const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  
  setEmail(event.target.value);
};
const handlePassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  
  setPass(event.target.value);
};

  return (
    <Layout title="">
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-xs">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input className="border px-2 w-full py-1"
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
        <button className="bg-blue-600 text-white px-4 py-2 w-full rounded-full" type="submit">Registrarse</button>
        {error && <p className="text-red-600 mt-2">{error}</p>} {/*  */}
      </form>
      <button className="bg-red-600 text-white px-4 py-2 rounded-full" onClick={() => page('/login')}>
    Ir al Login
  </button>
    </div>
  </Layout>
  );
};

export default SignupForm;
