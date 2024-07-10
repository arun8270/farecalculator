import {React, useState} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

let totalFare, grandtotal, flexibleFareTotal;
function FareCalculate() {
  let[km, setKM] = useState(0);
  let[travelTime, setTravelTime] = useState(0);
  let[emptyKM, setEmptyKM] = useState(0);
  let[actualFare, setActualFare] = useState(0);
  let[flexibleApplied, setFlexibleApplied] = useState(false);
  let[displayFormula, setDisplayFormula] = useState(false);
  let[flexibleFare, setFlexibleFare] = useState(0)
  let[flexiPercentage, setFlexiPercentage] = useState('');
  let[flexiGrandTotal, setFlexiGrandTotal] = useState(0);
  let[driverBidFare, setDriverBidFare] = useState(0);

  //Trip Fare Slot Values

  const fareSlot = {
    initialFreeKM : 2,
    initialFare : 105,
    farePerKM : 15, 
    kmLimit : 5,
    travelTimeFarePerMin : 0,
    farePerKmAfterLimit : 17,
    waitingFarePerMin : 2,
    emptyKmCharge : 10,
    gstPercentage : 5,
    bookingConvenienceFee : 10,
    bookingConvenienceFeeCGSTPercentage : 1,
    bookingConvenienceFeeSGSTPercentage : 1
  }

  //Destructuring the trip fare slot values

  let{ kmLimit, initialFare, initialFreeKM, gstPercentage, farePerKM, farePerKmAfterLimit, travelTimeFarePerMin, bookingConvenienceFee, bookingConvenienceFeeCGSTPercentage, bookingConvenienceFeeSGSTPercentage, emptyKmCharge} = fareSlot;
  
  // KM Limit Calculation
  
function actualFareCalculate(){
  
   
  let bookingConvenienceFeeTotal = bookingConvenienceFee + bookingConvenienceFeeCGSTPercentage + bookingConvenienceFeeSGSTPercentage;
  if(km > 2 && km <=5){
    totalFare = ((km - initialFreeKM) * farePerKM) + initialFare + (travelTime * travelTimeFarePerMin);
    grandtotal = totalFare + (totalFare * (gstPercentage/100)) + bookingConvenienceFeeTotal + (emptyKM * emptyKmCharge )
    setActualFare(grandtotal.toFixed(2))
  }
  else if(km <= 2){
    totalFare = (0 * farePerKM) + initialFare + (travelTime * travelTimeFarePerMin);
    grandtotal = totalFare + (totalFare * gstPercentage/100) + bookingConvenienceFeeTotal + (emptyKM * emptyKmCharge );
    setActualFare(grandtotal.toFixed(2))
}
 //KM After Limit Calculation
 else if(km > 5){
      let totalKM = km - initialFreeKM;
      let kmAfterLimitKM = totalKM - kmLimit;
      totalFare = (kmLimit * farePerKM) + (kmAfterLimitKM * farePerKmAfterLimit ) + initialFare + (travelTime * travelTimeFarePerMin);
      grandtotal = totalFare + (totalFare * gstPercentage/100) + bookingConvenienceFeeTotal + (emptyKM * emptyKmCharge )
      setActualFare(grandtotal.toFixed(2))
    }
  }

  //Flexible Fare Applied
  function calculateFlexibleFare(){
     flexibleFareTotal = (totalFare * (flexiPercentage/100)) 
     let flexiFareTotal = (flexibleFareTotal + (flexibleFareTotal * (gstPercentage/100)));
     setFlexibleFare(flexiFareTotal.toFixed(2))
     let flexibleAppliedGrandTotal = flexiFareTotal + grandtotal
     setFlexiGrandTotal(flexibleAppliedGrandTotal)
  }



  //Input Fields
  return(
        
 <> 
 <div className='header'>
 <h1>Red Taxi Trip Fare Calculator (Local Bookings)</h1>
 </div>
     <div className='input-container'>
        <input type="number" placeholder="Estimated KM" required onChange={(e) =>{setKM(e.target.value)}}  />
        <input type="number" placeholder="Estimated Time" required onChange={(e) =>{setTravelTime(e.target.value)}}/>
          <input type="number" placeholder="Estimated Empty KM" required onChange={(e) =>{setEmptyKM(e.target.value)}} />
        </div>

<div className='actual-fare'>

</div>
      <button onClick={actualFareCalculate} >Calculate Actual Fare</button>
          <input type="checkbox" id="myCheckboxOne" name="myCheckboxOne" checked={displayFormula} onChange={(e) => setDisplayFormula(e.target.checked)}/>
          <label htmlFor="myCheckboxOne">Display Formula's</label>
           {actualFare && (
        <div className='fare-display'>
          <h2>Estimated Fare is : {actualFare}</h2>
          <input type="checkbox" id="myCheckbox" name="myCheckbox" checked={flexibleApplied} onChange={(e) => setFlexibleApplied(e.target.checked)}/>
          <label htmlFor="myCheckbox">Flexible Applied</label>
          <div className='flexible-container'>
          {flexibleApplied && (
            <div>   
                 <input type='number'  id='flexibleInput' placeholder='Flexible %'value={flexiPercentage} onChange={(e) => setFlexiPercentage(e.target.value)}/>
            </div>
     )}




       {flexibleApplied && flexiPercentage !==0 &&(
        <div> <button onClick={calculateFlexibleFare}>Calculate Flexible Fare</button> 
            {flexibleFare !==0 &&(
              <>
              <h3>Flexible Fare is : {flexibleFare}</h3>
              <h2>Flexible Applied Estimated Fare is : {flexiGrandTotal} </h2>
              <h3>Driver Bid Screen in Chennai : {actualFare} + {flexibleFare} </h3>
              <h3>Driver Bid Screen in Other Cities : {flexiGrandTotal} </h3>
              </>
              )}
        </div>    
                 )}
          </div>
          
       </div>
      )}
      {displayFormula &&(
        <App/>
      )}
      
    </>
    
  )
}
    




 

 
ReactDOM.createRoot(document.getElementById('root')).render(
  <div>
    <FareCalculate/>
  </div>
   
)
