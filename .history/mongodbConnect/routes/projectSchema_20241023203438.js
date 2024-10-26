var express = require('express');
var router = express.Router();

router.get('/get', async (req, res, next) => {
  try {
    const docs = await M.projectSchema.find({}).sort({ seq: 1 });
    console.log('查询到的数据为', docs);
    res.json(docs);
  } catch (error) {
    console.error('Error fetching data:', error);
    next(error); // 将错误传递给下一个中间件或错误处理程序
  }
});

router.post('/add', async (req, res, next) => {
  try {
    const docs = await M.projectSchema.create({
      key: req.body.key,
      name: req.body.name,
      desc: req.body.desc,
      callNo: req.body.callNo,
      status: req.body.status,
    });
    console.log('添加成功, 返回的数据为', docs);
    res.json(docs);
  }
});
  


module.exports = router;
