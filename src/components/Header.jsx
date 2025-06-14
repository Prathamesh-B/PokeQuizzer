import pokedexHeader from "../assets/header.svg";

const Header = () => {
  return (
    <header id="header" className="flex flex-col items-center">
      <img src={pokedexHeader} alt="Pokedex Header" className="h-auto w-full" />
    </header>
  );
};

export default Header;
