import {useEffect, useState} from "react";
import Seo from "../components/Seo";

export default function Home() {
    const [movies, setMovies] = useState();
    useEffect(() => {
        (async () => {
            const {results} = await (
                await fetch("/api/movies")
            ).json();

            setMovies(results);
        })();
    }, []);

    /* TODO: map 인터페이스 설정에 대해서 물어보기 */

    return (
        <div className="container">
            <Seo title={"home"}/>
            {!movies && <h4>Loading...</h4>}
            {movies?.map((movie: MovieType) => (
                <div className="movie" key={movie.id}>
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>
                    <h4>{movie.original_title}</h4>
                </div>
            ))}
            <style jsx>{`
              .container {
                display: grid;
                grid-template-columns: 1fr 1fr;
                padding: 20px;
                gap: 20px;
              }

              .movie img {
                max-width: 100%;
                border-radius: 12px;
                transition: transform 0.2s ease-in-out;
                box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
              }

              .movie:hover img {
                transform: scale(1.05) translateY(-10px);
              }

              .movie h4 {
                font-size: 18px;
                text-align: center;
              }
            `}
            </style>
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