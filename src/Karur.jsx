import React, { useState } from "react";
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
            <input type="number" name="freekm" placeholder="Initial Free KM" value={fareslot.initialFreeKM} onChange={handleChange}/>
            <input type="number" name="initialFare" placeholder="Initial Fare" value={fareslot.initialFare} onChange={handleChange}/>
            <input type="number" name="farePerKM" placeholder="Fare Per KM" value={fareslot.farePerKM} onChange={handleChange}/>
            <input type="number" name="kmLimit" placeholder="KM Limit" value={fareslot.kmLimit} onChange={handleChange}/>
            <input type="number" name="afterLimitFare" placeholder="Fare/KM after KM Limit" value={fareslot.kmAfterLimit} onChange={handleChange}/>
            <input type="number" name="freewaitingMinute" placeholder="Free Waiting Minute" value={fareslot.freeWaitingMinute} onChange={handleChange}/>
            <input type="number" name="waitingFarePerMinute" placeholder="Waiting Fare Per Minute" value={fareslot.waitingFarePerminute} onChange={handleChange}/>
            <input type="number" name="rideChargePerMinute" placeholder="Ride Charge/Min" value={fareslot.rideChargePerMinute} onChange={handleChange}/>
            <input type="number" name="emptyKMCharge" placeholder="Empty Km Charge" value={fareslot.emptyKMCharge} onChange={handleChange}/>
            </div>
            <button type="submit">Save Changes</button>
        </form>
        </>
    )
}
export default KarurSlot;