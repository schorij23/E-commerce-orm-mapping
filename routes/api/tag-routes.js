const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
    // find all tags and include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

// find a Tag category by ID
router.get('/:id', async (req, res) => {
  // Find Tag by Primary Key ID and include its associated Products
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
// update a tag's name by ID value
router.put('/:id', async (req, res) => {
  try {
    // Update the tag with the provided data
    const updatedTag = await Tag.update(req.body, {
      where: { id: req.params.id }
    });
    // Check if the tag with the given ID was not found
    if (!updatedTag) {
      res.status(404).json({message: 'No Tags found with this id!'})
      return;

    }
      res.status(200).json(updatedTag);
      } catch (err) {
      res.status(500).json({error: err.message});
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by ID
  try {
    const deleteTag = await Tag.destroy( {
      where: { id: req.params.id,},
    });
    // Check if the tag with the given ID was not found
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
