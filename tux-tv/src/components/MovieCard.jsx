import { FiStar } from "react-icons/fi";
import './MovieCard.css'

export function MovieCard({ movie }) {
    const stars = Math.round(movie.voteAverage / 2); // 0-10 → 0-5

    return (
        <div className="movie-card">
            <img src={movie.posterUrl} alt={movie.title} className="movie-card__poster" />

            <div className="movie-card__info">
                <h1 className="movie-card__title">{movie.title}</h1>

                <div className="movie-card__stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <FiStar
                            key={i}
                            className={i < stars ? "star star--filled" : "star"}
                        />
                    ))}
                </div>

                <p className="movie-card__overview">{movie.overview}</p>

                {movie.providers.length > 0 && (
                    <div className="movie-card__providers">
                        {movie.providers.map((logoUrl) => (
                            <img key={logoUrl} src={logoUrl} alt="provider" className="provider-logo" />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}