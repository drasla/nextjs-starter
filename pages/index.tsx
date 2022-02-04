import {useEffect, useState} from "react";
import Seo from "../components/Seo";

const API_KEY = "10923b261ba94d897ac6b81148314a3f";

export default function Home() {
    const [movies, setMovies] = useState();
    useEffect(() => {
        (async () => {
            const { results } = await (
                await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
            ).json();

            setMovies(results);
        })();
    }, []);

    /* TODO: map 인터페이스 설정에 대해서 물어보기 */

    return (
        <div>
            <Seo title={"home"}/>
            {!movies && <h4>Loading...</h4>}
            {movies?.map((movie: MovieType) => (
                <div key={movie.id}>
                    <h4>{movie.original_title}</h4>
                </div>
            ))}
        </div>
    );
};

export interface MoviesType {
    page: number,
    results: MovieType
}

export interface MovieType {
    adult: boolean,
    backdrop_path: string,
    genre_ids: [number],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}