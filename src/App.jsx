import React, { useState } from 'react';
import './App.css';

function App() {
  // Simple navigation state
  const [page, setPage] = useState('home');

  // Phone-like container style
  return (
    <div className="app-bg">
      <div className="phone-container">
        {/* Navigation bar */}
        <nav className="bottom-nav">
          <button onClick={() => setPage('home')} className={page === 'home' ? 'active' : ''}>Home</button>
          <button onClick={() => setPage('quiz')} className={page === 'quiz' ? 'active' : ''}>Quiz</button>
          <button onClick={() => setPage('pokedex')} className={page === 'pokedex' ? 'active' : ''}>Pokedex</button>
          <button onClick={() => setPage('settings')} className={page === 'settings' ? 'active' : ''}>Settings</button>
        </nav>
        {/* Main content */}
        <div className="main-content">
          {page === 'home' && (
            <div className="home-page">
              <h2>Pokemon Type Quiz</h2>
              <p>Test your knowledge of Pokemon types with this fun quiz. Can you identify the type of each Pokemon?</p>
              <button className="primary-btn" onClick={() => setPage('quiz')}>Start Quiz</button>
            </div>
          )}
          {page === 'quiz' && (
            <QuizPage />
          )}
          {page === 'pokedex' && (
            <PokedexPage />
          )}
          {page === 'settings' && (
            <div className="settings-page">
              <h2>Settings (Coming Soon)</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function QuizPage() {
  // Quiz state
  const [loading, setLoading] = React.useState(true);
  const [question, setQuestion] = React.useState(null);
  const [choices, setChoices] = React.useState([]);
  const [answer, setAnswer] = React.useState(null);
  const [result, setResult] = React.useState(null);

  React.useEffect(() => {
    // Fetch a random pokemon from pokeapi
    async function fetchQuestion() {
      setLoading(true);
      const id = Math.floor(Math.random() * 151) + 1; // Gen 1
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();
      setQuestion(data);
      // Get all types for choices
      const allTypes = [
        'normal','fire','water','electric','grass','ice','fighting','poison','ground','flying','psychic','bug','rock','ghost','dragon','dark','steel','fairy'
      ];
      // Shuffle and pick 3 wrong + 1 correct
      let wrong = allTypes.filter(t => !data.types.map(tp => tp.type.name).includes(t));
      wrong = wrong.sort(() => 0.5 - Math.random()).slice(0, 3);
      const correct = data.types[0].type.name;
      const options = [...wrong, correct].sort(() => 0.5 - Math.random());
      setChoices(options);
      setAnswer(correct);
      setLoading(false);
    }
    fetchQuestion();
  }, []);

  function handleChoice(choice) {
    setResult(choice === answer ? 'correct' : 'wrong');
  }

  if (loading) return <div style={{textAlign:'center',marginTop:40}}>Loading...</div>;
  if (!question) return null;

  return (
    <div className="quiz-page">
      <h3>Which type is <span style={{color:'#e53935'}}>{question.name.charAt(0).toUpperCase()+question.name.slice(1)}</span>?</h3>
      <img src={question.sprites.front_default} alt={question.name} style={{width:96,display:'block',margin:'16px auto'}} />
      <div style={{display:'flex',flexDirection:'column',gap:16}}>
        {choices.map(c => (
          <button key={c} className="primary-btn" style={{background: result && c===answer ? '#43a047' : undefined}} onClick={() => handleChoice(c)} disabled={!!result}>{c.charAt(0).toUpperCase()+c.slice(1)}</button>
        ))}
      </div>
      {result && (
        <div style={{marginTop:24,textAlign:'center',color: result==='correct'?'#43a047':'#e53935',fontWeight:'bold'}}>
          {result==='correct' ? 'Correct!' : `Wrong! Answer: ${answer.charAt(0).toUpperCase()+answer.slice(1)}`}
        </div>
      )}
    </div>
  );
}

function PokedexPage() {
  const [pokemon, setPokemon] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchPokedex() {
      setLoading(true);
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
      const data = await res.json();
      // Fetch details for each
      const details = await Promise.all(data.results.map(p => fetch(p.url).then(r => r.json())));
      setPokemon(details);
      setLoading(false);
    }
    fetchPokedex();
  }, []);

  if (loading) return <div style={{textAlign:'center',marginTop:40}}>Loading...</div>;

  return (
    <div className="pokedex-page">
      <h3>Pokedex</h3>
      <div style={{maxHeight:400,overflowY:'auto'}}>
        {pokemon.map(p => (
          <div key={p.id} style={{display:'flex',alignItems:'center',gap:12,marginBottom:12}}>
            <img src={p.sprites.front_default} alt={p.name} style={{width:48}} />
            <div>
              <div style={{fontWeight:'bold'}}>{p.name.charAt(0).toUpperCase()+p.name.slice(1)}</div>
              <div style={{fontSize:12,color:'#b77b7b'}}>{p.types.map(t=>t.type.name).join(', ')}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
