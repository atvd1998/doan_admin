const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema(
  {
    gadi: {
      type: String,
    },
    gaden: {
      type: String,
    },
  },
  { timestamps: true }
);
const Schedule = mongoose.model('Schedule', ScheduleSchema);

module.exports = Schedule;
