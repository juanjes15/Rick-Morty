//Funcion que va a construir la página, va a depender su funcionamiento de lo que se clickeo en la seccion de paginación
function paginar(num) {
    //Esta primera parte va a determinar que se hace en caso de hacer click en next/previous
    var pag = document.getElementsByClassName("pagination")[0];
    var links = pag.getElementsByTagName("a");

    //Si se hace click en next y no ha llegado aún a la última sección de páginas
    //activamos previous, sumamos 6 a cada numero en paginacion y desabilitamos next
    //si ya llegó al final
    if (num === 7 && links[1].innerHTML != 37) {
        links[0].classList.remove("disabled")
        for (var i = 1; i < links.length - 1; i++) {
            var currentNumber = parseInt(links[i].innerHTML);
            links[i].innerHTML = currentNumber + 6;
        }
        if (links[1].innerHTML == 37) {
            links[7].classList.add("disabled")
        }
    }

    //Si se hace click en previous y no está en la primer sección de páginas
    //activamos next, restamos 6 a cada numero en paginación y desabilitamos previous
    //si ya llegó al inicio
    else if (num === -1 && links[1].innerHTML != 1) {
        links[7].classList.remove("disabled")
        for (var i = 1; i < links.length - 1; i++) {
            var currentNumber = parseInt(links[i].innerHTML);
            links[i].innerHTML = currentNumber - 6;
        }
        if (links[1].innerHTML == 1) {
            links[0].classList.add("disabled")
        }
    }

    //cuando entra un número...
    else {
        //Estas primeras lineas desactivan/activan visualmente la página actual en pagination
        var currentActivePage = document.querySelector('.page-link.active');
        currentActivePage.classList.remove('active');
        for (var i = 1; i < links.length - 1; i++) {
            if (links[i].innerHTML == num) {
                links[i].classList.add('active');
            }
        }

        //Aca ya empezamos a construir la url para hacer la consulta a la API con el número ingresado en pagination
        const apiUrl = 'https://rickandmortyapi.com/api/character/?page=' + num;

        //Le indicamos donde va a quedar la información consultada
        const characterContainer = document.getElementById('character-container');

        //Borramos consultas generadas anteriormente para que no se acumulen
        characterContainer.innerHTML = '';

        //Hacemos la consulta a la API
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const characters = data.results;

                //Como vamos a trabajar con Bootstrap, empezamos a construir el container
                //para mostrar correctamente la información
                const rowDiv = document.createElement('div');
                rowDiv.className = 'row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4';

                //Ciclo que se repite 20 veces, donde se construye las "cards"
                //que van a contener cada uno de los personajes
                characters.forEach(character => {
                    //Solo voy a mostrar el nombre, estado y imagen en cada "card"
                    const name = character.name;
                    const status = character.status;
                    const image = character.image;
                    //Es necesario el id para hacer la consulta detallada de cada personaje
                    const characterId = character.id;

                    //De aqui en adelante se van creando elementos con sus respectivas
                    //clases para que se muestren correctamente con Bootstrap
                    const colDiv = document.createElement('div');
                    colDiv.className = 'col';

                    const cardLink = document.createElement('a');
                    cardLink.href = 'character.html?id=' + characterId;
                    cardLink.className = 'text-decoration-none';

                    const cardDiv = document.createElement('div');
                    cardDiv.className = 'card';

                    const imgElement = document.createElement('img');
                    imgElement.className = 'card-img-top';
                    imgElement.src = image;
                    imgElement.alt = 'Character Image';

                    const cardBodyDiv = document.createElement('div');
                    cardBodyDiv.className = 'card-body';

                    const infoContainer = document.createElement('div');
                    infoContainer.className = 'd-flex justify-content-between align-items-center';

                    const nameLink = document.createElement('a');
                    nameLink.className = 'card-title';
                    //Cada "card" queda asociada a un link que la va a llevar a la información detallada
                    nameLink.href = 'character.html?id=' + characterId;
                    nameLink.textContent = name;

                    const statusBadge = document.createElement('span');
                    statusBadge.className = 'badge rounded-pill';
                    //Dependiendo si el personaje esta vivo, muerto o desconocido,
                    //asignamos un color para una mejor visualización de la info
                    if (status === "Alive") {
                        statusBadge.classList.add('bg-success');
                    } else if (status === "Dead") {
                        statusBadge.classList.add('bg-danger');
                    } else {
                        statusBadge.classList.add('bg-warning');
                    }
                    statusBadge.textContent = status;

                    //Con todos los elementos ya construidos, teminamos de armar
                    //el contenedor
                    infoContainer.appendChild(nameLink);
                    infoContainer.appendChild(statusBadge);
                    cardBodyDiv.appendChild(infoContainer);
                    cardDiv.appendChild(imgElement);
                    cardDiv.appendChild(cardBodyDiv);
                    cardLink.appendChild(cardDiv);
                    colDiv.appendChild(cardLink);
                    rowDiv.appendChild(colDiv);
                });

                characterContainer.appendChild(rowDiv);
            });
    }
}

paginar(1);