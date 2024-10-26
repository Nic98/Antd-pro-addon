var express = require('express');
var router = express.Router();

router.get('/get', async (req, res, next) => {
  try {
    const docs = await M.project.find({}).sort({ seq: 1 });
    console.log('查询到的数据为', docs);
    res.json(docs);
  }
 });