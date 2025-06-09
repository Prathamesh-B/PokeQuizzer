import pokedexHeader from "../assets/header.svg";

const Header = () => {
  return (
    <header id="header" className="mb-0 flex flex-col items-center px-0 pt-0">
      <img src={pokedexHeader} alt="Pokedex Header" className="h-auto w-full" />
    </header>
  );
};

export default Header;
