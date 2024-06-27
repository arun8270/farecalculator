import { useState } from 'react';
import './App.css';

let formulas = [{ id : 1, question : 'Total Fare', formula : 'Initial Fare(Base Fare) + KM Fare + Travel Time Fare '} ,{id : 2, question : 'GST on Total Fare',
formula : '(Initial Fare + KM fare + Travel Time Fare) * GST %'} , {id : 3, question : 'Net Fare', formula : 'totalFare + GST'} ,
  {id : 4, question : 'Grand Total', formula : 'netFare + Booking Convenience Fee + Booking Convenience Fee CGST + Booking Convenience Fee + Booking Convenience Fee SGST'
}]


function FormulaItem({question, answer}) {
  const [show, setShow] = useState(false);
  const toggleShow = ()=>{
    setShow(!show)
  }
  return (
    <div className={`formula-item ${show ? 'active' : ''}`}>
      <div className="formula-header" onClick={toggleShow}>{question}</div>
      <div className = 'formula-body'>
      <div className="formula-body-content">
        {answer}
      </div>
      </div>
      
    </div>
  );
}

function FormulaAccordian({formulas}) {
  return (
    <div className="formula-accordian">
      <h2>Fare Formula's</h2>
      {formulas.map((item => (<FormulaItem key = {item.id} question = {item.question} answer = {item.formula} />)))}
    </div>
  );
}
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <FormulaAccordian formulas = {formulas} />
    </>
  );
}

export default App;
