const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
  name: { type: String },
  email: { type: String },
  sdt: { type: String },
  cmnd: { type: String },
  ngaylapHD: { type: Date },
  tongtienHD: { type: Number },
  chitiethoadon: [],
});
const Invoice = mongoose.model('Invoice', InvoiceSchema);

module.exports = Invoice;
