import {React, useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import KarurSlot from './Karur.jsx';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

let totalFare, grandtotal, dynamicTotal, flexibleFareTotal = 0, flexiFareGrandTotal, peakTotal = 0, kmFareTotal, peakGrandTotal, surgeTotal;
function FareCalculate() {
  let [fareslot, setFareSlot] = useState({initialFreeKM : 2, initialFare : 105, farePerKM : 15, kmLimit : 5, farePerKmAfterLimit : 17, freeWaitingMinute : 0, waitingFarePerMin : 2, travelTimeFarePerMin : 0, emptyKmCharge : 10});
  let {initialFreeKM, initialFare} = fareslot
  
 
  function handleSubmit(e){
      e.preventDefault(); 
  }
  function handleChange(e){
      let name = e.target.name ;
      let value = e.target.value ;
      setFareSlot((previousState)=>{
          return{...previousState, [name] : value}
      }) 
      console.log(name, value)  

  }
 
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
    grandtotal = totalFare + (totalFare * (gstPercentage/100)) + bookingConvenienceFeeTotal + (emptyKM * emptyKmCharge ) + ((emptyKM * emptyKmCharge ) * gstPercentage/100)
    setActualFare(grandtotal.toFixed(2))
  }
  else if(km <= 2){
    totalFare = (0 * farePerKM) + initialFare + (travelTime * travelTimeFarePerMin);
    grandtotal = totalFare + (totalFare * gstPercentage/100) + bookingConvenienceFeeTotal + (emptyKM * emptyKmCharge ) + ((emptyKM * emptyKmCharge ) * gstPercentage/100)
    setActualFare(grandtotal.toFixed(2))
}
 //KM After Limit Calculation
 else if(km > 5){
      let totalKM = km - initialFreeKM;
      let kmAfterLimitKM = totalKM - kmLimit;
      totalFare = (kmLimit * farePerKM) + (kmAfterLimitKM * farePerKmAfterLimit ) + initialFare + (travelTime * travelTimeFarePerMin);
      grandtotal = totalFare + (totalFare * gstPercentage/100) + bookingConvenienceFeeTotal + (emptyKM * emptyKmCharge ) + ((emptyKM * emptyKmCharge ) * gstPercentage/100)
      setActualFare(grandtotal.toFixed(2))
      console.log(totalFare)
    }

    
  }
  surgeTotal = parseFloat (peakFare) + parseFloat (dynamicFare) + parseFloat(flexibleFare)

  //Surge Fare's Calculation

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
  



  //Input Fields
  return(
        <>
        <form onSubmit={handleSubmit}>
            <h1>Trip Fare Slot Values</h1>
            <div className="slotinput-container">
            <div>
            <label htmlFor="freekm">Initial Free KM : </label>
            <input type="number" id="freekm" name="initialFreeKM" placeholder="Initial Free KM" value={fareslot.initialFreeKM} onChange={handleChange}/>
            </div>
            <div>
            <label htmlFor="initialfare">Initial Fare : </label>
            <input type="number" id="initialfare" name="initialFare" placeholder="Initial Fare" value={fareslot.initialFare} onChange={handleChange}/>
            </div>
            <div>
            <label htmlFor="fareperkm">Fare Per KM : </label>
            <input type="number" id="fareperkm" name="farePerKM" placeholder="Fare Per KM" value={fareslot.farePerKM} onChange={handleChange}/>
            </div>
            <div>
            <label htmlFor="kmlimit">KM Limit : </label>
            <input type="number" id="kmlimit" name="kmLimit" placeholder="KM Limit" value={fareslot.kmLimit} onChange={handleChange}/>
            </div>
            <div>
            <label htmlFor="kmafterlimit">KM After Limit : </label>
            <input type="number" id="kmafterlimit" name="kmAfterLimit" placeholder="Fare/KM after KM Limit" value={fareslot.kmAfterLimit} onChange={handleChange}/>
            </div>
            <div>
            <label htmlFor="waitingminute">Free Waiting Minute : </label>
            <input type="number" id="waitingminute" name="freeWaitingMinute" placeholder="Free Waiting Minute" value={fareslot.freeWaitingMinute} onChange={handleChange}/>
            </div>
            <div>
            <label htmlFor="waitingfareperminute">Waiting Fare Per Minute : </label>
            <input type="number" id="waitingfareperminute" name="waitingFarePerminute" placeholder="Waiting Fare Per Minute" value={fareslot.waitingFarePerminute} onChange={handleChange}/>
            </div>
            <div>
            <label htmlFor="fareperminute">Ride Charge Per Minute : </label>
            <input type="number" id="fareperminute" name="rideChargePerMinute" placeholder="Ride Charge/Min" value={fareslot.rideChargePerMinute} onChange={handleChange}/>
            </div>
            <div>
            <label htmlFor="emptykmcharge">Empty KM Charge Per KM : </label>
            <input type="number" id="emptykmcharge" name="emptyKMCharge" placeholder="Empty Km Charge" value={fareslot.emptyKMCharge} onChange={handleChange}/>
            </div>
            </div>
        </form>
        </>
    )
}
      <div className='testcontainer'>
         <BrowserRouter>
         <ul>
           <li><Link to='/'>Home</Link></li>
           <li><Link to='/app'>App</Link></li>
           <li><Link to='/karur'>Karur</Link></li>
         </ul>
             <Routes>
               <Route path='/' />
               <Route path='/app' element = {<App/>}/>
               <Route path='/karur' element = {<KarurSlot/>}/>
             </Routes>
         </BrowserRouter>
      </div>

 {/* <div className='header'>
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
         </>
    )    */}
    




 

 
ReactDOM.createRoot(document.getElementById('root')).render(
  <div>
    <FareCalculate/>
  </div>
   
)
