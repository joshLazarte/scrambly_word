const express = require('express');
const router = express.Router();
const Level = require('../classes/Level');

router.get('/keys/:letterCount/:numWordsToSolve', (req, res) => {
  const { letterCount, numWordsToSolve } = req.params;
  const { commonDictionary } = req.app.settings;

  const levelParams = {
    dictionary: commonDictionary,
    letterCount: parseInt(letterCount),
    numWordsToSolve: parseInt(numWordsToSolve)
  };

  const newLevel = new Level(levelParams);
  const wordOptions = newLevel.getWordOptions();

  res.json(Object.keys(wordOptions)).status(200);
});

module.exports = router;
