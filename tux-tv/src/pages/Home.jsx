import { SearchBar } from "../components/SearchBar";

export default function Home() {
    return (
        <div className="page page--home">
            <h1 className="page__title">Qual filme você está procurando?</h1>
            <SearchBar size="large" />
        </div>
    );
}