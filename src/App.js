import React from 'react';
import InputData from './inputdata'
import './App.css';

function App() {
  const [date, setDate] = React.useState("10/11/2019");
  const [date2, setDate2] = React.useState("");
  return (
    <div className="App">
      <form action="">
        <div>
          <div>
          <label>Data Nascimento &nbsp;</label>
          </div>
          <InputData id="DataNascto" value={date} onChange={setDate}/>
        </div>
        <div>
          <div>
          <label>Data Morte &nbsp;</label>
          </div>
          <InputData id="DataMorte" value={date2} onChange={setDate2}/>
        </div>
        
      </form>
    </div>
  );
}

export default App;
