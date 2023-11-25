import React, { useState, useEffect } from "react";

function Input() {
  const [startTime, setStartTime] = useState('');  //To get the Start time 
  const [endTime, setEndTime] = useState('');  //To get the end time 
  return (
    <div>
      <label>Start Date:</label>
      <input
        type="date"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <label>End Date:</label>
      <input
        type="date"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />
    </div>
  )
}

export default Input