const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrainSchema = new Schema({
  mactau: { type: String },
  loaighe: [],
  ngaytratau: { type: Date, default: Date.now },
  gahientai: { type: String },
});
const Train = mongoose.model('Train', TrainSchema);

module.exports = Train;
