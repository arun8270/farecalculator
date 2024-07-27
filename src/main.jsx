import {React, useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import KarurSlot from './Karur.jsx';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

let totalFare, grandtotal, dynamicTotal, flexibleFareTotal = 0, flexiFareGrandTotal, peakTotal = 0, kmFareTotal, peakGrandTotal, surgeTotal;
function FareCalculate() {
//   let[km, setKM] = useState(0);
//   let[travelTime, setTravelTime] = useState(0);
//   let[emptyKM, setEmptyKM] = useState(0);
//   let[actualFare, setActualFare] = useState(0);
//   let[peakinBaseFare, setPeakinBaseFare] = useState(0);

//   let[peakinKM, setPeakinKM] = useState(0);
//   let[peakFare, setPeakFare] = useState(0);
//   let[grandTotalWithSurge, setGrandTotalWithSurge] = useState(0)


//   let[flexibleApplied, setFlexibleApplied] = useState(false);
//   let[peakApplied, setPeakApplied] = useState(false);
//   let[dynamicApplied, setDynamicApplied] = useState(false);
//   let[dynamicValue, setDynamicValue] = useState(0);
 

//   let[displayFormula, setDisplayFormula] = useState(false);
//   let[flexibleFare, setFlexibleFare] = useState(0)
//   let[flexiPercentage, setFlexiPercentage] = useState('');
//   let[driverBidFare, setDriverBidFare] = useState(0);
//   let[dynamicFare, setDynamicFare] = useState(0);

//   //Trip Fare Slot Values

//   const fareSlot = {
//     initialFreeKM : 2,
//     initialFare : 105,
//     farePerKM : 15, 
//     kmLimit : 5,
//     travelTimeFarePerMin : 0,
//     farePerKmAfterLimit : 17,
//     waitingFarePerMin : 2,
//     emptyKmCharge : 10,
//     gstPercentage : 5,
//     bookingConvenienceFee : 10,
//     bookingConvenienceFeeCGSTPercentage : 1,
//     bookingConvenienceFeeSGSTPercentage : 1
//   }

//   //Destructuring the trip fare slot values

//   let{ kmLimit, initialFare, initialFreeKM, gstPercentage, farePerKM, farePerKmAfterLimit, travelTimeFarePerMin, bookingConvenienceFee, bookingConvenienceFeeCGSTPercentage, bookingConvenienceFeeSGSTPercentage, emptyKmCharge} = fareSlot;
  
//   // KM Limit Calculation
  
// function actualFareCalculate(){
  
   
//   let bookingConvenienceFeeTotal = bookingConvenienceFee + bookingConvenienceFeeCGSTPercentage + bookingConvenienceFeeSGSTPercentage;
//   if(km > 2 && km <=5){
//     totalFare = ((km - initialFreeKM) * farePerKM) + initialFare + (travelTime * travelTimeFarePerMin);
//     grandtotal = totalFare + (totalFare * (gstPercentage/100)) + bookingConvenienceFeeTotal + (emptyKM * emptyKmCharge ) + ((emptyKM * emptyKmCharge ) * gstPercentage/100)
//     setActualFare(grandtotal.toFixed(2))
//   }
//   else if(km <= 2){
//     totalFare = (0 * farePerKM) + initialFare + (travelTime * travelTimeFarePerMin);
//     grandtotal = totalFare + (totalFare * gstPercentage/100) + bookingConvenienceFeeTotal + (emptyKM * emptyKmCharge ) + ((emptyKM * emptyKmCharge ) * gstPercentage/100)
//     setActualFare(grandtotal.toFixed(2))
// }
//  //KM After Limit Calculation
//  else if(km > 5){
//       let totalKM = km - initialFreeKM;
//       let kmAfterLimitKM = totalKM - kmLimit;
//       totalFare = (kmLimit * farePerKM) + (kmAfterLimitKM * farePerKmAfterLimit ) + initialFare + (travelTime * travelTimeFarePerMin);
//       grandtotal = totalFare + (totalFare * gstPercentage/100) + bookingConvenienceFeeTotal + (emptyKM * emptyKmCharge ) + ((emptyKM * emptyKmCharge ) * gstPercentage/100)
//       setActualFare(grandtotal.toFixed(2))
//       console.log(totalFare)
//     }

    
//   }
//   surgeTotal = parseFloat (peakFare) + parseFloat (dynamicFare) + parseFloat(flexibleFare)

//   //Surge Fare's Calculation

//   function calculateSurge(){

    
//     //  Flexible Fare Calculation

//     if(flexibleApplied == true){
//       flexibleFareTotal = (totalFare * (flexiPercentage/100)) 
//       flexiFareGrandTotal = (flexibleFareTotal + (flexibleFareTotal * (gstPercentage/100)));
//       setFlexibleFare(flexiFareGrandTotal.toFixed(2));
//     }
//     else{
//       setFlexibleFare(0)
//     }

//      // Peak Fare Calculation
//      let totalKM = km - initialFreeKM;
//      if(peakApplied == true){
//       if(totalKM>=kmLimit){
//        kmFareTotal = kmLimit * peakinKM;
//        peakTotal = kmFareTotal + parseFloat(peakinBaseFare);
//        peakGrandTotal = peakTotal + (peakTotal * (gstPercentage/100))
//        setPeakFare(peakGrandTotal.toFixed(2))
//      }

//      else if (totalKM <=0){
//       kmFareTotal = 0;
//       peakTotal = kmFareTotal + parseFloat(peakinBaseFare);
//       peakGrandTotal = peakTotal + (peakTotal * (gstPercentage/100))
//       setPeakFare(peakGrandTotal.toFixed(2))
//      }
//      else{
//       kmFareTotal = totalKM * peakinKM;
//       peakTotal = kmFareTotal + parseFloat(peakinBaseFare);
//       peakGrandTotal = peakTotal + (peakTotal * (gstPercentage/100))
//       setPeakFare(peakGrandTotal.toFixed(2))
//      }
//      }
//      else{
//       setPeakFare(0)
//      }

//          //Dynamic Fare Calculation

//     if(dynamicApplied==true){
//       console.log(peakTotal, flexibleFareTotal )
//       dynamicTotal = ((totalFare * dynamicValue) + ((flexibleFareTotal * dynamicValue)-flexibleFareTotal) + ((peakTotal * dynamicValue)-peakTotal) - totalFare);
//       console.log(totalFare)
//       console.log((totalFare * dynamicValue)-totalFare) 
//       let dynamicFareGrandTotal = (dynamicTotal + (dynamicTotal * (gstPercentage/100)));
//       setDynamicFare(dynamicFareGrandTotal.toFixed(2))
//     }
//     else{
//       setDynamicFare(0)
//     }
 
//   }
  



//   //Input Fields
//   return(
    
        
// 
//  <div className='header'>
//  <h1> Fare Calculator (Local Bookings)</h1>
 
//  </div>
//      <div className='input-container'>
//         <input type="number" placeholder="Estimated KM" required onChange={(e) =>{setKM(e.target.value)}}  />
//         <input type="number" placeholder="Estimated Time" required onChange={(e) =>{setTravelTime(e.target.value)}}/>
//           <input type="number" placeholder="Estimated Empty KM" required onChange={(e) =>{setEmptyKM(e.target.value)}} />
//         </div>

// <div className='actual-fare'>

// </div>
//       <button onClick={actualFareCalculate} >Calculate Actual Fare</button>
//           <input type="checkbox" id="myCheckboxOne" name="myCheckboxOne" checked={displayFormula} onChange={(e) => setDisplayFormula(e.target.checked)}/>
//           <label htmlFor="myCheckboxOne">FAQ</label>
//            {actualFare && (
//         <div className='fare-display'>
//           <h2 className='estimateFare'>Estimated Fare is : ₹ {actualFare}</h2>
//           <div>
//           <input type="checkbox" id="myCheckbox" name="myCheckbox" checked={flexibleApplied} onChange={(e) => setFlexibleApplied(e.target.checked)}/>
//           <label htmlFor="myCheckbox">Apply Flexible Fare</label>
//           {flexibleApplied && (  
//           <input type='number'  id='flexibleInput' placeholder='Flexible %'value={flexiPercentage} onChange={(e) => setFlexiPercentage(e.target.value)}/>  
//           )}
//           </div>

//           <div>
//           <input type="checkbox" id="myCheckboxTwo" name="myCheckboxTwo" checked={peakApplied} onChange={(e) => setPeakApplied(e.target.checked)}/>
//           <label htmlFor="myCheckboxTwo">Apply Peak Fare</label>
//           {peakApplied &&(
//           <>
//           <input type='number'  id='peakInput' placeholder='Peak in Base Fare ' onChange={(e) => setPeakinBaseFare(e.target.value)}/>
//           <input type='number'  id='peakInputTwo' placeholder='Peak in KM(Fare/KM) ' onChange={(e) => setPeakinKM(e.target.value)}/>  
//           </>
//            )}
//           </div>
          
          
//           <input type="checkbox" id="myCheckboxThree" name="myCheckboxThree" checked={dynamicApplied} onChange={(e) => setDynamicApplied(e.target.checked)}/>
//           <label htmlFor="myCheckboxThree">Apply Dynamic Fare</label>
//           {dynamicApplied &&(
//          <input type='number'  id='dynamicInput' placeholder='Enter Dynamic Fare ' onChange={(e) => setDynamicValue(e.target.value)}/> 
//           )}
//           <div className='flexible-container'>
          
   
     




//        { (peakApplied || flexibleApplied || dynamicApplied) && (
//         <div> 
//           <button className='surchargeCalculate' onClick={calculateSurge}>Calculate {flexibleApplied && (`Flexible`)} {peakApplied && (` Peak`)} {dynamicApplied && (` Dynamic`)} Fare</button> 
//             {(flexibleFare !==0 || peakFare!==0 || dynamicFare !==0) &&(
//               <>
//               {flexibleApplied &&  <h3 className='flexibleFare'>Flexible Fare is : ₹ {flexibleFare}</h3>}
//               {peakApplied && <h3 className='peakFare'>Peak Fare is : ₹ {peakFare} </h3> }
//               {dynamicApplied && <h3 className='dynamicFare'>Dynamic Fare is : ₹ {dynamicFare} </h3>}
             
              
//               <h3 className='flexibleEstimateFare'>{flexibleApplied &&(`Flexible`)} {peakApplied && (`Peak`)} {dynamicApplied && (`Dynamic`)} Applied Estimated Fare is : {(grandtotal + parseFloat(dynamicFare) + parseFloat(peakFare) +  parseFloat(flexibleFare)).toFixed(2)} </h3>
//               {surgeTotal > 0 ? (
//               <h3 className='chennai-bid'> Driver Bid Screen in Chennai : ₹ {actualFare} + ₹ {surgeTotal.toFixed(2)} </h3> ) 
//               : ( <h3 className='chennai-bid'> Driver Bid Screen in Chennai : ₹ {(parseFloat(actualFare) + parseFloat(surgeTotal)).toFixed(2)} </h3> )}
//               </>
//               )}
//         </div>    
//                  )}
//           </div>
          
//        </div>
//       )}
//       {displayFormula &&(
//         <App/>
//       )}
   <> 
   <div className='testcontainer'>
   <h1>Hello</h1>
   <p>I am Arunkumar</p>
      <BrowserRouter>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/app'>App</Link></li>
      </ul>
          <Routes>
            <Route path='/app' element = {<App/>}/>
          </Routes>
      </BrowserRouter>
   </div>
   
    </>
    
  // )
}
    




 

 
ReactDOM.createRoot(document.getElementById('root')).render(
  <div>
    <FareCalculate/>
  </div>
   
)
