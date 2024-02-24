import React, { useState, useEffect } from 'react';
import './App.css';

function DrumMachine() {
  const [displayText, setDisplayText] = useState('-');

  useEffect(() => {
    const handleKeyDown = (e) => {
      const pressedKey = e.keyCode;
      const sound = document.querySelector(`[data-key="${pressedKey}"]`);
      if (!sound) return;
      playSound(sound);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleClick = (e) => {
    const sound = e.target.querySelector('audio');
    if (!sound) return;
    playSound(sound);
  };

  const playSound = (sound) => {
    const soundName = sound.getAttribute('data-sound');
    setDisplayText(soundName);

    sound.currentTime = 0;
    sound.play();
    sound.addEventListener('ended', () => {
      sound.parentElement.classList.remove('playing');
    });
    sound.parentElement.classList.add('playing');
  };

  return (
    <div id="drum-machine">
      <p id="display">{displayText}</p>
      <div id="buttons">
        {sounds.map((sound) => (
          <button
            key={sound.key}
            className="drum-pad"
            onClick={handleClick}
            id={sound.key.toUpperCase()}
          >
            {sound.key.toUpperCase()}
            <audio
              data-key={sound.keyCode}
              data-sound={sound.soundName}
              src={sound.soundSrc}
              className="clip"
              id={sound.key.toUpperCase()}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

const sounds = [
  { key: 'Q', keyCode: 81, soundName: 'Heater-1', soundSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
  { key: 'W', keyCode: 87, soundName: 'Heater-2', soundSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
  { key: 'E', keyCode: 69, soundName: 'Heater-3', soundSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
  { key: 'A', keyCode: 65, soundName: 'Heater-4', soundSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
  { key: 'S', keyCode: 83, soundName: 'Clap', soundSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
  { key: 'D', keyCode: 68, soundName: 'Open-HH', soundSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
  { key: 'Z', keyCode: 90, soundName: 'Kick-n-Hat', soundSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
  { key: 'X', keyCode: 88, soundName: 'KICK', soundSrc: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
  { key: 'C', keyCode: 67, soundName: 'Closed-HH', soundSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' }
];

export default DrumMachine;

