//Conseguimos la id que nos manda index.html/code.js al hacer click al personaje
const urlParams = new URLSearchParams(window.location.search);
const characterId = urlParams.get('id');

//Terminamos de construir la url con el id
const apiUrl = 'https://rickandmortyapi.com/api/character/' + characterId;

//Hacemos la consulta a la API
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        //Indicamos donde se va mostrar la información en el html
        const characterNameElement = document.getElementById('character-name');
        const characterImageElement = document.getElementById('character-image');
        const characterStatusElement = document.getElementById('character-status');
        const characterSpeciesElement = document.getElementById('character-species');
        const characterGenderElement = document.getElementById('character-gender');
        const characterOriginElement = document.getElementById('character-origin');
        const characterLocationElement = document.getElementById('character-location');
        const characterEpisodesElement = document.getElementById('character-episodes');

        //Llenamos los elementos con la información suministrada por la API
        characterNameElement.textContent = data.name;
        characterImageElement.src = data.image;
        characterStatusElement.textContent = data.status;
        characterSpeciesElement.textContent = data.species;
        characterGenderElement.textContent = data.gender;
        characterOriginElement.textContent = data.origin.name;
        characterLocationElement.textContent = data.location.name;

        //Para los episodios necesitamos hacer pasos adicionales
        //ya que pueden ser más de uno
        const episodePromises = data.episode.map(episodeUrl =>
            fetch(episodeUrl).then(response => response.json())
        );

        //Construimos la lista con los datos recibidos de la API
        Promise.all(episodePromises)
            .then(episodes => {
                episodes.forEach(episode => {
                    const episodeItem = document.createElement('li');
                    episodeItem.textContent = episode.name;
                    characterEpisodesElement.appendChild(episodeItem);
                });
            })
            .catch(error => console.log(error));
    })
    .catch(error => console.log(error));