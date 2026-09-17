import { useEffect, useState } from "react";
import { getMovieDetails } from "../api/tmdb";

export function useMovieDetails(id) {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        getMovieDetails(id)
            .then(setMovie)
            .catch(setError)
            .finally(() => setLoading(false));
    }, [id]);

    return { movie, loading, error };
}