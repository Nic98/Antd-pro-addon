var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/add', async (req, res, next) => {
  // 新增的数据库操作
  const docs = await M.goods.create({ goods_id: 124,  goods_name: '212421'});
  console.log('添加成功, 返回的数据为', docs);
  res.render('index', { title: '添加成功' });
});

router.get('/', async (req, res, next) => {
  const 
})



/* GET data to  page. */
router.get('/list', async (req, res, next) => {
  // 新增的数据库操作
  // req.query  get
  // mock data 模拟数据
  // const mockData = new Array(1000);
  // mockData.fill(1);

  // mockData.map((v, index) => {
  //   M.goods.create({
  //     goodsId: index + 1 + '',
  //     goodsName: `商品${index + 1}`,
  //     seq: index
  //   });
  // })
  // res.json({});

  const goods_id = req.query.goods_id;
  if (goods_id && goods_id > 0) {
    const docs = await M.goods.find({ goodsId: goods_id + '' });
    if (docs && docs.goodsId) {
      res.json({
        listData: docs,
        code: 200
      });
    } else {
      res.json({
        msg: `未查到${goods_id}相关数据`,
        code: 405,
      });
    }
  } else {
    const docs = await M.goods.find({}).sort({ seq: 1 });
    res.json({
      listData: docs || [],
      code: 200,
    })
  }
});

/* GET home page. */
router.get('/delete', async (req, res, next) => {
  const deleteId = req.query.id;
  const resp = await M.goods.findOne({ goods_id: deleteId || 0 });
  if (resp) {
    resp.remove();
    res.render('index', { title: `已删除${deleteId}` });
  } else {
    res.render('index', { title: `删除的ID${deleteId}库里没数据` });
  }
});


// 去解决多层回调地狱的问题 callback hell
// promise
// yield  Generator  co
// async await

module.exports = router;