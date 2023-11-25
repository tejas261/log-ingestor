import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Input from "./Input";

const App = () => {
  const [logs, setLogs] = useState([]); //final place to store the logs 
  const [searchTerm, setSearchTerm] = useState(""); //Get the value entered in the search box
  const [filterField, setFilterField] = useState("message");  //To get the value selected from the listed filters
  const [logData, setlogData] = useState([]);


  useEffect(() => {
    axios
      .get("http://localhost:3000/api/logs")
      .then((response) => setLogs(response.data))
      .catch((error) => console.error("Error fetching log data:", error));
  }, []);

let handleChange = (e)=>{
  setSearchTerm(e.target.value)
  handleSearch()
}

  const handleSearch = () => {
    
    let filteredLogs = logs.filter((log) =>
      log.message.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (filterField) {
      const fieldFilteredLogs = logs.filter(log =>
        log[filterField].toLowerCase().includes(searchTerm.toLowerCase())
      );
      setlogData(fieldFilteredLogs);
    } else {
      setlogData(filteredLogs);
    }
    
    if (startTime && endTime) {
      const startTimestamp = new Date(startTime).getTime();
      const endTimestamp = new Date(endTime).getTime();
      filteredLogs = filteredLogs.filter(log =>
        log.timestamp >= startTimestamp && log.timestamp <= endTimestamp
      );
      setlogData(filteredLogs);
    }
  };

  return (
    <div className="content">
      <h1>Get all the server log data here</h1>
      <input
        type="text"
        placeholder="Search logs..."
        value={searchTerm}
        onChange={handleChange}
      />
      <select onChange={(e) => setFilterField(e.target.value)}>
        <option value="message">Message</option>
        <option value="level">Level</option>
        <option value="resourceId">ResourceId</option>
        <option value="traceId">TraceId</option>
        <option value="spanId">SpanId</option>
        <option value="timestamp">Timestamp</option>
        <option value="commit">Commit</option>
      </select>
      {filterField=="timestamp" ? <Input/> : "" }
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
