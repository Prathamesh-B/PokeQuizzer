function PokedexPage() {
    const [pokemon, setPokemon] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        async function fetchPokedex() {
            setLoading(true);
            const res = await fetch(
                "https://pokeapi.co/api/v2/pokemon?limit=20"
            );
            const data = await res.json();
            // Fetch details for each
            const details = await Promise.all(
                data.results.map((p) => fetch(p.url).then((r) => r.json()))
            );
            setPokemon(details);
            setLoading(false);
        }
        fetchPokedex();
    }, []);

    if (loading)
        return (
            <div style={{ textAlign: "center", marginTop: 40 }}>Loading...</div>
        );

    return (
        <div className="pokedex-page">
            <h3>Pokedex</h3>
            <div style={{ maxHeight: 400, overflowY: "auto" }}>
                {pokemon.map((p) => (
                    <div
                        key={p.id}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            marginBottom: 12,
                        }}
                    >
                        <img
                            src={p.sprites.front_default}
                            alt={p.name}
                            style={{ width: 48 }}
                        />
                        <div>
                            <div style={{ fontWeight: "bold" }}>
                                {p.name.charAt(0).toUpperCase() +
                                    p.name.slice(1)}
                            </div>
                            <div style={{ fontSize: 12, color: "#b77b7b" }}>
                                {p.types.map((t) => t.type.name).join(", ")}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}