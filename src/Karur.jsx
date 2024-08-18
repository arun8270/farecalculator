// Farecalculate.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateFareSlot } from './slices/fareSlotSlice';

export default function Farecalculate() {
  const fareSlot = useSelector((state) => state.fareSlot.fareSlot);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFareSlot({ [name]: Number(value) }));
  };

  return (
    <div>
      <h2>Edit Fare Slot</h2>
      <div>
        <label>
          Initial Free KM:
          <input
            type="text"
            name="initialFreeKM"
            value={fareSlot.initialFreeKM}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Initial Charge:
          <input
            type="text"
            name="initialCharge"
            value={fareSlot.initialCharge}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Per KM Charge:
          <input
            type="text"
            name="perKMCharge"
            value={fareSlot.perKMCharge}
            onChange={handleInputChange}
          />
        </label>
      </div>

    </div>
  );
}