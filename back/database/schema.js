const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  level: String,
  message: String,
  resourceId: String,
  timeStamp: String,
  traceId: String,
  spanid: String,
  commit: String,
  metadata: 
      {
        parentResourceId: String,
      },
  timestamp: Date
 
});

const Logs = new mongoose.model("logs", schema);
module.exports = Logs;
