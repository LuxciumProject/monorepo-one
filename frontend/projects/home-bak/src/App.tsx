import React from 'react';
import AddUser from './components/Users/AddUser';

import './App.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AddUser />
      </header>
    </div>
  );
}

export default App;
  // const [fetchedData, setFetchedData] = useState([] as any[]);

  // function fetchDataHandler() {
  //   fetch(`${hostName}api`)
  //     .then(response => response.text())
  //     .then(data => setFetchedData([data]));
  // }

        // {/* <ColorCard property="editorError.border" hex="#FFFFFF" />
        // <button onClick={fetchDataHandler}>Test Fetch</button>
        // <ul>
          // {fetchedData.map((data, index) => (
            // <li key={index}> {data} </li>
          // ))}
        // </ul>{' '} */}
