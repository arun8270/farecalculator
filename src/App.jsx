import { useState } from 'react';
import './App.css';


let formulas = [{ id : 1, question : 'Estimated Fare Formula', formula : `Total Fare (Initial Fare + KM Fare + Travel Time Fare + Empty KM Fare)                                                                                  
+  GST on Total Fare + Booking Convenience Fee +  Booking Convenience Fee SGST +  Booking Convenience Fee CGST` } ,
{id : 2, question : 'Flexible Fare Formula',
formula : '(Initial Fare + KM fare + Travel Time Fare + Waiting Fare) * Flexible Fare %. Note : Flexible fare will not apply on Empty KM'}]


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
      <h2 className='formula-title'>Fare Formula's </h2>
      {formulas.map((item => (<FormulaItem key = {item.id} question = {item.question} answer = {item.formula} />)))}
    </div>
  );
}
function App() {
  return (
    <>
      <FormulaAccordian formulas = {formulas} />
    </>
  );
}

export default App;
