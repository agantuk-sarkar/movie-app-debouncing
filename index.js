// getting the apiKey and base url for movie shows
const apiKey = "13749ecc";
const movieBaseUrl = `https://www.omdbapi.com/?apikey=${apiKey}`;
let search = null;

// setting timeout id
let timeoutId = null;

// getting all html elements into js
const searchBar = document.getElementById("search");
const movieListDiv = document.querySelector(".movieList-names");

// using input event for input field
searchBar.addEventListener("input",function(){

    if(timeoutId){
        clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(function(){
        getMovieUrl();
    },3000);
});

// function to get movie url
function getMovieUrl(){

    if(searchBar.value){
        search = searchBar.value;
        const movieSearchUrl = `${movieBaseUrl}&s=${search}&plot=full`;
        fetchMovieUrl(movieSearchUrl);
    } else{
        throw new Error("Invalid URL");
    }
}

// function to fetch movie API
async function fetchMovieUrl(movieApi){

    try{
        let response = await fetch(movieApi);

        if(response.ok){
            let movieData = await response.json();
            let movie_list = movieData.Search;
            console.log("movieList:",movie_list);
            showMovieList(movie_list);
        }

    } catch(error){
        console.log("error",error);

    }  

}

// function to display movie list
function showMovieList(movieArray){

    movieListDiv.innerHTML = "";

    movieArray?.forEach(function(movieObj){

        const PTag = document.createElement("p");
        PTag.textContent = movieObj.Title;
        movieListDiv.append(PTag);
    })
}