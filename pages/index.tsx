import Link from "next/link";
import {useRouter} from "next/router";
import Seo from "../components/Seo";

export default function Home({results}: MoviesType) {
    const router = useRouter();
    const onClick = (id: number, title: string) => {
        router.push(`/movies/${title}/${id}`);
    };

    return (
        <div className="container">
            <Seo title={"home"}/>
            {results?.map((movie: MovieType) => (
                <div onClick={() => onClick(movie.id, movie.title)} className="movie" key={movie.id}>
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/>
                    <Link href={`/movies/${movie.original_title}/${movie.id}`} key={movie.id}>
                        <a><h4>{movie.original_title}</h4></a>
                    </Link>
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

export async function getServerSideProps() {
    const {results}: MoviesType = await (
        await fetch(`http://localhost:3000/api/movies`)
    ).json();
    return {
        props: {
            results,
        },
    };
}

export interface MoviesType {
    page: number,
    results: MovieType[]
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