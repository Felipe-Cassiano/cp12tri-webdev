import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getMovieDetails } from "../api/tmdb";

export function useMovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let active = true; // evita atualizar estado se o componente desmontar no meio da chamada

        setLoading(true);
        setError(null);

        getMovieDetails(id)
            .then((data) => {
                if (active) setMovie(data);
            })
            .catch((err) => {
                if (active) setError(err);
            })
            .finally(() => {
                if (active) setLoading(false);
            });

        return () => {
            active = false;
        };
    }, [id]);

    return { movie, loading, error };
}