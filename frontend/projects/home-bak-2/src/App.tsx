import React from 'react';
// import ColorCard from './components/ColorCard';
import AddUser from './components/Users/AddUser';

import './App.scss';

// const hostName = '';

function App() {
  // const [fetchedData, setFetchedData] = useState([] as any[]);

  // function fetchDataHandler() {
  //   fetch(`${hostName}api`)
  //     .then(response => response.text())
  //     .then(data => setFetchedData([data]));
  // }

  return (
    <div className="App">
      <header className="App-header">
        {/* <ColorCard property="editorError.border" hex="#FFFFFF" />
        <button onClick={fetchDataHandler}>Test Fetch</button>
        <ul>
          {fetchedData.map((data, index) => (
            <li key={index}> {data} </li>
          ))}
        </ul>{' '} */}
        <AddUser />
      </header>
    </div>
  );
}

export default App;
