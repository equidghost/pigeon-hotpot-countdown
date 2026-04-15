import { useState, useEffect } from 'react';

const TARGET = new Date('2026-04-18T17:00:00');

function pad(n) {
  return String(n).padStart(2, '0');
}

function getTimeLeft() {
  const diff = TARGET - new Date();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return (
      <div className="done-message">
        <h2>🔥 허궈 타임! 🔥</h2>
        <p>비둘기 군단 집합!! 🐦🐦🐦</p>
      </div>
    );
  }

  const items = [
    { value: pad(timeLeft.days), label: '일' },
    { value: pad(timeLeft.hours), label: '시간' },
    { value: pad(timeLeft.minutes), label: '분' },
    { value: pad(timeLeft.seconds), label: '초' },
  ];

  return (
    <div className="countdown">
      {items.map(({ value, label }) => (
        <div key={label} className="time-box">
          <div className="time-number">{value}</div>
          <div className="time-label">{label}</div>
        </div>
      ))}
    </div>
  );
}

export default Countdown;
