import Profile from './Profile';
import React, {useState} from 'react';

function App(props) {
  const [displayContent, elegirpersonaje] = useState(<button onClick={() => elegirpersonaje(< Profile name="trisha"/>)} > trisha </button>);
  return (
    displayContent
  );
}

export default App;
