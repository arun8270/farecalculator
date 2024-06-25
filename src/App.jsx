import { useState } from 'react';
import './App.css';

function FormulaItem() {
  return (
    <div className="formula-item">
      <div className="formula-header">Actual Fare Calculation Explanation</div>
      <div className = 'formula-body'>
      <div className="formula-body-content">
        Actual Fare = Initial Fare + KM Fare + Travel Time Fare + GST(Initial
        Fare + KM Fare + Travel Time Fare) + Booking Convenience Fee + Booking
        Convenience Fee CGST + Booking Convenience Fee SGST
      </div>
      </div>
      
    </div>
  );
}

function FormulaAccordian() {
  return (
    <div className="formula-accordian">
      <h2>Fare Formula's</h2>
      <FormulaItem />
      <FormulaItem />
      <FormulaItem />
      <FormulaItem />
    </div>
  );
}
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <FormulaAccordian />
    </>
  );
}

export default App;
