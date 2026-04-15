import Countdown from './components/Countdown';
import BouncingPigeons from './components/BouncingPigeons';
import VotingPanel from './components/VotingPanel';
import './styles/global.css';

function App() {
  return (
    <>
      <BouncingPigeons />
      <div className="layout" style={{ position: 'relative', zIndex: 1 }}>
        <header className="header">
          <h1>🐦 비둘기 군단의 허궈공략 🔥</h1>
          <p className="subtitle">D-DAY COUNTDOWN</p>
        </header>

        <Countdown />

        <div className="hotpot" aria-label="훠궈">🍲</div>

        <VotingPanel />

        <p style={{ opacity: 0.4, fontSize: '0.8rem' }}>
          2026년 4월 18일 오후 5시 — 비둘기 집합!
        </p>
      </div>
    </>
  );
}

export default App;
