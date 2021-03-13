import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useSpeechSynthesis } from 'react-speech-kit';
import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

const App = () => {

  const commands = [
    {
      command: '*',
      callback: (userSpeak) => setMyPhrase(userSpeak)
    },
  ]
  const { transcript, resetTranscript } = useSpeechRecognition({ commands });
  const { speak } = useSpeechSynthesis();
  const [chatOn, setchatOn] = useState(false)
  const [myPhrase, setMyPhrase] = useState('')
  const [botPhrase, setBotPhrase] = useState('')
  const [phraseOnScreen, setPhraseOnScreen] = useState('')

  useEffect(() => {
    if (myPhrase !== '') {
      resetTranscript()
      setPhraseOnScreen(myPhrase)
      console.log(`myPhrase on ${myPhrase}`)
      speak({ text: myPhrase })
      setMyPhrase('')
    }
  }, [myPhrase])

  useEffect(() => {
    if (botPhrase !== '') {
      setPhraseOnScreen(botPhrase)
      console.log(`botPhrase on ${botPhrase}`)
      speak({ text: botPhrase })
      setBotPhrase('')
    }
  }, [botPhrase])

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="mircophone-container">
        Browser is not Support Speech Recognition.
      </div>
    );
  }

  const handleChatOn = () => {
    setchatOn(!chatOn)
    setBotPhrase(`What's on Your Mind?`)
    SpeechRecognition.startListening({
      continuous: true,
      language: 'en-US',
    });
  }
  const handleChatOff = () => {
    SpeechRecognition.stopListening();
    resetTranscript();
    setchatOn(!chatOn)
  }
  const notSoFast = (e) => {
    setMyPhrase(`hey dont leave we can talk more`)
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
              <p>{phraseOnScreen}</p>
            }
          </div>
          :
          <div>
            <img src={logo} className="App-logo-stop" alt="logo" onClick={handleChatOn} />
            <p>Click logo to start boilerplate chat...</p>
          </div>
        }
        <a
          className="App-link"
          href="https://github.com/Pinosto/boilerplate-chat"
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
