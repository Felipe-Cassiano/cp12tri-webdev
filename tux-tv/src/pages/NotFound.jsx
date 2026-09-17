import { useSearchParams } from "react-router";
import { SearchBar } from "../components/SearchBar";
import "./NotFound.css";

export default function NotFound() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") ?? "";

    return (
        <div className="page page--not-found">
            <SearchBar size="compact" initialValue={query} />

            <p className="page__status">
                {query
                    ? `Nenhum filme encontrado para "${query}".`
                    : "Nenhum filme encontrado."}
            </p>
        </div>
    );
}