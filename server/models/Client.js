const mongoose = require('mongoose');
const ClientSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  company:    { type: String, required: true },
  address:    { type: String, required: true },
  phone:      { type: String, required: true },
  email:      { type: String, required: true },
  project:    { type: String, required: true },
  timeLimit:  { type: String, required: true },
  budget:     { type: Number, required: true },
  status:     { type: String, enum: ['IN_PROCESS','COMPLETED','CANCELLED'], default: 'IN_PROCESS' }
}, { timestamps: true });
module.exports = mongoose.model('Client', ClientSchema);