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
    <div style={{ textAlign: 'left', paddingRight: '4em', position: 'relative' }}>
      {/* Emoji overlay */}
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        pointerEvents: 'none', 
        zIndex: 1000,
        overflow: 'hidden'
      }}>
        {emojis.map(emoji => (
          <div 
            key={emoji.id}
            style={{
              position: 'absolute',
              left: `${emoji.x}%`,
              top: `${emoji.y}%`,
              fontSize: '2rem',
              animation: 'float 2s ease-out forwards',
              zIndex: 1000,
            }}
          >
            {emoji.emoji}
          </div>
        ))}
      </div>

      <header id="header">
        <h1>Coffee Chat</h1>
        <p>
          Let's grab a virtual coffee and chat about AI, startups, or your career.
        </p>
        <div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
          <a 
            href="https://calendar.app.google/UQ1x6RLisATBm64S6" 
            target="_blank" 
            rel="noopener noreferrer"
            className="button"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            style={{ position: 'relative', zIndex: 10 }}
          >
            Schedule a Coffee Chat
          </a>
        </div>
      </header>
      
      <div className="content" style={{ paddingBottom: '3rem' }}>
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
            <a href="https://abnormalsecurity.com/careers" target="_blank" rel="noopener noreferrer">
              Abnormal AI
            </a>
          </li>
          <li><strong>Sales pitches</strong> - This is for genuine conversation, not selling me services</li>
        </ul>

      </div>
    </div>
  );
}

export default CoffeeChat;