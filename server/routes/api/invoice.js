const express = require('express');

const Invoice = require('../../models/Invoice');

const router = express.Router();

router.get('/', (req, res) => {
  Invoice.find({}).then((invoices) => {
    if (!invoices) {
      res.json({ msg: 'Không lấy được dữ liệu' });
    }
    res.json(invoices);
  });
});

router.get('/count', (req, res) => {
  Invoice.aggregate([{ $match: { _id: '5ef2d1fd4eb754ec96d9117a' } }]).then(
    (invoice) => {
      if (!invoice) {
        res.status(400).json({ msg: 'Không có dữ liệu' });
      }
      res.json(invoice);
    }
  );
});

router.post('/cancelticket', (req, res) => {
  // Invoice.updateOne(
  //   { name: 'lê anh tú' },
  //   { $pull: { chitiethoadon: { huy: true } } }
  // ).then((success) => {
  //   if (!success) {
  //     res.status(400).json({ msg: 'Xóa thất bại' });
  //   }
  //   res.json(success);
  // });
  console.log(req.body);
  const { id, mave, giave } = req.body;

  Invoice.updateOne(
    { _id: id },
    { $pull: { chitiethoadon: { mave: mave } }, $inc: { tongtienHD: -giave } }
  ).then((ticket) => {
    if (!ticket) {
      res.status(400).json({ msg: 'Hủy vé thất bại' });
    }
    res.json({ msg: 'Hủy vé thành công' });
  });
});

router.get('/tickets', (req, res) => {
  //   Invoice.find({ chitiethoadon: { $elemMatch: { huy: true } } }).then(
  //     (invoice) => {
  //       if (!invoice) {
  //         res.status(400).json({ msg: 'Không có dữ liệu' });
  //       }
  //       res.json(invoice);
  //     }
  //   );

  Invoice.aggregate([
    { $unwind: '$chitiethoadon' },
    { $match: { 'chitiethoadon.huy': true } },
    // {
    //   $group: {
    //     _id: '$chitiethoadon.idChuyenDi',
    //     cthd: { $push: '$chitiethoadon' },
    //   },
    // },
  ]).then((invoice) => {
    if (!invoice) {
      res.status(400).json({ msg: 'Không lấy được dữ liệu' });
    }
    res.json(invoice);
  });
});

router.get('/findcancelinvoice', (req, res) => {
  Invoice.aggregate([
    { $match: { name: 'lê anh tú' } },
    {
      $project: {
        detail: {
          $filter: {
            input: '$chitiethoadon',
            as: 'chitiet',
            cond: { huy: true },
          },
        },
        _id: 0,
      },
    },
  ]).then((invoice) => {
    if (!invoice) {
      res.status(400).json({ msg: 'Không có dữ liệu' });
    }
    res.json(invoice);
  });
});

module.exports = router;
