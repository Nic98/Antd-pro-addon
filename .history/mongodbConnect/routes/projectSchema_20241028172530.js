var express = require('express');
var router = express.Router();

router.post('/getPage', async (req, res, next) => {
  
  try {
    const pageId = req.body.pageId;
    const docs = await M.projectSchema.find({ pageId: pageId }) 
    res.json({
      msg: '查询成功',
      code: '200',
      data: docs,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    next(error); // 将错误传递给下一个中间件或错误处理程序
  }
});


router.get('/get', async (req, res, next) => {
  try {
    const docs = await M.projectSchema.find({});
    res.json({
      msg: '查询成功',
      code: '200',
      data: docs,
    })
  } catch (error) {
    console.error('Error fetching data:', error);
    next(error); // 将错误传递给下一个中间件或错误处理程序
  }
});

router.post('/save', async (req, res, next) => {
  const pageId = req.body.pageId;
  const projectSchema = req.body.projectSchema || '';

  if (!pageId) {
    res.json({
      msg: 'pageId不能为空',
      code: '701'
    });
  }
  
  const docs = await M.projectSchema.find({ pageId: pageId });
  if (docs.length > 0 && docs[0].pageId) {
    const doc = docs[0];
    const docSchema = await doc.projectSchema;
    if (projectSchema === docSchema) {
      res.json({
        msg: '协议未变化，无需保存',
        code: '200'
      });
    } else {
      await M.projectSchema.update({ pageId: pageId }, { projectSchema: projectSchema });
      res.json({
        msg: '保存成功',
        code: '200'
      })
    }
  } else {
      try {
        await M.projectSchema.create({
          projectSchema: projectSchema,
          pageId: pageId,
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
          msg: '创建异常' + error,
          code: '702'
        });
      }
    }
});

router.delete('/delete', async (req, res, next) => {
  const pageId = req.query.pageId;
  if (!pageId) {
    res.json({
      msg: 'pageId不能为空',
      code: '701'
    });
  }
  try {
    const resp = await M.projectSchema.findOne({ pageId: pageId });
    if (resp) {
      await resp.remove();
      res.json({
        msg: `已删除${pageId}`,
        code: '200'
      });
    } else {
      console.error(`删除的ID${pageId}库里没数据`);
      res.json({
        msg: `删除的ID${pageId}库里没数据`,
        code: '404'
      });
    }
  } catch (error) {
    console.error('Error deleting data:', error);
    next(error); // 将错误传递给下一个中间件或错误处理程序
  }
});


module.exports = router;
