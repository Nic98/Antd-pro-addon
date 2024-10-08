var express = require('express');
var router = express.Router();

/* add ONE goods. */
router.post('/add', async (req, res, next) => {
  // 新增的数据库操作
  console.log(req.body.key);
  try {
    const docs = await M.goods.create({
      key: req.body.key,
      name: req.body.name,
      desc: req.body.desc,
      callNo: req.body.callNo,
      status: req.body.status,  
    });
    console.log('添加成功, 返回的数据为', docs);
    // res.render('添加成功');
    // res.render('index', { title: '添加成功' });
  } catch (error) {
    console.error('Error adding data:', error);
    next(error);
  }
});


/* GET all goods. */
router.get('/', async (req, res, next) => {
  try {
    const docs = await M.goods.find({}).sort({ seq: 1 });
    console.log('查询到的数据为', docs);
    res.json(docs);
    // res.render('index', { title: '查询成功', data: docs });
  } catch (error) {
    console.error('Error fetching data:', error);
    next(error);
  }
});

/* Delet one goods. */
router.post('/delete', async (req, res, next) => {
  const deleteId = req.query.id;
  const resp = await M.goods.findOne({ _id: deleteId || 0 });
  if (resp) {
    resp.remove();
    console.log(`已删除${deleteId}`);
  } else {
    // res.render('index', { title: `删除的ID${deleteId}库里没数据` });
    console.error(`删除的ID${deleteId}库里没数据`, error);
    next(error);
  }
});


// 去解决多层回调地狱的问题 callback hell
// promise
// yield  Generator  co
// async await

module.exports = router;