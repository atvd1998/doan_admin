const express = require('express');

const Schedule = require('../../models/Schedule');
const Route = require('../../models/Route');

const router = express.Router();
router.get('/', (req, res) => {
  Schedule.find({}).then((schedules) => {
    if (!schedules) res.status(400).json({ msg: 'Không lấy được dữ  liệu' });
    else res.json(schedules);
  });
});

router.post('/create', (req, res) => {
  const { gadi, gaden } = req.body;

  Schedule.findOne({ gadi: gadi, gaden: gaden }).then((schedule) => {
    if (schedule)
      res.status(400).json({ msg: 'Đã có lịch trình trong hệ thống' });
    else {
      const newSchedule = new Schedule({ gadi, gaden });
      newSchedule.save().then((schedule) => {
        if (!schedule) res.status(400).json({ msg: 'Tạo lịch trình thất bại' });
        else res.json({ msg: 'Tạo lịch trình thành công' });
      });
    }
  });
});

router.post('/edit', (req, res) => {
  const { _id, gadi, gaden } = req.body;

  Schedule.findOne({ gadi: gadi, gaden: gaden }).then((schedule) => {
    if (schedule)
      res.status(400).json({ msg: 'Đã có lịch trình trong hệ thống' });
    else {
      Route.find({ gadi: gadi, gaden: gaden }).then((route) => {
        if (route !== 0) {
          res.status(400).json({
            msg: 'Lịch trình hiện đang được sử dụng',
          });
        } else {
          Schedule.findOneAndUpdate(
            { _id: _id },
            { gadi: gadi, gaden: gaden },
            { new: true }
          ).then((schedule) => {
            if (!schedule) res.status(400).json({ msg: 'Cập nhật thất bại' });
            else res.json({ msg: 'Cập nhật thành công' });
          });
        }
      });
    }
  });
});

router.post('/delete', (req, res) => {
  const { _id, gadi, gaden } = req.body;

  Route.find({ gadi: gadi, gaden: gaden }).then((route) => {
    if (route.length !== 0) {
      res.status(400).json({
        msg: 'Lịch trình hiện đang được sử dụng',
      });
      console.log(route);
    } else {
      Schedule.findByIdAndDelete({ _id: _id }).then((schedule) => {
        if (!schedule) {
          res.status(400).json({ msg: 'Xóa lịch trình thất bại' });
        }
        res.json({ msg: 'Xóa lịch trình thành công' });
      });
    }
  });
});

module.exports = router;
