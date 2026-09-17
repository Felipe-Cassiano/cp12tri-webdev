const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";

export async function searchMovie(query) {
  const res = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=pt-BR`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        accept: "application/json",
      },
    }
  );

  if (!res.ok) throw new Error("Falha ao buscar filme");

  const data = await res.json();
  return data.results[0] ?? null; // primeiro resultado, ou null se não houver
}

const PLACEHOLDER_POSTER = "/placeholder-poster.png"; // caminho local, dentro de /public

export async function getMovieDetails(id) {
    const [movieRes, providersRes] = await Promise.all([
        fetch(`${BASE_URL}/movie/${id}?language=pt-BR`, {
            headers: { Authorization: `Bearer ${API_KEY}`, accept: "application/json" },
        }),
        fetch(`${BASE_URL}/movie/${id}/watch/providers`, {
            headers: { Authorization: `Bearer ${API_KEY}`, accept: "application/json" },
        }),
    ]);

    if (!movieRes.ok || !providersRes.ok) {
        throw new Error("Falha ao buscar detalhes do filme");
    }

    const movieData = await movieRes.json();
    const providersData = await providersRes.json();

    const brProviders = providersData.results?.BR?.flatrate ?? [];

    return {
        title: movieData.title,
        posterUrl: movieData.poster_path
            ? `${IMG_BASE}${movieData.poster_path}`
            : PLACEHOLDER_POSTER,
        voteAverage: movieData.vote_average,
        overview: movieData.overview,
        providers: brProviders.map((p) => `${IMG_BASE}${p.logo_path}`),
    };
}