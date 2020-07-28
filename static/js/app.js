//funcion que llena el resultado de la búsqueda
function getMovies() {
  clean();
  axios
    .get(
      "http://www.omdbapi.com?s=" +
        document.getElementById("searchText").value +
        "&apikey=6cb19638"
    )
    .then((response) => {
      let movies = response.data.Search;
      let output = "";
      movies.forEach((movie) => {
        output += `
            <img src="${movie.Poster}" width="150" height="200">
            <h5>${movie.Title}</h5>
            <button onclick="getMovie('${movie.imdbID}')">Ver Detalles</button>
            <br>
        `;
      });
      document.getElementById("movies").innerHTML = output;
    })
    .catch((err) => {
      console.log(err);
    });
}

// finción que muestra el detalle de cada pelicula
function getMovie(movieId) {
  clean();
  let output = "";

  axios
    .get("http://www.omdbapi.com?i=" + movieId + "&apikey=6cb19638")
    .then((response) => {
      let movie = response.data;
      let output = `
        <img src="${movie.Poster}" width="400" height="550">
        <h2>${movie.Title}</h2>
        <ul>
        <li><strong>Publicado:</strong> ${movie.Released}</li>
        <li><strong>Género:</strong> ${movie.Genre}</li>
        <li><strong>Clasificación:</strong> ${movie.Rated}</li>
        <li><strong>Rating IMDB:</strong> ${movie.imdbRating}</li>
        <li><strong>Director:</strong> ${movie.Director}</li>
        <li><strong>Actores:</strong> ${movie.Actors}</li>
        <litext-justify"><strong>Resumen:</strong> ${movie.Plot}</li>
        </ul>
        <hr>
        <a href="http://imdb.com/title/${movie.imdbID}" target="_blank">Ver en IMDB</a>
        <a href="index.html">Regresar al inicio</a>
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
