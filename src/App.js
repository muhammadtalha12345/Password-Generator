import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(8);
  const [numberAllow, setNumberAllow] = useState(false);
  const [charactorAllow, setCharactorAllow] = useState(false);

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = ''
    let str =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllow) str += '0123456789'
    if (charactorAllow) str += '!@#$%^&*()_+{}[]'
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass);

  }, [length, numberAllow, charactorAllow, setPassword])

  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,length)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllow, charactorAllow, passwordGenerator])

  return (
    <div className="App">
      <div className='mainDiv'>
        <div className='passwordDiv'>
          <p>Password Generator</p>
          <input
            type='text'
            placeholder='Password'
            value={password}
            ref={passwordRef}
            readOnly />
          <button onClick={copyPasswordToClipboard}>Copy</button>
        </div>
        <div className='optionDiv'>
        <label>Length: {length}</label>
        <p>Slide to change the length of Password</p>
          <input
            type='range'
            min={8}
            max={50}
            value={length}
            onChange={(e) => { setLength(e.target.value) }} />
          
          <div className='checkboxDiv'>
          <div>
          <input
            type='checkbox'
            defaultChecked={numberAllow}
            onChange={() => { setNumberAllow((prev) => !prev); }} />
          <label>Numbers</label>
          </div>
          <div>
          <input
            type='checkbox'
            defaultChecked={charactorAllow}
            onChange={() => { setCharactorAllow((prev) => !prev); }} />
          <label>Characters</label>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
