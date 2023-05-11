const router = require('express').Router();
const Category = require('../models/Category');

//POST
router.post('/', async (req, res) => {
  const newCat = new Category(req.body);
  try {
    const saveCat = await newCat.save();
    res.status(200).json(saveCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get('/', async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
