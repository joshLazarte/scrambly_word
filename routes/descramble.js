const express = require('express');
const router = express.Router();

router.get('/:string', (req, res) => {
  try {
    const { dictionary } = req.app.settings;
    const result = dictionary.allSubWordsToJSON(req.params.string);

    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify(result, null, 2));
  }
  catch (err) {
    res.json({ error: 'Check endpoint and try again' }).status(400);
  }
});

router.get('*', (req, res) => res.json({ error: 'Check endpoint and try again' }).status(400));

module.exports = router;
