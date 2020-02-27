export default class Movie {
    userMovieId = null;
    imdbID = null;
    title = null;
    overview = null;
    genreIds = null;
    posterPath = null;
    backdropPath = null;
    voteAverage = null;
    releaseDate = null;
    tagline = null;
    favorite = null;

    getPath(path) {
        regpexp = new RegExp(/https:\/\/image.tmdb.org\/t\/p\/original/);
        if(path.match(regpexp)) {
            return path;
        } else {
            return `https://image.tmdb.org/t/p/original${path}`;
        }
    }

    constructor(params) {
        // Verify if it's ok with id (userMovie model vs id from movie API)
        this.userMovieId = this.userMovieId || params.id;
        this.imdbID = this.imdbID || params.imdbID || params.id;
        this.title = this.title || params.title;
        this.overview = this.overview || params.overview;
        this.genreIds = this.genreIds || params.genre_ids;
        this.posterPath = this.posterPath || this.getPath(params.poster_path);
        this.backdropPath = this.backdropPath || this.getPath(params.backdrop_path);
        this.voteAverage = this.voteAverage || params.vote_average;
        this.releaseDate = this.releaseDate || params.release_date;
        this.tagline = this.tagline || params.tagline;
        this.favorite = this.favorite || params.favorite;
    }
}