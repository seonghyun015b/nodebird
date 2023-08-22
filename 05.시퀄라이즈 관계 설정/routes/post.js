const express = require('express');

const router = express.Router();

// POST / post

router.post('/', (req, res) => {
  res.json([
    { id: 1, content: 'post1' },
    { id: 2, content: 'post2' },
    { id: 3, content: 'post3' },
  ]);
});

// POST / delete

router.delete('/', (req, res) => {
  res.json([
    { id: 1, content: 'delete1' },
    { id: 2, content: 'delete2' },
    { id: 3, content: 'delete3' },
  ]);
});

module.exports = router;
