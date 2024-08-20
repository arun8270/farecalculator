import {React, useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './Karur.css'

function App(){


  let[isEdit, setIsEdit] = useState(false);
  let totalFare, grandtotal, flexibleFareTotal, flexiFareGrandTotal ;
  let [fareslot, setFareSlot] = useState({initialFreeKM : 2, initialFare : 105, farePerKM : 15, kmLimit : 5, farePerKmAfterLimit : 17, freeWaitingMinute : 0, waitingFarePerMin : 2, travelTimeFarePerMin : 0, emptyKmCharge : 10, gstPercentage : 5, bookingConvenienceFee : 10, bookingConvenienceFeeCGST : 5, bookingConvenienceFeeSGST : 5 });
  let {initialFreeKM, initialFare,farePerKM, kmLimit, travelTimeFarePerMin, farePerKmAfterLimit, waitingFarePerMin, emptyKmCharge, gstPercentage, bookingConvenienceFee, bookingConvenienceFeeCGST, bookingConvenienceFeeSGST } = fareslot;
  // Input State's  for Calculate Estimated Fare;

 let[km, setKM] = useState(0);
 let[travelTime, setTravelTime] = useState(0);
 let[emptyKM, setEmptyKM] = useState(0);

 let[actualFare, setActualFare] = useState(0);
 
 let[peakinBaseFare, setPeakinBaseFare] = useState(0);
 let[peakinKM, setPeakinKM] = useState(0);
 let[peakFare, setPeakFare] = useState(0);
 let[flexibleApplied, setFlexibleApplied] = useState(false);
 let[peakApplied, setPeakApplied] = useState(false);
 let[dynamicApplied, setDynamicApplied] = useState(false);
 let[dynamicValue, setDynamicValue] = useState(0);
 let[displayFormula, setDisplayFormula] = useState(false);
 let[flexibleFare, setFlexibleFare] = useState(0)
 let[flexiPercentage, setFlexiPercentage] = useState('');
 let[driverBidFare, setDriverBidFare] = useState(0);
 let[dynamicFare, setDynamicFare] = useState(0);

//  KM Limit Calculation
 
function actualFareCalculate(){
 console.log('Hello World')
 
  
 let bookingConvenienceFeeTotal = bookingConvenienceFee + (bookingConvenienceFee * (bookingConvenienceFeeCGST/100)) + (bookingConvenienceFee * (bookingConvenienceFeeSGST/100)) ;
//  KM within Limit Fare Calculation

 if(km > 2 && km <=5){
   totalFare = ((km - initialFreeKM) * farePerKM) + initialFare + (travelTime * travelTimeFarePerMin);
   grandtotal = totalFare + (totalFare * (gstPercentage/100)) + bookingConvenienceFeeTotal + (emptyKM * emptyKmCharge ) + ((emptyKM * emptyKmCharge ) * gstPercentage/100)
   setActualFare(grandtotal.toFixed(2))
 }
 else if(km <= 2){
   totalFare = (0 * farePerKM) + initialFare + (travelTime * travelTimeFarePerMin);
   grandtotal = totalFare + (totalFare * gstPercentage/100) + bookingConvenienceFeeTotal + (emptyKM * emptyKmCharge ) + ((emptyKM * emptyKmCharge ) * gstPercentage/100)
   setActualFare(grandtotal.toFixed(2))
}
// KM After Limit Calculation
else if(km > 5){
     let totalKM = km - initialFreeKM;
     let kmAfterLimitKM = totalKM - kmLimit;
     totalFare = (kmLimit * farePerKM) + (kmAfterLimitKM * farePerKmAfterLimit ) + initialFare + (travelTime * travelTimeFarePerMin);
     console.log(kmLimit, farePerKM,kmAfterLimitKM,farePerKmAfterLimit, initialFare, travelTime, travelTimeFarePerMin, bookingConvenienceFeeCGST)
     grandtotal = totalFare + (totalFare * gstPercentage/100) + bookingConvenienceFeeTotal + (emptyKM * emptyKmCharge ) + ((emptyKM * emptyKmCharge ) * gstPercentage/100)
     setActualFare(grandtotal)
   }
  }
   let surgeTotal = parseFloat (peakFare) + parseFloat (dynamicFare) + parseFloat(flexibleFare);
  //  Surge Fare's Calculation

 function calculateSurge(){
    // Flexible Fare Calculation

   if(flexibleApplied == true){
    console.log(totalFare)
     flexibleFareTotal = (totalFare * (flexiPercentage/100));
     console.log(flexibleFareTotal, totalFare, flexiPercentage)
     flexiFareGrandTotal = (flexibleFareTotal + (flexibleFareTotal * (gstPercentage/100)));
     console.log(flexiFareGrandTotal)
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
      setPeakFare(peakGrandTotal.toFixed(2))
    }

    else if (totalKM <=0){
     kmFareTotal = 0;
     peakTotal = kmFareTotal + parseFloat(peakinBaseFare);
     peakGrandTotal = peakTotal + (peakTotal * (gstPercentage/100))
     setPeakFare(peakGrandTotal.toFixed(2))
    }
    else{
     kmFareTotal = totalKM * peakinKM;
     peakTotal = kmFareTotal + parseFloat(peakinBaseFare);
     peakGrandTotal = peakTotal + (peakTotal * (gstPercentage/100))
     setPeakFare(peakGrandTotal.toFixed(2))
    }
    }
    else{
     setPeakFare(0)
    }

       //Dynamic Fare Calculation

   if(dynamicApplied==true){
     console.log(peakTotal, flexibleFareTotal )
     dynamicTotal = ((totalFare * dynamicValue) + ((flexibleFareTotal * dynamicValue)-flexibleFareTotal) + ((peakTotal * dynamicValue)-peakTotal) - totalFare);
     console.log(totalFare)
     console.log((totalFare * dynamicValue)-totalFare) 
     let dynamicFareGrandTotal = (dynamicTotal + (dynamicTotal * (gstPercentage/100)));
     setDynamicFare(dynamicFareGrandTotal.toFixed(2))
   }
   else{
     setDynamicFare(0)
   }
 }
   function handleChange(e){
       e.preventDefault();
         let name = e.target.name ;
         let value = e.target.value ;
         setFareSlot((previousState)=>{
          if(previousState)
             return{...previousState, [name] :value ==='' ? '' : parseFloat(value) }
         }) 
         console.log(name, value)  
     }
  return(
    <>
      {isEdit ? (
  <div className = 'slotinput-container'>
    <button className = 'fare-calculate' onClick = {()=>{setIsEdit(false)}}> FareCalculate </button>
    <h1>Trip Fare Slot </h1>
    <div>
    <label htmlFor='initialFare'>InitialFare : </label>
    <input type='number' id='initialFare' name='initialFare' value={initialFare} onChange={handleChange}/>
    </div>
    <div>
    <label>InitialFreeKM : </label>
    <input type='number' name='initialFreeKM' value={initialFreeKM} onChange={handleChange}/>
    </div>
    <div>
    <label htmlFor='fareperkm'>Fare Per KM : </label>
    <input type='number' id='fareperkm' name='farePerKM' value={farePerKM} onChange={handleChange}/>
    </div>
    <div>
    <label htmlFor = 'kmLimit'>KM Limit : </label>
    <input type='number' id = 'kmLimit'  name='kmLimit' value={kmLimit} onChange={handleChange}/>
    </div>
    <div>
    <label htmlFor='travelTimeFarePerMin'>Travel Time Fare PerMin : </label>
    <input type='number' id='travelTimeFarePerMin' name='travelTimeFarePerMin' value={travelTimeFarePerMin} onChange={handleChange}/>
    </div>
    <div>
    <label htmlFor = 'farePerKmAfterLimit'>Fare PerKm After Limit : </label>
    <input type='number' id = 'kmLimit'  name='farePerKmAfterLimit' value={farePerKmAfterLimit} onChange={handleChange}/>
    </div>
    <div>
    <label htmlFor='waitingFarePerMin'>Waiting Fare PerMin : </label>
    <input type='number' id='waitingFarePerMin' name='waitingFarePerMin' value={waitingFarePerMin} onChange={handleChange}/>
    </div>
    <div>
    <label htmlFor = 'emptyKmCharge'>Empty Km Charge : </label>
    <input type='number' id = 'emptyKmCharge'  name='emptyKmCharge' value={emptyKmCharge} onChange={handleChange}/>
    </div>
    <div>
    <label htmlFor = 'gstPercentage'>GST Percentage : </label>
    <input type='number' id = 'gstPercentage'  name='gstPercentage' value={gstPercentage} onChange={handleChange}/>
    </div>
    <div>
    <label htmlFor='bookingConvenienceFee'>Booking Convenience Fee : </label>
    <input type='number' id='bookingConvenienceFee' name='bookingConvenienceFee' value={bookingConvenienceFee} onChange={handleChange}/>
    </div>
    <div>
    <label htmlFor = 'bookingConvenienceFeeCGST'>Booking ConvenienceFee CGST : </label>
    <input type='number' id = 'kmLimit'  name='bookingConvenienceFeeCGST' value={bookingConvenienceFeeCGST} onChange={handleChange}/>
    </div>
    <div>
    <label htmlFor='bookingConvenienceFeeSGST'> Booking ConvenienceFee SGST : </label>
    <input type='number' id='bookingConvenienceFeeSGST' name='bookingConvenienceFeeSGST' value={bookingConvenienceFeeSGST} onChange={handleChange}/>
    </div>
  </div>
      )
      :
      <div>
        <button onClick = {()=>{setIsEdit(true)}}> Edit Fare Slot </button>
        <div className='header'>
 <h1> Fare Calculator (Local Bookings)</h1>
 
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
          <label htmlFor="myCheckboxOne">FAQ</label>
           {actualFare && (
        <div className='fare-display'>
          <h2 className='estimateFare'>Estimated Fare is : ₹ {actualFare}</h2>
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
         <input type='number'  id='dynamicInput' placeholder='Enter Dynamic Fare ' onChange={(e) => setDynamicValue(e.target.value)}/> 
          )}
          <div className='flexible-container'>
          
   
     




       { (peakApplied || flexibleApplied || dynamicApplied) && (
        <div> 
          <button className='surchargeCalculate' onClick={calculateSurge}>Calculate {flexibleApplied && (`Flexible`)} {peakApplied && (` Peak`)} {dynamicApplied && (` Dynamic`)} Fare</button> 
            {(flexibleFare !==0 || peakFare!==0 || dynamicFare !==0) &&(
              <>
              {flexibleApplied &&  <h3 className='flexibleFare'>Flexible Fare is : ₹ {flexibleFare}</h3>}
              {peakApplied && <h3 className='peakFare'>Peak Fare is : ₹ {peakFare} </h3> }
              {dynamicApplied && <h3 className='dynamicFare'>Dynamic Fare is : ₹ {dynamicFare} </h3>}
             
              
              <h3 className='flexibleEstimateFare'>{flexibleApplied &&(`Flexible`)} {peakApplied && (`Peak`)} {dynamicApplied && (`Dynamic`)} Applied Estimated Fare is : {(grandtotal + parseFloat(dynamicFare) + parseFloat(peakFare) +  parseFloat(flexibleFare)).toFixed(2)} </h3>
              {surgeTotal > 0 ? (
              <h3 className='chennai-bid'> Driver Bid Screen in Chennai : ₹ {actualFare} + ₹ {surgeTotal.toFixed(2)} </h3> ) 
              : ( <h3 className='chennai-bid'> Driver Bid Screen in Chennai : ₹ {(parseFloat(actualFare) + parseFloat(surgeTotal)).toFixed(2)} </h3> )}
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
    
        
      </div>
    }
    </>
  
    
  )
}


 
ReactDOM.createRoot(document.getElementById('root')).render(
  <div>
    <App/>
  </div>
   
)































//  Trip Fare SLOT Input State's
//  let [fareslot, setFareSlot] = useState({initialFreeKM : 2, initialFare : 105, farePerKM : 15, kmLimit : 5, farePerKmAfterLimit : 17, freeWaitingMinute : 0, waitingFarePerMin : 2, travelTimeFarePerMin : 0, emptyKmCharge : 10, gstPercentage : 5, bookingConvenienceFee : 10, bookingConvenienceFeeCGST : 5, bookingConvenienceFeeSGST : 5 });
//  let {initialFreeKM, initialFare,farePerKM, kmLimit, travelTimeFarePerMin, farePerKmAfterLimit, waitingFarePerMin, emptyKmCharge, gstPercentage, bookingConvenienceFee, bookingConvenienceFeeCGST, bookingConvenienceFeeSGST } = fareslot
 
// Input State's  for Calculate Estimated Fare;

//  let[km, setKM] = useState(0);
//  let[travelTime, setTravelTime] = useState(0);
//  let[emptyKM, setEmptyKM] = useState(0);

//  let[actualFare, setActualFare] = useState(0);
 
//  let[peakinBaseFare, setPeakinBaseFare] = useState(0);
//  let[peakinKM, setPeakinKM] = useState(0);
//  let[peakFare, setPeakFare] = useState(0);
//  let[flexibleApplied, setFlexibleApplied] = useState(false);
//  let[peakApplied, setPeakApplied] = useState(false);
//  let[dynamicApplied, setDynamicApplied] = useState(false);
//  let[dynamicValue, setDynamicValue] = useState(0);
//  let[displayFormula, setDisplayFormula] = useState(false);
//  let[flexibleFare, setFlexibleFare] = useState(0)
//  let[flexiPercentage, setFlexiPercentage] = useState('');
//  let[driverBidFare, setDriverBidFare] = useState(0);
//  let[dynamicFare, setDynamicFare] = useState(0);


//  function handleChange(e){
//    e.preventDefault();
//      let name = e.target.name ;
//      let value = e.target.value ;
//      setFareSlot((previousState)=>{
//          return{...previousState, [name] :parseFloat(value) }
//      }) 
//      console.log(name, value)  

//  }

 
//  KM Limit Calculation
 
// function actualFareCalculate(){
//  console.log('Hello World')
 
  
//  let bookingConvenienceFeeTotal = bookingConvenienceFee + (bookingConvenienceFee * (bookingConvenienceFeeCGST/100)) + (bookingConvenienceFee * (bookingConvenienceFeeSGST/100)) ;

// KM within Limit Fare Calculation

//  if(km > 2 && km <=5){
//    totalFare = ((km - initialFreeKM) * farePerKM) + initialFare + (travelTime * travelTimeFarePerMin);
//    grandtotal = totalFare + (totalFare * (gstPercentage/100)) + bookingConvenienceFeeTotal + (emptyKM * emptyKmCharge ) + ((emptyKM * emptyKmCharge ) * gstPercentage/100)
//    setActualFare(grandtotal.toFixed(2))
//  }
//  else if(km <= 2){
//    totalFare = (0 * farePerKM) + initialFare + (travelTime * travelTimeFarePerMin);
//    grandtotal = totalFare + (totalFare * gstPercentage/100) + bookingConvenienceFeeTotal + (emptyKM * emptyKmCharge ) + ((emptyKM * emptyKmCharge ) * gstPercentage/100)
//    setActualFare(grandtotal.toFixed(2))
// }
// KM After Limit Calculation
// else if(km > 5){
//      let totalKM = km - initialFreeKM;
//      let kmAfterLimitKM = totalKM - kmLimit;
//      totalFare = (kmLimit * farePerKM) + (kmAfterLimitKM * farePerKmAfterLimit ) + initialFare + (travelTime * travelTimeFarePerMin);
//      console.log(kmLimit, farePerKM,kmAfterLimitKM,farePerKmAfterLimit, initialFare, travelTime, travelTimeFarePerMin, bookingConvenienceFeeCGST)
//      grandtotal = totalFare + (totalFare * gstPercentage/100) + bookingConvenienceFeeTotal + (emptyKM * emptyKmCharge ) + ((emptyKM * emptyKmCharge ) * gstPercentage/100)
//      setActualFare(grandtotal)
//    }

   
//  }
//  surgeTotal = parseFloat (peakFare) + parseFloat (dynamicFare) + parseFloat(flexibleFare)

//  Surge Fare's Calculation

//  function calculateSurge(){

   
//     Flexible Fare Calculation

//    if(flexibleApplied == true){
//      flexibleFareTotal = (totalFare * (flexiPercentage/100)) 
//      flexiFareGrandTotal = (flexibleFareTotal + (flexibleFareTotal * (gstPercentage/100)));
//      setFlexibleFare(flexiFareGrandTotal.toFixed(2));
//    }
//    else{
//      setFlexibleFare(0)
//    }

//     Peak Fare Calculation
//     let totalKM = km - initialFreeKM;
//     if(peakApplied == true){
//      if(totalKM>=kmLimit){
//       kmFareTotal = kmLimit * peakinKM;
//       peakTotal = kmFareTotal + parseFloat(peakinBaseFare);
//       peakGrandTotal = peakTotal + (peakTotal * (gstPercentage/100))
//       setPeakFare(peakGrandTotal.toFixed(2))
//     }

//     else if (totalKM <=0){
//      kmFareTotal = 0;
//      peakTotal = kmFareTotal + parseFloat(peakinBaseFare);
//      peakGrandTotal = peakTotal + (peakTotal * (gstPercentage/100))
//      setPeakFare(peakGrandTotal.toFixed(2))
//     }
//     else{
//      kmFareTotal = totalKM * peakinKM;
//      peakTotal = kmFareTotal + parseFloat(peakinBaseFare);
//      peakGrandTotal = peakTotal + (peakTotal * (gstPercentage/100))
//      setPeakFare(peakGrandTotal.toFixed(2))
//     }
//     }
//     else{
//      setPeakFare(0)
//     }

//         //Dynamic Fare Calculation

//    if(dynamicApplied==true){
//      console.log(peakTotal, flexibleFareTotal )
//      dynamicTotal = ((totalFare * dynamicValue) + ((flexibleFareTotal * dynamicValue)-flexibleFareTotal) + ((peakTotal * dynamicValue)-peakTotal) - totalFare);
//      console.log(totalFare)
//      console.log((totalFare * dynamicValue)-totalFare) 
//      let dynamicFareGrandTotal = (dynamicTotal + (dynamicTotal * (gstPercentage/100)));
//      setDynamicFare(dynamicFareGrandTotal.toFixed(2))
//    }
//    else{
//      setDynamicFare(0)
//    }
//  }


/* { <div className='header'>
 <h1> Fare Calculator (Local Bookings)</h1>
 
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
          <label htmlFor="myCheckboxOne">FAQ</label>
           {actualFare && (
        <div className='fare-display'>
          <h2 className='estimateFare'>Estimated Fare is : ₹ {actualFare}</h2>
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
         <input type='number'  id='dynamicInput' placeholder='Enter Dynamic Fare ' onChange={(e) => setDynamicValue(e.target.value)}/> 
          )}
          <div className='flexible-container'>
          
   
     




       { (peakApplied || flexibleApplied || dynamicApplied) && (
        <div> 
          <button className='surchargeCalculate' onClick={calculateSurge}>Calculate {flexibleApplied && (`Flexible`)} {peakApplied && (` Peak`)} {dynamicApplied && (` Dynamic`)} Fare</button> 
            {(flexibleFare !==0 || peakFare!==0 || dynamicFare !==0) &&(
              <>
              {flexibleApplied &&  <h3 className='flexibleFare'>Flexible Fare is : ₹ {flexibleFare}</h3>}
              {peakApplied && <h3 className='peakFare'>Peak Fare is : ₹ {peakFare} </h3> }
              {dynamicApplied && <h3 className='dynamicFare'>Dynamic Fare is : ₹ {dynamicFare} </h3>}
             
              
              <h3 className='flexibleEstimateFare'>{flexibleApplied &&(`Flexible`)} {peakApplied && (`Peak`)} {dynamicApplied && (`Dynamic`)} Applied Estimated Fare is : {(grandtotal + parseFloat(dynamicFare) + parseFloat(peakFare) +  parseFloat(flexibleFare)).toFixed(2)} </h3>
              {surgeTotal > 0 ? (
              <h3 className='chennai-bid'> Driver Bid Screen in Chennai : ₹ {actualFare} + ₹ {surgeTotal.toFixed(2)} </h3> ) 
              : ( <h3 className='chennai-bid'> Driver Bid Screen in Chennai : ₹ {(parseFloat(actualFare) + parseFloat(surgeTotal)).toFixed(2)} </h3> )}
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
     
} */