import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const App = () => {

  const { transcript, resetTranscript } = useSpeechRecognition();
  const [chatOn, setchatOn] = useState(false)

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
    console.log(`dont go`);
  }
  return (
    <div className="App">
      <header className="App-header">
        {chatOn ?
          <div>
            <img src={logo} className="App-logo-run" alt="logo" onClick={handleChatOff} />
            {transcript?
              <p>{transcript}</p>
              :
              <p>rec</p>
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
