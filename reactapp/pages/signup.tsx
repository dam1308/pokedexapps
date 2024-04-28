import React from 'react';

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

interface SignupFormProps {
  changePage: (page: string) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ changePage }) => {
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
        changePage('login'); 
      } else {
        
        console.log('Error en el registro');
      }
    } catch (error) {
      console.log('Error de red:', error);
    }
  };

  return (
    <Layout title="registro">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input className="border px-2" type="email" id="email" name="email" required />
        <label htmlFor="password">Password</label>
        <input className="border px-2" type="password" id="password" name="password" required />
        <button className="bg-blue-600 text-white px-2 py-1" type="submit">Registrarse</button>
      </form>
    </Layout>
  );
};

export default SignupForm;
