
const poke_container = document.getElementById('poke_container');
const pokemons_number = 150;
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f8d5a3',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#bca8bd',
    bug: '#98d7a5',
    dragon: '#a494f4',
    psychic: '#eaeda1',
    flying: '#97b3e6',
    fighting: '#E6E0D4',
    normal: '#F5F5F5',
};



const main_types = Object.keys(colors);



const fetchPokemons = async () => {
    for (let i = 1; i <= pokemons_number; i++) {
        await getPokemon(i);
    }
};

const getPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();
    createPokemonCard(pokemon);
};



//funcion pokemon card

function createPokemonCard(pokemon) {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');

    const poke_types = pokemon.types.map(type => type.type.name);

    const type = main_types.find(type => poke_types.indexOf(type) > -1);

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

    const color = colors[type];
    pokemonEl.style.backgroundColor = color;



    const pokeInnerHTML = `
      <div class="img-container">
          <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png"/>
      </div>

      <div class"info">
         <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
         <h3 class="name">${name}</h3>
         <small class="type"></span>${type}</span></small>
      </div>
    

      
    

    `;

    pokemonEl.innerHTML = pokeInnerHTML;

    poke_container.appendChild(pokemonEl);

};

fetchPokemons();





