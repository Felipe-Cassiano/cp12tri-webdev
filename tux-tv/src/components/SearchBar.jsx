import { useState } from "react";
import { useMovieSearch } from "../hooks/useMovieSearch";

export function SearchBar({ size = "large", initialValue = "" }) {
    const [value, setValue] = useState(initialValue);
    const { search, loading } = useMovieSearch();

    function handleSubmit(e) {
        e.preventDefault();
        search(value);
    }

    return (
        <form onSubmit={handleSubmit} className={`search-bar search-bar--${size}`}>
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Buscar filme..."
                disabled={loading}
            />
            <button type="submit" disabled={loading}>
                {loading ? "Buscando..." : "Buscar"}
            </button>
        </form>
    );
}