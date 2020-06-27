const MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  var dbo = db.db('trainticket');
  var myobj = [
    { name: 'atvd1', ngaylapHD: new Date(2020, 5, 29), tongtienHD: 30000 },
    { name: 'atvd2', ngaylapHD: new Date(2020, 5, 28), tongtienHD: 20000 },
    { name: 'atvd3', ngaylapHD: new Date(2020, 5, 27), tongtienHD: 130000 },
    { name: 'atvd4', ngaylapHD: new Date(2020, 5, 26), tongtienHD: 650000 },
    { name: 'atvd5', ngaylapHD: new Date(2020, 5, 25), tongtienHD: 550000 },
    { name: 'atvd6', ngaylapHD: new Date(2020, 5, 24), tongtienHD: 40000 },
    { name: 'atvd7', ngaylapHD: new Date(2020, 5, 23), tongtienHD: 50000 },
    { name: 'atvd8', ngaylapHD: new Date(2020, 5, 22), tongtienHD: 60000 },
    { name: 'atvd9', ngaylapHD: new Date(2020, 5, 21), tongtienHD: 70000 },
    { name: 'atvd10', ngaylapHD: new Date(2020, 5, 20), tongtienHD: 830000 },
    { name: 'atvd11', ngaylapHD: new Date(2020, 5, 19), tongtienHD: 300000 },
  ];
  dbo.collection('invoices').insertMany(myobj, function (err, res) {
    if (err) throw err;
    console.log('1 document inserted');
    db.close();
  });
});
