const moment = require('moment');
const express = require('express');

const Route = require('../../models/Route');
const Train = require('../../models/Train');
const Invoice = require('../../models/Invoice');

const router = express.Router();

router.get('/', (req, res) => {
  Route.find({}).then((routes) => {
    if (!routes) {
      res.status(400).json({ msg: 'Không lấy được dữ liệu' });
    }
    res.json(routes);
  });
});

router.post('/create', (req, res) => {
  const { route, gadi, gaden, mactau, tongKM, gia1Km } = req.body;

  route.push({
    gaDi: gaden,
    soKm: tongKM,
    thoigianDi: route[route.length - 1].thoigianDen,
    thoigianDen: route[route.length - 1].thoigianDen,
  });

  const chuyentau = new Route({
    lytrinh: route,
    gadi: gadi,
    gaden: gaden,
    mactau: mactau,
    gia1Km: gia1Km,
    trangThai: 0,
  });
  chuyentau.save().then((chuyentau) => {
    if (!chuyentau) {
      res.status(400).json({ msg: 'Tạo chuyến tàu thất bại' });
    } else {
      Train.findOneAndUpdate(
        { mactau: mactau },
        { ngaytratau: route[route.length - 1].thoigianDen, gahientai: gaden },
        {
          new: true,
        }
      ).then((train) => {
        if (!train) {
          res.status(400).json({ msg: 'Tạo chuyến tàu thất bại' });
        }
        res.json({ msg: 'Tạo chuyến tàu thành công' });
      });
    }
  });
});

router.post('/update', (req, res) => {
  const { _id } = req.body;

  Route.findByIdAndUpdate({ _id: _id }, { trangThai: 1 }).then((route) => {
    if (!route) {
      res.status(400).json({ msg: 'Cập nhật trạng thái thất bại' });
    }
    res.json({ msg: 'Cập nhật trạng thái thành công' });
  });
});

router.post('/edit', (req, res) => {
  const { _id, lytrinh, gadi, gaden, mactau, tongKM } = req.body;

  lytrinh.push({
    gaDi: gaden,
    soKm: tongKM,
    thoigianDi: lytrinh[lytrinh.length - 1].thoigianDen,
    thoigianDen: lytrinh[lytrinh.length - 1].thoigianDen,
  });

  Invoice.find({ idChuyenDi: _id }).then((invoice) => {
    console.log(invoice);
  });

  Route.findByIdAndUpdate(
    { _id: _id },
    { lytrinh: lytrinh },
    { new: true }
  ).then((route) => {
    if (!route) {
      res.status(400).json({ msg: 'Cập nhật thất bại' });
    } else {
      Train.findOneAndUpdate(
        { mactau: mactau },
        { ngaytratau: lytrinh[lytrinh.length - 1].thoigianDen }
      ).then((train) => {
        if (!train) {
          res.status(400).json({ msg: 'Cập nhật thất bại' });
        }
        res.json({ msg: 'Cập nhật thành công' });
      });
    }
  });
});

router.post('/delete', (req, res) => {
  const { _id, trangThai, lytrinh, mactau, gadi, gaden } = req.body;

  if (trangThai === 1) {
    if (
      moment().isAfter(
        moment(lytrinh[lytrinh.length - 1].thoigianDen).endOf('day')
      )
    ) {
      Route.findByIdAndDelete({ _id: _id }).then((route) => {
        if (!route) {
          res.status(400).json({ msg: 'Xóa thất bại' });
        } else {
          res.json({ msg: 'Xóa thành công' });
        }
      });
    } else {
      res.status(400).json({ msg: 'Chuyến đi chưa kết thúc' });
    }
  } else {
    Route.findByIdAndDelete({ _id: _id }).then((route) => {
      if (!route) {
        res.status(400).json({ msg: 'Xóa thất bại' });
      } else {
        Train.findOneAndUpdate(
          { mactau: mactau },
          { gahientai: gadi, ngaytratau: moment().toISOString() }
        ).then((train) => {
          if (!train) {
            res.status(400).json({ msg: 'Xóa thất bại' });
          } else {
            res.json({ msg: 'Xóa thành công' });
          }
        });
      }
    });
  }
});

module.exports = router;
