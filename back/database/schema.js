const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  level: String,
  message: String,
  resourceId: String,
  timestamp: String,
  traceId: String,
  spanId: String,
  commit: String,
  metadata: 
      {
        parentResourceId: String,
      },
 
});

const Logs = new mongoose.model("logs", schema);
module.exports = Logs;
