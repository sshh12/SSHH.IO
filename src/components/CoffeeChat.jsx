import React, { useState, useEffect } from 'react';
import './Index.css';

function CoffeeChat() {
  const [emojis, setEmojis] = useState([]);
  const [isHovering, setIsHovering] = useState(false);

  const emojiList = ['🤖', '☕', '💬', '🚀', '💡', '🎯', '✨', '🔥', '💪', '🎉'];

  useEffect(() => {
    let interval;
    if (isHovering) {
      interval = setInterval(() => {
        const newEmoji = {
          id: Math.random(),
          emoji: emojiList[Math.floor(Math.random() * emojiList.length)],
          x: Math.random() * 100,
          y: Math.random() * 100,
        };
        setEmojis(prev => [...prev, newEmoji]);

        setTimeout(() => {
          setEmojis(prev => prev.filter(e => e.id !== newEmoji.id));
        }, 2000);
      }, 150);
    } else {
      setEmojis([]);
    }

    return () => clearInterval(interval);
  }, [isHovering]);

  return (
    <div className="page">
      <a href="/" className="page-back">&larr; Back</a>
      <h1 className="page-title">Coffee Chat</h1>
      <p className="coffee-subtitle">Let's grab a virtual coffee and chat about AI, startups, or your career.</p>

      <div className="coffee-cta">
        <a
          href="https://calendar.app.google/UQ1x6RLisATBm64S6"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-button"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          Schedule a Coffee Chat ☕
        </a>
      </div>

      <div className="coffee-content">
        <h2>What I'm excited to discuss</h2>
        <ul>
          <li><strong>AI & Agents</strong> - Latest developments, practical applications, industry insights</li>
          <li><strong>Career advice</strong> - Navigating tech careers, transitioning into AI/ML</li>
          <li><strong>Demo feedback</strong> - Get thoughts on your AI projects or startup ideas</li>
          <li><strong>Industry perspectives</strong> - AI landscape, market trends, technical challenges</li>
        </ul>

        <h2>Who typically reaches out</h2>
        <p>
          I regularly chat with <strong>students</strong> exploring AI careers, <strong>startup founders</strong> building
          AI products, and <strong>VCs/investors</strong> seeking industry perspectives.
        </p>

        <h2>Where</h2>
        <p>
          Available for virtual chats or in-person coffee in <strong>San Francisco</strong> (Embarcadero/Montgomery area).
        </p>

        <h2>What this isn't for</h2>
        <ul>
          <li><strong>Recruitment</strong> - I'm not looking to join another AI startup right now</li>
          <li><strong>Pure referrals</strong> - You will not get a referral from a coffee chat. Happy to give general advice, and if you're interested in opportunities, apply directly to{' '}
            <a href="https://abnormal.ai/careers" target="_blank" rel="noopener noreferrer">
              Abnormal AI
            </a>
          </li>
          <li><strong>Sales pitches</strong> - This is for genuine conversation, not selling me services</li>
        </ul>
      </div>

      {/* Emoji overlay */}
      <div className="emoji-overlay">
        {emojis.map(emoji => (
          <div
            key={emoji.id}
            className="emoji-float"
            style={{
              left: `${emoji.x}%`,
              top: `${emoji.y}%`,
            }}
          >
            {emoji.emoji}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoffeeChat;
