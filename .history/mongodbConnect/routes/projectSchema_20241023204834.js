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
      key: 1,
      name: "page",
      content: req.body.desc,
    });
    console.log('添加成功, 返回的数据为', docs);
    res.json(docs);
  } catch (error) {
    console.error('Error adding data:', error);
    next(error);
  }
});
  


module.exports = router;
