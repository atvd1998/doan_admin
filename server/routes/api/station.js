const express = require('express');
const Station = require('../../models/Station');

const router = express.Router();

router.get('/', (req, res) => {
  Station.find({})
    .sort({ khoangcach: 1 })
    .then((stations) => {
      if (!stations) res.status(400).json({ msg: 'Không lấy được dữ  liệu' });
      else res.json(stations);
    });
});

module.exports = router;
