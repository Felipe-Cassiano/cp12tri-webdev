import { SearchBar } from "../components/SearchBar";
import { MovieCard } from "../components/MovieCard";
import { useMovieDetails } from "../hooks/useMovieDetails";

export default function MovieDetails() {
    const { movie, loading, error } = useMovieDetails();

    return (
        <div className="page page--details">
            <SearchBar size="compact" />

            {loading && <p className="page__status">Carregando...</p>}
            {error && <p className="page__status">Não foi possível carregar o filme.</p>}
            {movie && <MovieCard movie={movie} />}
        </div>
    );
}