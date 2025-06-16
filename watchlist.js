import {renderResults} from "./reusable.js"

const postsContainerEl = document.getElementById('posts-container')

function getWatchlist () {
    let movieData = JSON.parse(localStorage.getItem("movies"))
    detailedWatchlist(movieData)
    
}

function detailedWatchlist (movieData) {
    let movieArray = []
    let completed = 0
    movieData.forEach(movie => {
        fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=729e5f49&t=${movie}`)
        .then(res => res.json())
        .then(data => {
            movieArray.push(data)
            completed++
            if (completed === movieData.length) {
                renderResults(movieArray, true)
            }
    })
    })
    
}

getWatchlist()

document.addEventListener('click', handleWatchList)
function handleWatchList(e) {
    if(e.target.closest('.watchlist-btn')) {
        let movie = e.target.closest('.watchlist-btn').dataset.movie

            let movieData = JSON.parse(localStorage.getItem("movies"))
            let newWatchlist = movieData.filter((item) =>{
                if (item === movie) return false
                else return true
            } )
            console.log(newWatchlist)
            localStorage.setItem("movies", JSON.stringify(newWatchlist))
            getWatchlist()
    }
}

