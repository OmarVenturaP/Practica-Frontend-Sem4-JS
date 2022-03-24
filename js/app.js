

//CREANDO VARIABLE JS PARA API
const fetchPokemon = () => {
    const pokemonNameInput = document.getElementById("pokeName");

    let pokemonName = pokemonNameInput.value;
    pokemonName = pokemonName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokemonImage("https://cdn.create.vista.com/api/media/small/188142650/stock-video-retro-videogame-program-error-text?videoStaticPreview=true&token=");
            nullResults = document.getElementById("pokeDataError");
            nullResults.textContent = "Try again";
            function limpiar(){
                document.getElementById("pokeDataName").innerHTML = "";
                document.getElementById("pokeDataId").innerHTML = "";
                document.getElementById("pokeDataType").innerHTML = "";
                document.getElementById("pokeDataHeight").innerHTML = "";
                document.getElementById("pokeDataWeight").innerHTML = "";
                document.getElementById("pokeDataHability").innerHTML = "";
                document.getElementById("pokeDataMoves").innerHTML = "";
                document.getElementById("movesList").innerHTML = "";
                document.getElementById("dataPlayer1").innerHTML = "";
                document.getElementById("dataPlayer3").innerHTML = "";
            }
            limpiar();
        } else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            let pokeImg = data.sprites.front_default;
            pokemonImage(pokeImg);

            let pokeId = data.id;
            pokeDataId = document.getElementById("pokeDataId");
            pokeDataId.textContent = `ID: ${pokeId}`;
            console.log(pokeId);

            let pokeNombre = data.name.toUpperCase();
            pokeDataName = document.getElementById("pokeDataName");
            pokeDataName.textContent = `Name: ${pokeNombre}`;
            console.log(pokeNombre);

            let pokeTypes = data.types[0].type.name;
            pokeDataType = document.getElementById("pokeDataType");
            pokeDataType.textContent = `Type: ${pokeTypes}`;
            console.log(pokeTypes);

            let pokeHeight = data.height / 10;
            pokeDataHeight = document.getElementById("dataPlayer1");
            pokeDataHeight.textContent = `Height: ${pokeHeight} mts`;
            console.log(pokeHeight);

            let pokeWeight = data.weight / 10;
            pokeDataWeight = document.getElementById("dataPlayer3");
            pokeDataWeight.textContent = `Weight: ${pokeWeight} mts`;
            console.log(pokeWeight);

            let pokeHability = data.abilities[0].ability.name;
            pokeDataHability = document.getElementById("pokeDataHability");
            pokeDataHability.textContent = `Hability: ${pokeHability}`;
            console.log(pokeHability);

            let movimientos = document.getElementById("pokeDataMoves");
            movimientos.textContent = "Movimientos:";

            nullRes = document.getElementById("pokeDataError");
            nullRes.textContent = " ";

            let pokeMoves = document.getElementById("movesList");
            let moves = data.moves;
            pokeMoves.innerHTML = "";
            for (let i = 0; i < moves.length; i++) {
                const move = document.createElement("li");
                pokeMoves.appendChild(move);
        
                move.innerText = moves[i].move.name;
            }
        }
    });
}
const pokemonImage = (url) => {
    const pokemonPhoto = document.getElementById("pokemonImg");
    pokemonPhoto.src = url;
}
