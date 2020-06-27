const MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  var dbo = db.db('trainticket');
  var myobj = [
    {
      maga: 'SGO',
      tenga: 'Hà Nội',
      khoangcach: 0,
    },
    {
      maga: 'PLY',
      tenga: 'Phủ Lý',
      khoangcach: 55,
    },
    {
      maga: 'NDI',
      tenga: 'Nam Định',
      khoangcach: 86,
    },
    {
      maga: 'NBI',
      tenga: 'Ninh Bình',
      khoangcach: 114,
    },
    {
      maga: 'THO',
      tenga: 'Thanh Hóa',
      khoangcach: 175,
    },
    {
      maga: 'VIN',
      tenga: 'Vinh',
      khoangcach: 319,
    },
    {
      maga: 'YTR',
      tenga: 'Yên Trung',
      khoangcach: 340,
    },
    {
      maga: 'HPO',
      tenga: 'Hương Phố',
      khoangcach: 386,
    },
    {
      maga: 'DHO',
      tenga: 'Đồng Hới',
      khoangcach: 521,
    },
    {
      maga: 'DHA',
      tenga: 'Đông Hà',
      khoangcach: 622,
    },
    {
      maga: 'HUE',
      tenga: 'Huế',
      khoangcach: 688,
    },
    {
      maga: 'DNA',
      tenga: 'Đà Nẵng',
      khoangcach: 791,
    },
    {
      maga: 'TKI',
      tenga: 'Tàm Kỳ',
      khoangcach: 864,
    },
    {
      maga: 'QNG',
      tenga: 'Quãng Ngãi',
      khoangcach: 927,
    },
    {
      maga: 'DTR',
      tenga: 'Diêu Trì',
      khoangcach: 1095,
    },
    {
      maga: 'THA',
      tenga: 'Tuy Hòa',
      khoangcach: 1197,
    },
    {
      maga: 'NTR',
      tenga: 'Nha Trang',
      khoangcach: 1314,
    },
    {
      maga: 'TCH',
      tenga: 'Tháp Chàm',
      khoangcach: 1407,
    },
    {
      maga: 'MMA',
      tenga: 'Bình Thuận',
      khoangcach: 1551,
    },
    {
      maga: 'BHO',
      tenga: 'Biên Hòa',
      khoangcach: 1697,
    },
    {
      maga: 'SGO',
      tenga: 'Sài Gòn',
      khoangcach: 1726,
    },
  ];
  dbo.collection('stations').insertMany(myobj, function (err, res) {
    if (err) throw err;
    console.log('1 document inserted');
    db.close();
  });
});
