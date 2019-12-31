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
          <span>
          <label>Data Morte &nbsp;</label>
          </span>
          <InputData id="DataMorte" value={date2} onChange={setDate2}/>
        </div>
        <div>

        </div>
        
      </form>
    </div>
  );
}

export default App;
