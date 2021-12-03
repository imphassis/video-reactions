import React, { useEffect, useState } from 'react';

import { Button } from 'react-bootstrap';
import socket from '../utils/socketClient';

import '../App.css';

const allButtons = [
  { name: 'love', emoji: 'far fa-grin-hearts' },
  { name: 'surprised', emoji: 'far fa-surprise' },
  { name: 'happy', emoji: 'far fa-laugh-beam' },
  { name: 'sad', emoji: 'far fa-meh-rolling-eyes' },
];

function Home() {
  const [reactions, setReactions] = useState({
    love: { count: 10 },
    surprised: { count: 2 },
    happy: { count: 6 },
    sad: { count: 3 },
  });

  const handleClick = (e) => {
    const { value } = e.target;
    console.log(value);

    socket.emit('sendReaction', { value });
  };

  useEffect(() => {
    socket.on('refreshReactions', (data) => {
      setReactions(data);
    });
  }, [reactions]);

  return (
    <div className="video-section">
      <h1>Reações ao video</h1>

      {/* <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/v3AIvqlOe8o"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe> */}

      <section>
        {allButtons.map((btn) => {
          return (
            <div>
              <Button
                key={btn.name}
                className="emoji-button"
                variant="outline-dark"
                size="lg"
                style={{ fontSize: '2rem', zIndex: '1' }}
                value={btn.name}
                onClick={handleClick}
              >
                <i className={btn.emoji}></i>
              </Button>
              <p>{reactions[btn.name].count}</p>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default Home;
