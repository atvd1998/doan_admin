const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RouteSchema = new Schema({
  gadi: {
    type: String,
  },
  gaden: {
    type: String,
  },
  mactau: {
    type: String,
  },
  gia1Km: {
    type: Number,
  },
  trangThai: {
    type: Number,
  },
  lytrinh: [],
});
const Route = mongoose.model('Route', RouteSchema);

module.exports = Route;
