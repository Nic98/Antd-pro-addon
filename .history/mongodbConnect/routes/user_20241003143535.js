var express = require('express');
const crypto = require('crypto');
var router = express.Router();

/* post user/register data. */
router.post('/register', async (req, res, next) => {
  if(req.body.userName && req.body.password) {
      const isExist = await M.user.findOne({ userName: req.body.userName }); // null or { username xxx}
      if (isExist && isExist.userName) {
        res.json({
          msg: '存在相同名称',
          code: '901'
        })
      } else {
        const total = await M.user.count();
        const createResp = await M.user.create({
          userId: total + 1,
          userName: req.body.userName,
          userPassword: crypto.createHash('md5').update(req.body.password).digest('hex'),
          userState: '1',
        });
        if (createResp && createResp.userName) {
          res.json({
            msg: '入库成功',
            userName: createResp.userName,
            code: '200'
          });
        } else {
          res.json({
            msg: '新增入库失败',
            code: '701'
          });
        }
      }
  } else {
    res.json({
      msg: '请求信息不全',
      code: '900'
    })
  }
});



/* post user/login data. */
router.post('/login', async (req, res, next) => {
  if(req.body.userName && req.body.password) {
      const isExist = await M.user.findOne({
        userName: req.body.userName,
        userPassword: crypto.createHash('md5').update(req.body.password).digest('hex')
      }); // null or { username xxx}
      if (isExist && isExist.userName) {
        res.json({
          msg: '登录成功',
          userName: isExist.userName,
          userState: isExist.userState,
          userId: isExist.userId,
          code: '200'
        });
      } else {
        res.json({
          msg: '未注册或者密码错误， 请重新确认操作',
          code: '902'
        });
      }
    } else {
      res.json({
        msg: '账户和密码为空',
        code: '903'
      });
    }
});


///
// M.user.findOne({
//   userName: req.body.userName
// }, function(err, document) {
  // console.log(document);
// })


// 去解决多层回调地狱的问题 callback hell
// promise
// yield  Generator  co
// async await



module.exports = router;
