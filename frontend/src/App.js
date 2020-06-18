import React from 'react';

import './App.css';
import BillList from './components/BillList';

const BILLS =[
  ["2019", "S8496"],

  //["2019", "S3695"],
  ["2019", "A3566"],
  ["2019", "S2474a"],
  ["2019", "S1830b"],
  ["2019", "S3253"],
  ["2019", "S7527"],
  ["2019", "S4076"],
  ["2019", "S1137a"],
  ["2019", "S2571"],
  ["2019", "S6686"],
  ["2019", "S06793a"],
  ["2019", "S2575b"],
]


function App() {
  return (
    <div className="App">
      <BillList bills={BILLS}/>
    </div>
  );
}

export default App;
