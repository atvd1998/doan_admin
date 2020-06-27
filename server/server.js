const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect('mongodb://localhost/trainticket', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('mongo connected');
  })
  .catch((err) => {
    console.log(err);
  });
mongoose.Promise = global.Promise;

const port = process.env.PORT;

app.use('/api/users', require('./routes/api/user'));
app.use('/api/stations', require('./routes/api/station'));
app.use('/api/schedules', require('./routes/api/schedule'));
app.use('/api/routes', require('./routes/api/route'));
app.use('/api/trains', require('./routes/api/train'));
app.use('/api/invoices', require('./routes/api/invoice'));

app.listen(port, () => {
  console.log(`server run in port ${port}`);
});
