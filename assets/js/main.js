const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 12



let offset = 0

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
        <a class="abrirModal ${pokemon.name}">    
        <li class="pokemon ${pokemon.type}">         
                <span class="number">#${pokemon.id}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                    <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
                    </div>
                </li>
            </a>
        <dialog id="abrirModal ${pokemon.name}" class="pokeModal ${pokemon.name} ${pokemon.type}"> 
            <div class="head">    
                <h2>${pokemon.name}</h2>   
                <button class="closeModal ${pokemon.name}">x</button>
            </div>
            <img class="modalImg" src="${pokemon.photo}" alt="${pokemon.name}">
            <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
            <hr class='separador'>
            <div class="stats">
                <h3>Stats</h3>
                <ol class="statsList">
                    ${pokemon.stats.map((stat) => `<li>${stat.replace('-', ' ')}</li>`).join('')}
                </ol>
            </div>
            <hr class="separador">
            <div class="moves">
                <h3>Moves</h3>
                <ol class="movesList">
                    ${pokemon.moves.map((move) => `<li>${move.replace('-', ' ')}</li>`).join('')}
                </ol>    
            </div>
        </dialog>`)
            .join('')
        pokemonList.innerHTML += newHtml;


        const modalButton = document.getElementsByClassName("abrirModal")
        const modalPokemon = document.getElementsByClassName("pokeModal")
        const closeModal = document.getElementsByClassName("closeModal")

        for (let i = 0; i < modalButton.length; i++) {
            modalButton[i].addEventListener('click', () => {
                modalPokemon[i].showModal()
            })
        }

        for (let i = 0; i < closeModal.length; i++){
            closeModal[i].addEventListener('click', ()=> {
                modalPokemon[i].close()
            })
        }
        
    })
}


loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    loadPokemonItens(offset, limit)
})