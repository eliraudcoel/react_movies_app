export default class Movie {
    imdbID = null;
    title = null;
    overview = null;
    year = null;
    poster = null;
    backdrop = null;
    voteAverage = null;
    releaseDate = null;

    constructor(params) {
        this.imdbID = this.imdbID || params.id;
        this.title = this.title || params.title;
        this.overview = this.overview || params.overview;
        this.genreIds = this.genreIds || params.genre_ids;
        this.poster = this.poster || params.poster_path;
        this.backdrop = this.backdrop || params.backdrop_path;
        this.voteAverage = this.voteAverage || params.vote_average;
        this.releaseDate = this.releaseDate || params.release_date;
    }
}