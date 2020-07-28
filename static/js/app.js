//funcion que llena el resultado de la búsqueda
function getMovies() {
  clean();
  axios
    .get(
      "https://www.omdbapi.com?s=" +
        document.getElementById("searchText").value +
        "&apikey=6cb19638"
    )
    .then((response) => {
      let movies = response.data.Search;
      let output = "";
      movies.forEach((movie) => {
        output += `
        <div class="col-md-3 mb-1">
            <div class="well text-center">
              <img src="${movie.Poster}" width="150" height="200">
              <h5>${movie.Title}</h5>
              <button class="btn btn-outline-primary" onclick="getMovie('${movie.imdbID}')">Ver Detalles</button>
              </div>
          </div>
          `;
      });
      document.getElementById("movies").innerHTML = output;
    })
    .catch((err) => {
      console.log(err);
    });
}

// función que muestra el detalle de cada pelicula
function getMovie(movieId) {
  clean();
  let output = "";

  axios
    .get("https://www.omdbapi.com?i=" + movieId + "&apikey=6cb19638")
    .then((response) => {
      let movie = response.data;
      let output = `
      
        <div class="center col-md-4">
          <img src="${movie.Poster}" class=" img-thumbnail" width="400" height="550">
        </div>
      <div class="col-md-8">
        <h2>${movie.Title}</h2>
        <ul class="list-group">
          <li class="list-group-item"><strong>Publicado:</strong> ${movie.Released}</li>
          <li class="list-group-item"><strong>Género:</strong> ${movie.Genre}</li>
          <li class="list-group-item"><strong>Clasificación:</strong> ${movie.Rated}</li>
          <li class="list-group-item"><strong>Rating IMDB:</strong> ${movie.imdbRating}</li>
          <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
          <li class="list-group-item"><strong>Actores:</strong> ${movie.Actors}</li>
          <li class="list-group-item text-justify"><strong>Resumen:</strong> ${movie.Plot}</li>
        </ul>
        </div>
        <hr>
        <div class="container mt-3 mb-4">
          <a class="btn btn-outline-info" href="https://imdb.com/title/${movie.imdbID}" target="_blank">Ver en IMDB</a>
          <a class="btn btn-outline-secondary" href="index.html">Regresar al inicio</a>
        </div>
          `;
      document.getElementById("movie").innerHTML = output;
    })
    .catch((err) => {
      console.log(err);
    });
}

// función que limpia la página al realizar una nueva búsqueda o ver el detalle
function clean() {
  let output = "";
  document.getElementById("movies").innerHTML = output;
  document.getElementById("movie").innerHTML = output;
}
