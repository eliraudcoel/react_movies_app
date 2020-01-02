export default class Movie {
    constructor(params) {
        // most wanted
        imdbID = params.imdbID || null;
        title = params.title || null;
        year = params.year || null;
        type = params.type || null;
        poster = params.poster || null;

        // other
        rated = params.rated || null;
        released = params.released || null;
        runtime = params.runtime || null;
        genre = params.genre || null;
        director = params.director || null;
        writer = params.writer || null;
        actors = params.actors || null;
        plot = params.plot || null;
        language = params.language || null;
        country = params.country || null;
        awards = params.awards || null;
        ratings = params.ratings || null;
        metascore = params.metascore || null;
        imdbRating = params.imdbRating || null;
        imdbVotes = params.imdbVotes || null;
        DVD = params.DVD || null;
        boxOffice = params.boxOffice || null;
        production = params.production || null;
        website = params.website || null;
        response = params.response || null;
    }
}