import type { APIRoute } from "astro";
import { deletePokemon } from "../../../services/pokemon";

export const DELETE: APIRoute = async (context) => {
  
    
    if (context.params.id == null) {
      throw new Error('es medio dificil que no haya id pero bueno');
    }
    const id = parseInt(context.params.id); 
    await deletePokemon(id);

    return new Response(JSON.stringify({}), {
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  

};