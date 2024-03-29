import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [inputText, setInputText] = useState('');
    const [submittedText, setSubmittedText] = useState('');
    const [responseText, setResponseText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const apiUrl = "https://chatpostapp-23srkaehza-uc.a.run.app/palm2";
            const proxyUrl = "https://cors-anywhere.herokuapp.com/";

            const headersList = {
                "Content-Type": "application/json",
            };

            const bodyContent = JSON.stringify({
                user_input: inputText,
            });

            const reqOptions = {
                url: proxyUrl + apiUrl,
                method: "POST",
                headers: headersList,
                data: bodyContent,
            };

            const response = await axios.request(reqOptions);
            setSubmittedText(inputText);
            setResponseText(response.data.content); // Assuming the response key is 'content'
            speakText(response.data.content);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const speakText = (text) => {
        const speechSynthesis = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center p-3">
            <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg p-8">
                <h1 className="text-2xl lg:text-3xl font-bold mb-4">Voice AI App</h1>
                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        value={inputText}
                        onChange={handleInputChange}
                        className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none"
                        placeholder="Enter your text here..."
                    />
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none"
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
                {submittedText && (
                    <div className="mt-8">
                        <div className="flex flex-col gap-4">
                            <button
                                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none"
                                onClick={() => speakText(responseText)}
                            >
                                Speak
                            </button>
                            <div className="text-gray-300">{responseText}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
