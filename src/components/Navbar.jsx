import { Link } from "@tanstack/react-router";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { LuHouse } from "react-icons/lu";

const IconPoke = () => (
    <svg
        className="size-6"
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            stroke="currentColor"
            d="M15.1742 28.3484C22.4503 28.3484 28.3484 22.4503 28.3484 15.1742C28.3484 7.8981 22.4503 2 15.1742 2C7.8981 2 2 7.8981 2 15.1742C2 22.4503 7.8981 28.3484 15.1742 28.3484Z"
            strokeWidth="2.22663"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            stroke="currentColor"
            d="M15.1741 19.1267C16.2223 19.1267 17.2276 18.7103 17.9688 17.9691C18.71 17.2279 19.1264 16.2226 19.1264 15.1744C19.1264 14.1262 18.71 13.121 17.9688 12.3798C17.2276 11.6386 16.2223 11.2222 15.1741 11.2222C14.1259 11.2222 13.1206 11.6386 12.3795 12.3798C11.6383 13.121 11.2219 14.1262 11.2219 15.1744C11.2219 16.2226 11.6383 17.2279 12.3795 17.9691C13.1206 18.7103 14.1259 19.1267 15.1741 19.1267V19.1267Z"
            strokeWidth="2.22663"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            stroke="currentColor"
            d="M2 15.1743H11.222M19.1265 15.1743H28.3484"
            strokeWidth="2.22663"
        />
    </svg>
);

const Navbar = () => {
    return (
        <nav className="bg-linear-to-r from-[#E43839] to-[#CE2034] border-t-[14px] border-[#17262F] drop-shadow-poke-footer shadow-lg flex justify-around py-2">
            <Link to="/quiz">
                <div className="flex flex-col items-center gap-0 px-2 py-1 text-white transition-colors">
                    <FaRegCircleQuestion
                        className="text-2xl"
                        aria-label="Quiz"
                    />
                    <span className="font-lexend text-xs mt-0.5">Quiz</span>
                </div>
            </Link>
            <Link to="/">
                <div className="flex flex-col items-center gap-0 px-2 py-1 text-white transition-colors">
                    <LuHouse className="text-2xl" aria-label="Home" />
                    <span className="font-lexend text-xs mt-0.5">Home</span>
                </div>
            </Link>
            <Link to="/pokedex">
                <div className="flex flex-col items-center gap-0 px-2 py-1 text-white transition-colors">
                    <IconPoke
                        className="text-2xl rotate-180"
                        aria-label="Pokedex"
                    />
                    <span className="font-lexend text-xs mt-0.5">Pokedex</span>
                </div>
            </Link>
            {/* <div className="flex flex-col items-center gap-0 px-2 py-1 text-white transition-colors">
                <IconUser className="text-2xl" aria-label="Settings" />
                <span className="font-lexend text-xs mt-0.5">Settings</span>
            </div> */}
        </nav>
    );
};

export default Navbar;
