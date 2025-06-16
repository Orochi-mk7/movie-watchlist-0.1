const postsContainerEl = document.getElementById('posts-container')
export function renderResults (data, isWatchlist) {
    let watchlistIcon = ``
    if (isWatchlist) {
        watchlistIcon = `imgs/remove-icon.svg`
    }
    else {
        watchlistIcon = `imgs/Icon.svg`
    }
    let htmlString = ``
    data.forEach(result => {
        console.log(result)
        let rating = result.Ratings[0].Value
        let  displayedRating = rating.split("/")[0];
         htmlString +=`
    <div class="item-container">
                <div class="poster-container">
                    <img class="img-poster" src="${result.Poster}">
                </div>
                <div class="item-breakdown">
                    <div class="item-title">
                        <h2 class="movie-title">${result.Title}</h2>
                        <div>
                            <img src="imgs/star-icon.png">
                            <span>${displayedRating}</span>
                        </div>
                    </div>
                    <div class="item-info">
                        <p>${result.Runtime}</p>
                        <p>${result.Genre}</p>
                        <div class="watchlist-btn" id="watchlist-btn" role="button" data-movie="${result.Title}">
                            <img src="${watchlistIcon}" class="watchlist-icon"> 
                            <span>Watchlist</span>
                        </div>
                    </div>
                    <div class="item-discrption">
                        <p>${result.Plot}</p>
                    </div>
                </div>
            </div>
            `})
            postsContainerEl.innerHTML = htmlString
}
