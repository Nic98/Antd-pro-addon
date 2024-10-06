var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'project_v1' });
});

router.post('/', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.send('You sent: sdadad to Express');
});

router.get('/queryById',  async (req, res, next) => {
  if (req.query.userId) {
    res.json({
      code: 200,
      msg: 'ok',
    });
  } else {
    res.json({
      code: 500,
      msg: 'not ok',
    });
  }
});



module.exports = router;
