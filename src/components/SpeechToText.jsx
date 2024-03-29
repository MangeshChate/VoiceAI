import React from 'react';

function SpeechToText({ text }) {
    const handleSpeak = () => {
        const speechSynthesis = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
    };

    return (
        <div>
            <button 
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none"
              onClick={handleSpeak}
            >
              Speak
            </button>
            <div className="mt-4 text-gray-300">{text}</div>
        </div>
    );
}

export default SpeechToText;
