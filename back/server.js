// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Logs = require('./database/schema');
require ('./database/connection');

const app = express();
const PORT = 3000;

let logdata =[]

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Endpoint to receive and store log data
app.post('/api/logs', async (req, res) => { 
   try{
    let logs = new Logs({
      level:req.body.level,
      message:req.body.message,
      resourceId:req.body.resourceId,
      timestamp:req.body.timestamp,
      traceId:req.body.traceId,
      spanId:req.body.spanId,
      commit:req.body.commit,
      metadata:req.body.metadata,
      timestamp:new Date()
  })
  let savedLogdata = await logs.save()
  logdata.push(savedLogdata)
  res.status(200).send(logdata);
}
catch (error) {
  res.status(400).send(error);
} 
});

// Endpoint to retrieve log data
app.get('/api/logs', (req, res) => {
  res.send(logdata);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
