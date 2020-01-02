export default class Movie {
    imdbID = null;
    title = null;
    overview = null;
    genreIds = null;
    posterPath = null;
    backdropPath = null;
    voteAverage = null;
    releaseDate = null;

    constructor(params) {
        this.imdbID = this.imdbID || params.id;
        this.title = this.title || params.title;
        this.overview = this.overview || params.overview;
        this.genreIds = this.genreIds || params.genre_ids;
        this.posterPath = this.posterPath || "https://image.tmdb.org/t/p/original" + params.poster_path;
        this.backdropPath = this.backdropPath || "https://image.tmdb.org/t/p/original" + params.backdrop_path;
        this.voteAverage = this.voteAverage || params.vote_average;
        this.releaseDate = this.releaseDate || params.release_date;
    }
}