const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StationSchema = new Schema({
  maga: {
    type: String,
  },
  tenga: {
    type: String,
  },
  khoangcach: {
    type: Number,
  },
});
const Station = mongoose.model('Station', StationSchema);

module.exports = Station;
