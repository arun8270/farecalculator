import React from "react";
 function KarurSlot(){
    return(
        <>
        <form>
            <div className="slotinput-container">
            <input type="number" placeholder="Initial Free KM"/>
            <input type="number" placeholder="Initial Fare"/>
            <input type="number" placeholder="KM Fare Per KM"/>
            <input type="number" placeholder="KM Limit"/>
            <input type="number" placeholder="Fare/KM after KM Limit"/>
            <input type="number" placeholder="Free Waiting Minute"/>
            <input type="number" placeholder="Waiting Fare Per Minute"/>
            <input type="number" placeholder="Ride Charge/Min"/>
            <input type="number" placeholder="Empty Km Charge"/>
            </div>
        </form>
        </>
    )
}
export default KarurSlot;