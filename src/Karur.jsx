import React, { useState } from "react";
import './Karur.css'
 function KarurSlot(){
    const[fareslot, setFareSlot] = useState({initialFreeKM : 2, initialFare : 105, farePerKM : 15, kmLimit : 5, kmAfterLimit : 17, freeWaitingMinute : 0, waitingFarePerminute : 2, rideChargePerMinute : 0, emptyKMCharge : 10});
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
    return(
        <>
        <form onSubmit={handleSubmit}>
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
export default KarurSlot;