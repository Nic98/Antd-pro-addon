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
  const pageId = req.body.pageId;
  const schema = req.body.schema || '';

    if (!pageId) {
      res.json({
        msg: 'pageId不能为空',
        code: '701'
      });
  }
  
  const docs = await M.projectSchema.find({ pageId: pageId });
  const docSchema = docs.schema;
    if (docs && docs.pageId) {
       
    } else {
      try {
        await M.projectSchema.create({
          pageId: req.body.pageId,
          pageName: req.body.pageName, // 其他字段...
        });
        res.json(
          {
            msg: '创建成功',
            code: '200',
          }
        )
      } catch (error) {
        res.json({
          msg: '创建异常',
          code: '702'
        });
      }
    }
});


module.exports = router;
