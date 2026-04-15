import { useState } from 'react';

const LOCATIONS = [
  { id: 1, label: '🍲 건대 하이디라오' },
  { id: 2, label: '🍲 명동 하이디라오' },
  { id: 3, label: '🤷 에라 모르겠다' },
];

function VotingPanel() {
  const [votes, setVotes] = useState({ 1: 0, 2: 0, 3: 0 });
  const [myVote, setMyVote] = useState(null);

  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);

  const handleVote = (id) => {
    if (myVote === id) return;
    setVotes(prev => {
      const next = { ...prev };
      if (myVote !== null) next[myVote] -= 1;
      next[id] += 1;
      return next;
    });
    setMyVote(id);
  };

  const handleCancel = () => {
    if (myVote === null) return;
    setVotes(prev => ({ ...prev, [myVote]: prev[myVote] - 1 }));
    setMyVote(null);
  };

  const getRank = () => {
    return [...LOCATIONS].sort((a, b) => votes[b.id] - votes[a.id]);
  };

  return (
    <div className="voting-wrap">
      {/* 투표 패널 */}
      <div className="voting-panel">
        <h3>📍 만날 장소 투표</h3>
        <div className="vote-options">
          {LOCATIONS.map(({ id, label }) => (
            <button
              key={id}
              className={`vote-btn ${myVote === id ? 'voted' : ''}`}
              onClick={() => handleVote(id)}
            >
              {label}
              {myVote === id && <span className="check">✓ 내 투표</span>}
            </button>
          ))}
        </div>
        {myVote !== null && (
          <button className="cancel-btn" onClick={handleCancel}>
            🗑 투표 취소
          </button>
        )}
      </div>

      {/* 결과 패널 */}
      <div className="result-panel">
        <h3>📊 실시간 결과</h3>
        {totalVotes === 0 ? (
          <p className="no-votes">아직 투표가 없어요!</p>
        ) : (
          <div className="results">
            {getRank().map((loc, idx) => {
              const count = votes[loc.id];
              const pct = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
              return (
                <div key={loc.id} className="result-item">
                  <div className="result-header">
                    <span className="rank">
                      {idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}
                    </span>
                    <span className="result-label">{loc.label}</span>
                    <span className="result-count">{count}표 ({pct}%)</span>
                  </div>
                  <div className="bar-bg">
                    <div
                      className="bar-fill"
                      style={{ width: `${pct}%`, opacity: idx === 0 ? 1 : 0.6 }}
                    />
                  </div>
                </div>
              );
            })}
            <p className="total">총 {totalVotes}명 참여</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default VotingPanel;
