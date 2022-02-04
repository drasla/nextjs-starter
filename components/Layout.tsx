import NavBar from "./NavBar";
import React, {ReactElement} from "react";

export default function Layout({children}: LayoutProps) {
    return (
        <>
            <NavBar/>
            <div>{children}</div>
        </>
    );
};

export interface LayoutProps {
    children: ReactElement
};