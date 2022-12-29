import React, { useEffect, useState } from 'react';

function App() {
  const [text, setText] = useState("");
  const updateText = (name) => {
    setText(name);
    console.log(text);
  }
  return (
    <div>
      <input onChange={ (e) => (updateText(e.target.value)) }></input>
      <h1>My name is: { text }</h1>
    </div>
  );
}

export default App;
