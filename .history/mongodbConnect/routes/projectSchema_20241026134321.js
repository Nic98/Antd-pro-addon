var express = require('express');
var router = express.Router();

router.get('/get', async (req, res, next) => {
  try {
    const docs = await M.projectSchema.find({}).sort({ seq: 1 });
    console.log('查询到的数据为', docs);
    res.json({
      msg: '查询成功',
      code: '200',
      data: docs
    })
  } catch (error) {
    console.error('Error fetching data:', error);
    next(error); // 将错误传递给下一个中间件或错误处理程序
  }
});

router.post('/save', async (req, res, next) => {
  const pageId = req.body.pageId;
  const schema = req.body.projectSchema || '';

    if (!pageId) {
      res.json({
        msg: 'pageId不能为空',
        code: '701'
      });
  }
  
  const docs = await M.projectSchema.find({ pageId: pageId });
  const docSchema = docs.projectSchema;
  if (docs && docs.pageId) {
    if (schema === docSchema) {
      res.json({
        msg: '协议未变化，无需保存',
        code: '200'
      });
    } else {
      await M.projectSchema.update({ pageId: pageId }, { projectSchema: schema });
    }
  } else {
      try {
        await M.projectSchema.create({
          projectSchema: projectSchema,
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
