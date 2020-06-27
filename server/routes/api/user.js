const express = require('express');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

router.post('/user', (req, res) => {
  const { id } = req.body;
  User.findOne({ _id: id }).then((user) => {
    if (!user) res.status(400).json({ msg: 'Không tìm thấy dữ liệu' });
    else res.json(user);
  });
});

router.get('/', (req, res) => {
  User.find({})
    .sort({ role: 1 })
    .then((users) => {
      if (!users) res.status(400).json({ msg: 'Không lấy được dữ liệu' });
      else res.json(users);
    });
});

router.post('/login', (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    res.status(400).json({ msg: 'Vui lòng nhập đầy đủ thông tin' });

  User.findOne({ email: email }).then((user) => {
    if (!user) res.status(400).json({ msg: 'Email chưa đăng ký' });
    else {
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          jwt.sign(
            {
              id: user.id,
            },
            process.env.SECRET_KEY,
            (err, token) => {
              if (err) throw err;
              res.json({
                user: user,
                token: token,
                msg: 'Đăng nhập thành công',
              });
            }
          );
        } else {
          return res.status(400).json({ msg: 'Mật khẩu không chính xác' });
        }
      });
    }
  });
});

router.post('/delete', (req, res) => {
  let { _id } = req.body;

  User.findByIdAndDelete({ _id: _id }).then((user) => {
    if (!user) {
      res.status(400).json({ msg: 'Xóa nhân viên thất bại' });
    }
    res.json({ msg: 'Xóa nhân viên thành công' });
  });
});

router.post('/update', (req, res) => {
  let {
    name,
    email,
    password,
    repassword,
    role,
    address,
    phone,
    gender,
  } = req.body;
  if (!name || !email || !role || !address || !phone || !gender) {
    res.status(400).json({ msg: 'Vui lòng nhập đầy đủ thông tin' });
  } else if (password !== repassword) {
    res.status(400).json({ msg: 'Mật khẩu nhập lại phải giống mật khẩu' });
  } else {
    if (password && repassword) {
      bcrypt.genSalt(10, (err, salt) =>
        bcrypt.hash(password, salt, (err, hash) => {
          password = hash;
          User.findOneAndUpdate(
            { email: email },
            {
              name: name,
              password: password,
              role: role,
              address: address,
              phone: phone,
              gender: gender,
            },
            {
              new: true,
            }
          ).then((user) => {
            if (!user)
              res.status(400).json({ msg: 'Có lỗi trong khi cập nhật' });
            else res.json({ msg: 'Cập nhật thành công' });
          });
        })
      );
    } else {
      User.findOneAndUpdate(
        { email: email },
        {
          name: name,
          role: role,
          address: address,
          phone: phone,
          gender: gender,
        },
        {
          new: true,
        }
      ).then((user) => {
        if (!user) res.status(400).json({ msg: 'Có lỗi trong khi cập nhật' });
        else res.json({ msg: 'Cập nhật thành công' });
      });
    }
  }
});

router.post('/register', (req, res) => {
  const {
    name,
    email,
    password,
    repassword,
    role,
    address,
    phone,
    gender,
  } = req.body;

  if (
    !name ||
    !email ||
    !password ||
    !repassword ||
    !role ||
    !address ||
    !phone ||
    !gender
  ) {
    res.status(400).json({ msg: 'Vui lòng nhập đầy đủ thông tin' });
  } else if (password !== repassword) {
    res.status(400).json({ msg: 'Mật khẩu nhập lại phải giống mật khẩu' });
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        res.status(404).json({ msg: 'Email đã dược đăng ký' });
      } else {
        const newUser = new User({
          name,
          email,
          password,
          role,
          address,
          phone,
          gender,
        });
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            newUser.save().then((user) => {
              jwt.sign(
                { id: user.id },
                process.env.SECRET_KEY,
                { expiresIn: 3600 },
                (err, token) => {
                  if (err) throw err;
                  res.json({ token, msg: 'Tạo thành công' });
                }
              );
            });
          })
        );
      }
    });
  }
});

module.exports = router;
