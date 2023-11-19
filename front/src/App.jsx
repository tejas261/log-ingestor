import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [logs, setLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterField, setFilterField] = useState("message");
  const [logData, setlogData] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/logs")
      .then((response) => setLogs(response.data))
      .catch((error) => console.error("Error fetching log data:", error));
  }, []);

  const handleSearch = () => {
    
    let filteredLogs = logs.filter((log) =>
      log.message.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (filterField) {
      filteredLogs = logs.filter((log) =>
      log[filterField].toLowerCase().includes(searchTerm.toLowerCase())
      )
      setlogData(filteredLogs);
    } 
    
    if (startTime && endTime) {
      const startTimestamp = new Date(startTime).getTime();
      const endTimestamp = new Date(endTime).getTime();
      filteredLogs = filteredLogs.filter(log =>
        log.timestamp >= startTimestamp && log.timestamp <= endTimestamp
      );
    }
    setlogData(filteredLogs);
  };

  return (
    <div className="content">
      <h1>Get all the server log data here</h1>
      <input
        type="text"
        placeholder="Search logs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select onChange={(e) => setFilterField(e.target.value)}>
        <option value="message">Message</option>
        <option value="level">Level</option>
        <option value="resourceId">ResourceId</option>
        <option value="traceId">TraceId</option>
        <option value="spanId">SpanId</option>
        <option value="commit">Commit</option>
      </select>
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
      <button onClick={handleSearch}>Search</button>

      <ul>
        {logData.map((log, index) => (
          <details key={(index += 1)}>
            <summary> Log {(index += 1)} </summary>
            <ul>
              <li>
                {" "}
                <strong> Level:</strong> {log.level}
              </li>
              <li>
                <strong> Message:</strong> {log.message}
              </li>
              <li>
                <strong> Resource ID:</strong> {log.resourceId}
              </li>
            </ul>
          </details>
        ))}
      </ul>
    </div>
  );
};

export default App;
