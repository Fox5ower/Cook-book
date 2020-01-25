import React from 'react';

const App: React.FC = () => {

  fetch("http://localhost:3001")
    .then(response => {
      response.json().then(function (data) {
        console.log('data', data)
      })
    })

  return (
    <div className="App">
      <h1>Client Side</h1>
    </div>
  );
}

export default App;
