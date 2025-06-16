import {renderResults} from "./reusable.js"

const formBtn = document.getElementById('form-btn')
const movieSearch = document.getElementById('movie-search')
const postsContainerEl = document.getElementById('posts-container')
let displayedList = []

formBtn.addEventListener('click', handleSubmitClick)
document.addEventListener('click', handleWatchList)
function handleWatchList(e) {
    console.log('i am running')
    let movieArray = []
    if(e.target.closest('.watchlist-btn')) {
        let movie = e.target.closest('.watchlist-btn').dataset.movie
        if (!localStorage.getItem('movies')) {       
        movieArray.push(movie)
        localStorage.setItem("movies", JSON.stringify(movieArray))
        }

        else {
            let movieData = JSON.parse(localStorage.getItem("movies"))
            console.log(movieData)
            console.log(typeof(movieData))
            if (!movieData.includes(movie)) {
               movieData.push(movie)
               localStorage.setItem("movies", JSON.stringify(movieData)) 
            }

        }
    }
}
function handleSubmitClick(e) {
    e.preventDefault()
    let search = movieSearch.value
    fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=729e5f49&s=${search}`)
    .then(res => res.json())
    .then(data => getDetailedinfo(data))
}

function getDetailedinfo(items) {
    displayedList = []
    let movieArr = []
    let completed = 0
    if (!items.Error) {
    items.Search.forEach(element => {
        fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=729e5f49&t=${element.Title}`)
        .then(res => res.json())
        .then(data => {

            if(data.Poster && data.Title && data.Ratings?.[0]?.Value  && data.Runtime && data.Genre) {
            movieArr.push(data)
            }

            completed++
            if (completed === items.Search.length) {
                const checkDuplicate = new Set()
                const nonReapted = movieArr.filter(movie => {
                    if (checkDuplicate.has(movie.Title)) return false
                    checkDuplicate.add(movie.Title)
                    return true})

                    renderResults(nonReapted, false)
                }
                })
    })}   
    else {
        postsContainerEl.innerHTML = `<div class="no-data-div"><span class="no-data-text">Unable to find what you’re looking for. Please try another search.</span></div>`
    }   
    };
    
