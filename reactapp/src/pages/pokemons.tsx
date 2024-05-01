import React, { useEffect, useState } from "react";

import { useNavigate } from 'react-router-dom';
import useAuth from "./Auth";


type Pokemon = {
  id: number;
  name: string;
};

const BASE_URL = 'http://localhost:3000';


const Pokm: React.FC = () => {
  const nombreDeLaCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('user='));

  function eliminarCookie() {
    document.cookie = nombreDeLaCookie + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
  const pageP = useNavigate();
  const { logout } = useAuth();

  const [list, setList] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const pageCount = Math.ceil(count / 5);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`${BASE_URL}/pokemon?page=${page}`, { credentials: 'include' })
      .then((res) => res.ok ? res.json() : Promise.reject(res))
      .then((data) => {
        if (!cancelled) {
          setList(data.list);
          setCount(data.count);
        }
      }).catch((res: Response) => res.status === 401 ? pageP('/login') : null)

    return () => {
      cancelled = true;
    };
  }, [page]);

  async function addPokemon(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const pokemon = {
      id: parseInt(data.get('id') as string),
      name: data.get('name') as string

    
    };
  
    const response = await fetch(`${BASE_URL}/pokemon`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pokemon),
      credentials: 'include',
    });
  
    if (!response.ok) {
      
      setError('Error al agregar pokemon. Verifica que el ID no esté repetido.');
      throw new Error('Error al agregar pokemon. Verifica que el ID no esté repetido.');
    
      }
      else{
        form.reset();
        setError('pokemon agregado correctamente, p p rojo, despues veo como cambiarle la clase.');
        if (page === pageCount && list.length < 5) {
          setList(current => [...current, pokemon]);
        }
        setCount(current => current + 1);  
      }    
}

  async function deletePokemon(id: number) {
    await fetch(`${BASE_URL}/pokemon/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    setList(current => current.filter(pokemon => pokemon.id !== id));
    setCount(current => current - 1);

    if (page >= pageCount) {
      setPage(page - 1);
    }

    
  }

  return (
    <main className="container mx-auto flex flex-col">
      <h1 className="text-5xl text-red-600 font-extrabold text-center">Pokedex</h1>
      <form action="/api/pokemon" method="post" onSubmit={addPokemon}>
        <h2 className="text-2xl text-red-700 font-bold">Agregar nuevo pokemon</h2>
        <input type="number" name="id" placeholder="ID" className="my-1 w-full p-2 border border-gray-300 rounded-lg" />
        <input type="text" name="name" placeholder="Name" className="my-1 w-full p-2 border border-gray-300 rounded-lg" />
        {error && <p className="text-red-600 mt-2">{error}</p>} {/*  */}
        <button type="submit" className="w-full p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 hover:bg-red-700">Agregar</button>
      </form>
      <ul className="mt-4 border-4 border-red-700">
        <li className="flex items-center justify-between border-b border-gray-300 p-2 bg-red-700">
          <span className="text-lg text-white font-extrabold w-1/3">ID</span>
          <span className="text-lg text-white font-extrabold w-1/3 text-center">Name</span>
          <span className="text-lg text-white font-extrabold w-1/3 text-right">DELETE</span>
        </li>
        {list.map(pokemon => (
          <li key={pokemon.id} className="flex items-center justify-between border-b border-gray-300 p-2">
            <span className="text-lg text-red-600 font-bold w-1/3">{pokemon.id}</span>
            <span className="text-lg text-red-600 font-bold w-1/3 text-center">{pokemon.name}</span>
            <div className="w-1/3 text-right">
              <button onClick={() => deletePokemon(pokemon.id)} className="font-bold hover:font-extrabold">X</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-between gap-2 absolute top-0 right-0 mt-2 mr-2">
        <button onClick={() => { pageP('/login'); logout();eliminarCookie(); }} className="p-2 bg-red-600 text-white rounded-lg font-bold uppercase duration-200 hover:bg-red-700">Exit</button>
      </div>
      <div className="flex justify-center gap-2">
      <button onClick={() => setPage(c => Math.max(1, c - 1))} disabled={page === 1} className="p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 disabled:opacity-50 hover:bg-red-700">Prev</button>
      <span className="flex items-center self-stretch">{page}</span>
      <button onClick={() => setPage(c => Math.min(pageCount, c + 1))} disabled={page === pageCount} className="p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 disabled:opacity-50 hover:bg-red-700">Next</button>
    </div>
      
    </main>
  );
};

export default Pokm;
