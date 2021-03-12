import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useSpeechSynthesis } from 'react-speech-kit';
import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

const App = () => {

  const commands = [
    {
      command: '*',
      callback: (userSpeak) => setphrase(userSpeak)
    },
  ]
  const { transcript, resetTranscript } = useSpeechRecognition({ commands });
  const { speak } = useSpeechSynthesis();
  const [chatOn, setchatOn] = useState(false)
  const [phrase, setphrase] = useState('')

  useEffect(() => {
    if (phrase !== '') {
      resetTranscript()
      console.log(phrase)
      speak({ text: phrase })
    }
  }, [phrase])

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="mircophone-container">
        Browser is not Support Speech Recognition.
      </div>
    );
  }

  const handleChatOn = () => {
    setchatOn(!chatOn)
    SpeechRecognition.startListening({
      continuous: true,
      language: 'en-US',
    });
  }
  const handleChatOff = () => {
    resetTranscript();
    setchatOn(!chatOn)
    SpeechRecognition.stopListening();
  }
  const notSoFast = (e) => {
    e.preventDefault()
    resetTranscript();
    speak({ text: transcript })
    console.log(`dont go`);
  }
  return (
    <div className="App">
      <header className="App-header">
        {chatOn ?
          <div>
            <img src={logo} className="App-logo-run" alt="logo" onClick={handleChatOff} />
            {transcript ?
              <p>{transcript}</p>
              :
              <p>{phrase}</p>
            }
          </div>
          :
          <div>
            <img src={logo} className="App-logo-stop" alt="logo" onClick={handleChatOn} />
            <p>click logo to start boilerplate chat</p>
          </div>
        }
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          onClick={notSoFast}
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
