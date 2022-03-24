// API variable setup

const url = "https://pokeapi.co/api/v2/pokemon/";
let pokemon = "";

// HTML element variable setup

const searchBox = document.getElementsByClassName("inputPlayer")[0];
const searchButton = document.getElementsByClassName("buttonInput")[0];
const resultDiv = document.getElementsByClassName("result")[0];
const lights = document.getElementsByClassName("pokedex-lights-sm-light");

const pokemonImg = document.getElementsByClassName("pokedex-screen-image")[0];
const pokemonName = document.getElementsByClassName("pokemon-name")[0];
const pokemonTypes = document.getElementsByClassName("pokemon-types")[0];

// Search Button on click event

searchButton.addEventListener("click", function() {
  runSearch();
})

// Event Listener for Enter keypress in search-box

searchBox.addEventListener("keypress", function(e) {
  if (e.which == 13) {
    runSearch();
  }
})

// runSearch function

function runSearch() {
  clearPokemon();
  
  pokemon = searchBox.value.toLowerCase();
  searchBox.value = "";
  
  // Start the blinking lights!
  for (let i = 0; i < lights.length; i++) {
    lights[i].classList.add("blink");
  }
  
  pokemonName.innerHTML = "Loading...";
  
  // Call API
  setTimeout(function() {
  let fullURL = url + pokemon;
  
    fetch(fullURL)
    .then(function(response) {
        if (!response.ok) { // No Pokemon found
            displayError();
        }
        return response.json();
    })
    .then(displayPokemon);
  }, 1500);
}

// Display no Pokemon found function

function displayError() {
  // Stop the blinking lights!
  for (let i = 0; i < lights.length; i++) {
    lights[i].classList.remove("blink");
  }
  
  clearPokemon();
  pokemonName.innerHTML = "No Pokemon found!";
}

// Display Pokemon function

function displayPokemon(result) {
  // Stop the blinking lights!
  for (let i = 0; i < lights.length; i++) {
    lights[i].classList.remove("blink");
  }
  
  // Clear any existing result first
  clearPokemon();
  
  let name = result.name.charAt(0).toUpperCase() + result.name.substring(1)
  
  pokemonImg.src = result.sprites["front_default"];
  pokemonName.innerHTML = name + "  #" + result.id;
  
  for (let i = 0; i < result.types.length; i++) {
    let li = document.createElement("li");
    li.classList.add("pokemon-type");
    li.innerHTML = result.types[i].type.name;
    pokemonTypes.appendChild(li);
  }
}

// Clear pokemon from result

function clearPokemon() {
  pokemonImg.src = "";
  pokemonName.innerHTML = "";
  pokemonTypes.innerHTML = "";
}