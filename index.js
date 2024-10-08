// getting the apiKey and base url for movie shows
const apiKey = "13749ecc";
const movieBaseUrl = `https://www.omdbapi.com/?apikey=${apiKey}`;
let search = null;

// setting timeout id
let timeoutId = null;

// getting all html elements into js
const searchBar = document.getElementById("search");
const movieListDiv = document.querySelector(".movieList-names");
const headingTag = document.querySelector(".headingTag");
const moviePostersDiv = document.querySelector(".movie-posters");
const clearSearch = document.querySelector(".clear-search");
const hoverBox = document.querySelector(".hover-box");

// event for clear search icon
clearSearch.addEventListener("click",clearSearchIcon);

// using input event for input field
searchBar.addEventListener("input",function(){

    if(timeoutId){
        clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(function(){
        getMovieUrl();
    },1000);
});

// function to get movie url
function getMovieUrl(){

    if(searchBar.value){
        search = searchBar.value;
        movieListDiv.style.display = "block";
        
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
            let movie_list_array = movieData.Search;

            showMovieList(movie_list_array);
            showMoviePosters(movie_list_array);
        } else{
            throw new Error("Its a bad request");
        }

    } catch(error){
        console.log("error",error);

    }  

}

// function to display movie list in text when searched
function showMovieList(movieArray){

    movieListDiv.innerHTML = "";

    movieArray?.forEach(function(movieObj){

        const PTag = document.createElement("p");
        PTag.classList.add("italic","text-xl");
        PTag.textContent = movieObj.Title;
        movieListDiv.append(PTag);
    })
}

// function to display movie posters in UI from movie list array
function showMoviePosters(movieListArray){

    moviePostersDiv.innerHTML = "";

    headingTag.style.display = "flex";

    // using higher order function
    movieListArray?.forEach(function(movies){

        const posterMainDiv = document.createElement("div");
        const posterImageDiv = document.createElement("div");
        const posterDetailsDiv = document.createElement("div");

        posterMainDiv.classList.add("bborder-transparent", "h-full","flex","flex-col","justify-between","rounded-lg","shadow-xl","cursor-pointer","hover:shadow-md");

        // event for mouse hover and showing movie poster while hovering
        posterMainDiv.addEventListener("mouseover",function(){

            hoverBox.innerHTML = "";

            const hoverDiv = document.createElement("div");

            hoverDiv.classList.add("border-transparent","h-full","w-[20%]","mx-auto","shadow-md","rounded-lg");

            const hoverImageDiv = document.createElement("div");
            hoverImageDiv.classList.add("border-transparent","h-40");

            const hoverImageTag = document.createElement("img");
            hoverImageTag.src = movies.Poster;
            hoverImageTag.classList.add("h-full","w-full");
            hoverImageDiv.append(hoverImageTag);

            const watchNowDiv = document.createElement("div");
            watchNowDiv.classList.add("border-transparent","h-20");

            const watchNowButton = document.createElement("button");
            watchNowButton.textContent = "Watch Now";
            watchNowButton.classList.add("shadow-md","h-[5rem]","w-full","bg-black","text-white","text-center","italic","p-2","text-2xl");
            watchNowDiv.append(watchNowButton);

            hoverDiv.append(hoverImageDiv,watchNowDiv);

            hoverBox.append(hoverDiv);

        });

        // event for mouse leave hovering
        posterMainDiv.addEventListener("mouseleave",onMouseLeave);


        posterImageDiv.classList.add("border-transparent","h-60","rounded-lg","cursor-pointer");

        posterDetailsDiv.classList.add("border-transparent","h-40","rounded-lg","px-2","relative");

        // creating image tag for showing movie images
        const imgTag = document.createElement("img");
        imgTag.src = movies.Poster;
        imgTag.classList.add("h-full","w-full","rounded-lg");

        // appending image tag into image main div
        posterImageDiv.append(imgTag);

        // movie title
        const movieTiltePTag = document.createElement("p");
        movieTiltePTag.textContent = movies.Title;
        movieTiltePTag.classList.add("font-bold","italic","text-lg","text-fuchsia-600");

        // release date
        const releaseDatePTag = document.createElement("p");
        releaseDatePTag.innerHTML = `RELEASE DATE: ${movies.Year}`;
        releaseDatePTag.classList.add("font-semibold","text-lg","italic","text-green-600");

        // Imdb rating
        const imdb_randomNumbers = document.createElement("p");
        imdb_randomNumbers.textContent = Math.round(Math.random() * 10);
  
        const imdb_rating = document.createElement("p");
        imdb_rating.textContent = `IMDB: ${imdb_randomNumbers.textContent}`;
        imdb_rating.classList.add("font-semibold","text-lg","italic","text-red-500");
  
        // appending movie title, release date and imdb rating into details main div.
        posterDetailsDiv.append(movieTiltePTag,releaseDatePTag,imdb_rating);

        // appending images main div and details main div into poster main div
        posterMainDiv.append(posterImageDiv,posterDetailsDiv);

        // appending poster main div into movie poster div
        moviePostersDiv.append(posterMainDiv);

    });
}

// function for clear search icon
function clearSearchIcon(){
    searchBar.value = null;
    movieListDiv.style.display = "none";
}

// function for mouse leave
function onMouseLeave(){
    hoverBox.innerHTML = "";
}
