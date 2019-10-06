const express = require('express');
const router = express.Router();

router.get('/:string', (req, res) => {
  const { dictionary } = req.app.settings;

  const result = dictionary.allSubWordsToJSON(req.params.string);

  res.header('Content-Type', 'application/json');
  res.send(JSON.stringify(result, null, 2));
});

module.exports = router;
