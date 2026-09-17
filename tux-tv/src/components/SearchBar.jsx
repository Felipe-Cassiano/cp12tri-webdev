import { useState } from "react";
import { useMovieSearch } from "../hooks/useMovieSearch";
import { FiArrowUp, FiLoader } from "react-icons/fi";

export function SearchBar({
    size = "large",
    initialValue = "",
    ButtonIcon = FiArrowUp,
    LoadingIcon = FiLoader,
}) {
    const [value, setValue] = useState(initialValue);
    const { search, loading } = useMovieSearch();

    function handleSubmit(e) {
        e.preventDefault();
        search(value);
    }

    const Icon = loading ? LoadingIcon : ButtonIcon;

    return (
        <form onSubmit={handleSubmit} className={`search-bar search-bar--${size}`}>
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Buscar filme..."
                disabled={loading}
                className="search-bar__input"
            />
            <button type="submit" disabled={loading} className="search-bar__button">
                <Icon className={loading ? "search-bar__icon--spinning" : "search-bar__icon"} />
            </button>
        </form>
    );
}