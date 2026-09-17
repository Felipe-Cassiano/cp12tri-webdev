import { useState } from "react";
import { useNavigate } from "react-router";
import { searchMovie } from "../api/tmdb";

export function useMovieSearch() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function search(query) {
        const trimmed = query.trim();
        if (!trimmed) return;

        setLoading(true);
        try {
            const movie = await searchMovie(trimmed);
            if (movie) {
                navigate(`/movie/${movie.id}`);
            } else {
                navigate(`/not-found?q=${encodeURIComponent(trimmed)}`);
            }
        } catch (err) {
            console.error(err);
            // aqui dá pra decidir: mostrar um toast de erro, redirecionar pra not-found, etc.
        } finally {
            setLoading(false);
        }
    }

    return { search, loading };
}