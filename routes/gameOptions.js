const express = require('express');
const router = express.Router();
const Level = require('../classes/Level');

router.get('/:letterCount/:numWordsToSolve', (req, res) => {
  try {
    const { letterCount, numWordsToSolve } = req.params;
    const { commonDictionary } = req.app.settings;

    const levelParams = {
      dictionary: commonDictionary,
      letterCount: parseInt(letterCount, 10),
      numWordsToSolve: parseInt(numWordsToSolve, 10)
    };

    const newLevel = new Level(levelParams);
    const wordOptions = newLevel.getWordOptions();

    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify(wordOptions, null, 2));
  }
  catch (err) {
    res.json({ error: 'Check endpoint and try again' }).status(400);
  }

});

router.get('/:key', (req, res) => {
  try {
    const { key } = req.params;
    const { commonDictionary } = req.app.settings;

    const result = commonDictionary.allSubWordsToJSON(key);

    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify(result, null, 2));
  }
  catch (err) {
    res.json({ error: 'Check endpoint and try again' }).status(400);
  }
});

router.get('*', (req, res) => res.json({ error: 'Check endpoint and try again' }).status(400));

module.exports = router;
