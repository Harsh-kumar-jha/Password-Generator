import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "012345679";
    if (charAllowed) str += "~`!@#$%^&*()_+=|}{[]:;<>?/,.";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const copyToClickBoard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className="w-full max-w-md px-4 py-3 my-8 text-orange-500 bg-gray-700 rounded-lg shadow-md max-auto">
        <h1 className="my-3 text-center text-white">Password Generator</h1>
        <div className="flex mb-4 overflow-hidden rounded-lg shadow ">
          <input
            type="text"
            value={password}
            className="w-full px-3 py-1 outline-none"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="bg-blue-700 outline-none text-white px-3 py-0.5 shrink-0"
            onClick={copyToClickBoard}
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberAllowed"
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label>Number?</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charAllowed"
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label>Character?</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
