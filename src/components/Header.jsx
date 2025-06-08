import pokedexHeader from '../assets/header.svg';

const Header = () => {
    return (
        <header id="header" className="flex flex-col items-center mb-0 px-0 pt-0">
            <img src={pokedexHeader} alt="Pokedex Header" className="w-full max-w-[393px] h-auto" />
        </header>
    );
};

export default Header;
