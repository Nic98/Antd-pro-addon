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
    res.json(docs);
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
  } catch (error) {
    console.error('Error fetching data:', error);
    next(error);
  }
});

/* Delet one goods. */
router.delete('/delete', async (req, res, next) => {
  const deleteId = req.query._id;
  try {
    const resp = await M.goods.findOne({ _id: deleteId });
    if (resp) {
      await resp.remove();
      console.log(`已删除${deleteId}`);
      res.status(200).json({ message: `Item with ID ${deleteId} has been deleted.` });
    } else {
      console.error(`删除的ID${deleteId}库里没数据`);
      res.status(404).json({ error: `Item with ID ${deleteId} not found.` });
    }
  } catch (error) {
    console.error(`Error deleting item with ID ${deleteId}:`, error);
    next(error);
  }
});

/* Update one goods. */
router.put('/update/:_id', async (req, res, next) => {

  try {
    const _id = req.params._id;
    const updateData = req.body;
    const updatedGoods = await M.goods.findByIdAndUpdate(_id, updateData, { new: true });
    if (!updatedGoods) {
      return res.status(404).send('Goods not found');
    }
    res.json(updatedGoods);
  } catch (error) {
    next(error);
  }
});

// 去解决多层回调地狱的问题 callback hell
// promise
// yield  Generator  co
// async await

module.exports = router;
