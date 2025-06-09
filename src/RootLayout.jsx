import { Outlet } from "@tanstack/react-router";
import "./App.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

function RootLayout() {
    return (
        <div className="app-bg">
            <div className="phone-container flex flex-col justify-between h-full max-h-screen ">
                <Header />
                <Outlet /> 
                <Navbar />
            </div>
        </div>
    );
}

export default RootLayout;
