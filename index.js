let movies = [];
const container = document.querySelector('.container');
function getMovies(){
  const empty = document.querySelector('.template').content.cloneNode(true);
  
  let movieHtml = '';
  if(movies.length !== 0){
    movies.forEach((movie) =>{
      movieHtml += `
        <div class="movie">
          <div class="movie_year">Released: ${movie.Year}</div>
          <div>
            <img class="movie_img" src="${movie.Poster !== 'N/A' ? movie.Poster : "https://via.placeholder.com/400"}.jpg" alt="${movie.Title}.jpg">
          </div>
          <div>
            <span class="movie_ype">${movie.Type}</span>
            <h3 class="movie_title">${movie.Title}</h3>
          </div>
        </div>
      `;
    })
    container.innerHTML =movieHtml;
    input.value = '';
  } else {
    container.innerHTML =movieHtml;
    container.appendChild(empty);
  }
}
const getMovieData = async ()=>{
  try {
    container.innerHTML = `<div class="loading">Loading <span class="load"></span></div>`;
    const fetchMovie = await fetch(`https://www.omdbapi.com/?apikey=d652de87&s=${input.value}`,{
      headers: {
        Accept: "application/json"
      }
    });
    
    if(fetchMovie.status !== 200){
      movies = [];
    }
    else{
      const data = await fetchMovie.json();
      movies = data.Search;
    }
    getMovies();
    
  } catch(err){
    movies = [];
    getMovies();
    console.log(err)
  }
}

const input = document.querySelector('input');
const con = document.querySelector('.container');
const btn = document.querySelector('.btn');

btn.addEventListener('click', ()=>{
  getMovieData();
});
getMovieData();
