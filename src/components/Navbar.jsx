import { Link, useLocation } from "@tanstack/react-router";
import { FaCircleQuestion, FaRegCircleQuestion } from "react-icons/fa6";
import { MdCatchingPokemon } from "react-icons/md";
import { TbHome, TbHomeFilled } from "react-icons/tb";

const NavItem = ({ to, isActive, activeIcon, inactiveIcon, label }) => (
    <Link to={to}>
        <div
            className={`flex flex-col items-center gap-0 px-2 py-1 text-white transition-colors ${
                isActive ? "text-shadow-lg/30" : ""
            }`}
        >
            {isActive ? activeIcon : inactiveIcon}
            <span className="font-lexend text-xs mt-0.5">{label}</span>
        </div>
    </Link>
);

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-linear-to-r from-[#E43839] to-[#CE2034] border-t-[14px] border-[#17262F] drop-shadow-poke-footer shadow-lg flex justify-around py-2">
            <NavItem
                to="/quiz"
                isActive={isActive("/quiz")}
                activeIcon={<FaCircleQuestion className="text-2xl" aria-label="Quiz" />}
                inactiveIcon={<FaRegCircleQuestion className="text-2xl" aria-label="Quiz" />}
                label="Quiz"
            />
            <NavItem
                to="/"
                isActive={isActive("/")}
                activeIcon={<TbHomeFilled className="text-2xl" aria-label="Home" />}
                inactiveIcon={<TbHome className="text-2xl" aria-label="Home" />}
                label="Home"
            />
            <NavItem
                to="/pokedex"
                isActive={isActive("/pokedex")}
                activeIcon={<MdCatchingPokemon className="text-2xl" aria-label="Pokedex" />}
                inactiveIcon={<MdCatchingPokemon className="text-2xl rotate-180" aria-label="Pokedex" />}
                label="Pokedex"
            />
        </nav>
    );
};

export default Navbar;
