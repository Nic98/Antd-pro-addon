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

router.post('/save', async (req, res, next) => {
  try {
    const pageId = req.body.pageId;
    if (!pageId) {
      res.json({
        msg: 'pageId不能为空',
        code: '701'
      });
    }
    const docs = await M.projectSchema.find({ pageId: pageId });
    if (docs && docs.pageId) {
      res.json({
        msg: 'pageId已存在',
        code: '701'
      }
    } 

});


module.exports = router;