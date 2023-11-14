const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
    // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});


router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tagData) {
      res.status(404).json({message: 'id not found'});
      return;
    }
      res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err){
    res.status(404).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedRows = await Tag.update(req.body, {
      where: { id: req.params.id }
    });

    if (updatedRows > 0) {
      const updatedTag = await Tag.findByPk(req.params.id);
      res.status(200).json(updatedTag);
    } else {
      res.status(404).json({message: 'No Tags found with this id!'})
    }
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy( {
      where: { id: req.params.id,},
    });
    if(!deleteTag){
      res.status(404).json({ message: 'No Tags found with this id!'});
      return;
    }

    res.status(200).json(deleteTag);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

module.exports = router;
