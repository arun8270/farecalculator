import {React, useState} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

let totalFare, grandtotal, flexibleFareTotal, flexiFareGrandTotal, peakTotal, kmFareTotal, peakGrandTotal;
function FareCalculate() {
  let[km, setKM] = useState(0);
  let[travelTime, setTravelTime] = useState(0);
  let[emptyKM, setEmptyKM] = useState(0);
  let[actualFare, setActualFare] = useState(0);
  let[peakinBaseFare, setPeakinBaseFare] = useState(0);

  let[peakinKM, setPeakinKM] = useState(0);
  let[peakFare, setPeakFare] = useState(0);
  let[grandTotalWithSurge, setGrandTotalWithSurge] = useState(0)


  let[flexibleApplied, setFlexibleApplied] = useState(false);
  let[peakApplied, setPeakApplied] = useState(false);
  let[dynamicApplied, setDynamicApplied] = useState(false);


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
  function calculateSurge(){
    //  Flexible Fare Calculation

    if(flexibleApplied == true){
      flexibleFareTotal = (totalFare * (flexiPercentage/100)) 
      flexiFareGrandTotal = (flexibleFareTotal + (flexibleFareTotal * (gstPercentage/100)));
     setFlexibleFare(flexiFareGrandTotal.toFixed(2));
    }
    else{
      setFlexibleFare(0)
    }
     

     // Peak Fare Calculation
     let totalKM = km - initialFreeKM;
     if(peakApplied == true){
      if(totalKM>=kmLimit){
       kmFareTotal = kmLimit * peakinKM;
       peakTotal = kmFareTotal + parseFloat(peakinBaseFare);
       peakGrandTotal = peakTotal + (peakTotal * (gstPercentage/100))
       setPeakFare(peakGrandTotal)
     }

     else if (totalKM <=0){
      kmFareTotal = 0;
      peakTotal = kmFareTotal + parseFloat(peakinBaseFare);
      peakGrandTotal = peakTotal + (peakTotal * (gstPercentage/100))
      setPeakFare(peakGrandTotal)
     }
     else{
      kmFareTotal = totalKM * peakinKM;
      peakTotal = kmFareTotal + parseFloat(peakinBaseFare);
      peakGrandTotal = peakTotal + (peakTotal * (gstPercentage/100))
      setPeakFare(peakGrandTotal)
     }
     }
     else{
      setPeakFare(0)
     }
     let surgeTotal = flexiFareTotal + peakGrandTotal;
     setGrandTotalWithSurge(surgeTotal.toFixed(2)); 
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
          <h2 className='estimateFare'>Estimated Fare is : {actualFare}</h2>
          <div>
          <input type="checkbox" id="myCheckbox" name="myCheckbox" checked={flexibleApplied} onChange={(e) => setFlexibleApplied(e.target.checked)}/>
          <label htmlFor="myCheckbox">Apply Flexible Fare</label>
          {flexibleApplied && (  
          <input type='number'  id='flexibleInput' placeholder='Flexible %'value={flexiPercentage} onChange={(e) => setFlexiPercentage(e.target.value)}/>  
          )}
          </div>

          <div>
          <input type="checkbox" id="myCheckboxTwo" name="myCheckboxTwo" checked={peakApplied} onChange={(e) => setPeakApplied(e.target.checked)}/>
          <label htmlFor="myCheckboxTwo">Apply Peak Fare</label>
          {peakApplied &&(
          <>
          <input type='number'  id='peakInput' placeholder='Peak in Base Fare ' onChange={(e) => setPeakinBaseFare(e.target.value)}/>
          <input type='number'  id='peakInputTwo' placeholder='Peak in KM(Fare/KM) ' onChange={(e) => setPeakinKM(e.target.value)}/>  
          </>
           )}
          </div>
          
          
          <input type="checkbox" id="myCheckboxThree" name="myCheckboxThree" checked={dynamicApplied} onChange={(e) => setDynamicApplied(e.target.checked)}/>
          <label htmlFor="myCheckboxThree">Apply Dynamic Fare</label>
          {dynamicApplied &&(
         <input type='number'  id='dynamicInput' placeholder='Enter Dynamic Fare ' onChange={(e) => setFlexiPercentage(e.target.value)}/> 
          )}
          <div className='flexible-container'>
          
   
     




       { (peakApplied || flexibleApplied || dynamicApplied) && (
        <div> 
          <button className='surchargeCalculate' onClick={calculateSurge}>Calculate {flexibleApplied && (`Flexible`)} {peakApplied && (` Peak`)} {dynamicApplied && (` Dynamic`)} Fare</button> 
            {flexibleFare !==0 &&(
              <>
              {flexibleApplied &&  <h3 className='flexibleFare'>Flexible Fare is : {flexibleFare}</h3>}
              {peakApplied && <h3 className='peakFare'>Peak Fare is : {peakFare} </h3> }
             
              
              <h3 className='flexibleEstimateFare'>{flexibleApplied &&(`Flexible`)} {peakApplied && (`Peak`)} {dynamicApplied && (`Dynamic`)} Applied Estimated Fare is : {(grandtotal + peakFare + parseFloat(flexibleFare)).toFixed(2)} </h3>
              <h3>Driver Bid Screen in Chennai : {actualFare} + {grandTotalWithSurge} </h3>
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
