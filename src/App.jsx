import { useState } from 'react';
import './App.css';

let formulas = [
{ id : 1, question : 'What is Estimated Fare ?', formula : `Total Fare (Initial Fare + KM Fare + Travel Time Fare + Empty KM Fare)                                                                                  
+  GST on Total Fare + Booking Convenience Fee +  Booking Convenience Fee SGST +  Booking Convenience Fee CGST` } ,
{id : 2, question : 'Flexible Fare Formula?',
formula : '(Initial Fare + KM fare + Travel Time Fare + Waiting Fare) * Flexible Fare % + GST on Flexible Fare. Note : Flexible fare will not apply on Empty KM'},
{ id : 3, question : 'Peak Fare Formula?', formula : `Peak in Base Fare + Peak in KM * Travelled KM + GST on Peak Fare. Note : KM After Limit and Empty KM will not be applicable for Peak in KM` },
{id : 4, question : 'Fare Related Cases ?',
formula : 'Trip Fare Slot, Flexible Fare, Dynamic Fare, Peak Fare, Airport Charges, GST, Convenience Fee, 15 % Scenarios in Chennai, Trip Details, Last trip details(Driver App), User App Invoice, SMS Contents, Cab type Changes, Parking Charges, Trip Conversions(Local to Rental, Rental to Local), Coupon Code'}]


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
      <h2 className='formula-title'>Frequently Asked Questions : </h2>
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
