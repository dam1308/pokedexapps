

async function ListPks() {
    const resp = await fetch("http://localhost:4321/api/pokemon.json"); //dps intenta cambiar el puerto del server para ver q onda
    const data = await resp.json();
    console.log(data);
    data.listaPks.forEach((p) => {
      addPk(p);
    });
  }
function addPk(pk) {
  const item = document.createElement("li");
  item.id = `li${pk.id}`;
  item.classList ="flex items-center justify-between border-b border-gray-300 p-2"; // esto es del index.astro. para que tenga el mismo formato que el de server y no quede blanco lo de arriba
  item.dataset.name = pk.name; //para la función del sort

  const row = `<span class="text-lg text-red-600 font-bold w-1/3">${pk.id}</span>` + `<span class="text-lg text-red-600 font-bold w-1/3 text-center">${pk.name}</span>` + `<form class="w-1/3 text-right">` + `<button type="submit" class="font-bold hover:font-extrabold" id="${pk.id}">X</button></form>`; // this was a cpoy paste too jaja, del index.astro
  item.innerHTML = row;
  document.getElementById('listaPks').appendChild(item);
}
ListPks();

//--------------------------------------------------------------------------DELETE -----------------------------------------------------------


document.addEventListener('DOMContentLoaded', () => { // me tiraba que el form estaba null, be. 
  const list = document.getElementById('listaPks');
  list.addEventListener('click', async (event) => {
    event.preventDefault(); //clase
    console.log('hasta acá vamos bien');
    if (event.target.tagName === 'BUTTON') { //si no esta esto tira error todo el tiempo en la consola porque intenta hacer lo que ta en adentro y no puede pobre jaja
      console.log('Almenos entra aca please');
      const pkId = event.target.id;
      try {
        const response = await fetch(`http://localhost:4321/api/pokemon/${pkId}.json`, {
          method: 'DELETE',
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const Item = document.getElementById(`li${pkId}`);
          Item.remove();
        } else {
          console.error('no se puedo eliminar:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
    //else {
    //  console.log('no entraa');
   // }

  });
});



//-------------------------------------------------------------------ADD--------------------------------------------------------------


document.addEventListener('DOMContentLoaded', () => { // me tiraba que el form estaba null, be. 
  const form = document.getElementById('form123');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const id = parseInt(document.querySelector('input[name="id"]').value);
    const name = document.querySelector('input[name="name"]').value;
    const newPk = { id, name };
    try { //dps vpy a poner lo de progra 1. del cartel que aparece arriba como worning de algo. no me acuerdo 
      const existingPk = document.getElementById(`li${id}`);
      if (existingPk) {
        window.alert('¡Ya existe un Pokemon con este ID lal!'); //este era 
        form.reset(); // clean form... 
        return;
      }   
    try {
      const response = await fetch('http://localhost:4321/api/pokemon.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPk)
      });
      if (response.ok) {
        addPk(newPk); // la funcion de arriba
        form.reset(); // clean form... 
      } else {
        console.error('AHHHHHH', response.statusText);
      }
    } catch (error) {
      console.error('el ah de afuera', error);
    }
  } catch (error) {
    console.error('Error del id rep:', error);
  }
  });
});



//-------------------------------------------------------------------STRESS--------------------------------------------------------------



document.addEventListener('DOMContentLoaded', () => { // estoy usando esto en todos mis eventos.... lo puedo poner global? para dps
  const listOfEv = document.getElementById('listaPks');
  const idHeader = document.getElementById('idHeader');
  const nameHeader = document.getElementById('nameHeader');

  idHeader.addEventListener('click', () => {
    console.log('click en id holaaa');
    sortPksInList('id');
  });

  nameHeader.addEventListener('click', () => {
    console.log('click en nombre chauu');
    sortPksInList('name');
  });

  function sortPksInList(tellMeHow) {
    const items = Array.from(listOfEv.children); 
    const header = items.shift(); // Esta "#$$@* de header se ordenaba con los pks. entonces la saqué y la volvi agregar a al final.
// ↑↓
    items.sort((a, b) => {
      const idA = parseInt(a.id.replace('li', ''));
      const idB = parseInt(b.id.replace('li', ''));

      if (tellMeHow === 'id') {
        return idA - idB; 
      } else if (tellMeHow === 'name') {
        const nameA = a.dataset.name;
        const nameB = b.dataset.name;
        return nameA.localeCompare(nameB); 
      }
    });

    // Elimina los elementos de la tabla actual
    listOfEv.innerHTML = '';

    // Agregar los pks pero ordenados
    listOfEv.appendChild(header); //aca esta el header
    items.forEach(item => listOfEv.appendChild(item));
  }
});

//dont forget to delete the polemic comments cursing.


