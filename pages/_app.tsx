import NavBar from "../components/NavBar";
import {AppProps} from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <NavBar />
            <Component {...pageProps} />
        </>
    );
};