import { Link, Outlet } from "@tanstack/react-router";
import "./App.css";
import Header from "./components/Header";

function RootLayout() {
    // Phone-like container style
    return (
        <div className="app-bg">
            <div className="phone-container">
                {/* Navigation bar */}
                <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[375px] z-20 bg-gradient-to-t from-poke-red-100 to-poke-yellow-50 border-t border-poke-red-200 shadow-lg flex justify-around py-2">
                    <Link to="/" className="flex flex-col items-center gap-0 px-2 py-1 text-poke-blue-700 hover:text-poke-red-500 transition-colors" activeProps={{ className: 'text-poke-red-600 font-bold' }}>
                        <span role="img" aria-label="Home" className="text-2xl">🏠</span>
                        <span className="font-poke text-xs mt-0.5">Home</span>
                    </Link>
                    <Link to="/quiz" className="flex flex-col items-center gap-0 px-2 py-1 text-poke-blue-700 hover:text-poke-red-500 transition-colors" activeProps={{ className: 'text-poke-red-600 font-bold' }}>
                        <span role="img" aria-label="Quiz" className="text-2xl">❓</span>
                        <span className="font-poke text-xs mt-0.5">Quiz</span>
                    </Link>
                    <Link to="/pokedex" className="flex flex-col items-center gap-0 px-2 py-1 text-poke-blue-700 hover:text-poke-red-500 transition-colors" activeProps={{ className: 'text-poke-red-600 font-bold' }}>
                        <span role="img" aria-label="Pokedex" className="text-2xl">📖</span>
                        <span className="font-poke text-xs mt-0.5 text-poke-red-500">Pokedex</span>
                    </Link>
                    <Link to="/settings" className="flex flex-col items-center gap-0 px-2 py-1 text-poke-blue-700 hover:text-poke-red-500 transition-colors" activeProps={{ className: 'text-poke-red-600 font-bold' }}>
                        <span role="img" aria-label="Settings" className="text-2xl">⚙️</span>
                        <span className="font-poke text-xs mt-0.5">Settings</span>
                    </Link>
                </nav>
                {/* Main content */}
                <Header />
                <Outlet />
            </div>
        </div>
    );
}

export default RootLayout;
