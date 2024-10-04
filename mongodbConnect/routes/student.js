var express = require('express');
const crypto = require('crypto');
var router = express.Router();

router.get('/createSome', async (req, res, next) => {
  const createResp = await M.student.create({
    stu_id: '100001',
    stu_name: 'liuzhangna',
    seq: 1,
  });
  if (createResp && createResp.stu_id) {
    res.json({
      msg: '创建成功',
      code: '200',
      ...createResp['_doc']
    });
  } else {
    res.json({
      msg: '新增失败',
      code: '701'
    });
  }
});


module.exports = router;
