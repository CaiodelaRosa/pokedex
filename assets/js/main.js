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
        <dialog id="abrirModal ${pokemon.name}" class="pokeModal ${pokemon.name}">
            <div>
                <h2>${pokemon.name}</h2>
            </div>
        </dialog>`)
            .join('')
            pokemonList.innerHTML += newHtml;


            const modalButton = document.getElementsByClassName("abrirModal")
            const modalPokemon = document.getElementsByClassName("pokeModal")

            for (let i = 0; i < modalButton.length; i++) {
                modalButton[i].addEventListener('click', ()=>{
                    modalPokemon[i].showModal()
                })
                
              }
                
    })    
}


loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    loadPokemonItens(offset, limit)
})

