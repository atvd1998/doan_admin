const express = require('express');
const Train = require('../../models/Train');

const router = express.Router();

router.get('/', (req, res) => {
  Train.find({}).then((trains) => {
    if (!trains) {
      res.status(400).json({ msg: 'Không lấy được dữ liệu' });
    }
    res.json(trains);
  });
});

router.get('/info', (req, res) => {
  Train.find({}, { loaighe: 0 }).then((trains) => {
    if (!trains) {
      res.status(400).json({ msg: 'Không lấy được dữ liệu' });
    }
    res.json(trains);
  });
});

module.exports = router;
