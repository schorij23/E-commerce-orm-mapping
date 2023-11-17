const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
    // Find all categories and include its associated Products
    try {
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({error: err.message });
  }
});
// find a single category by ID
router.get('/:id', async (req, res) => {
  // Find Category by Primary Key ID and include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    // Check if the category with the given ID was not found
    if (!categoryData) {
      res.status(404).json({message: 'id not found'});
      return;
    }
      res.status(200).json(categoryData);
    } catch (err) {
    res.status(500).json({error: err.message});
  }
});

router.post('/', async (req, res) => {
   // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);

  } catch (err) {
    res.status(500).json({error: err.message});
  }
});
// Update a category by ID
router.put('/:id', async (req, res) => {
  try {
    // Update the category with the provided data
    const updatedCategory = await Category.update(req.body, {
      where: { id: req.params.id }
    });
    // Check if the category with the given ID was not found
    if (!updatedCategory) {
      res.status(404).json({ message: 'Category not found with this id!' });
      return;
    }
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  // Delete a category by ID
  try {
    const deleteCategory = await Category.destroy( {
      where: { id: req.params.id, 
      },
    });
    // Check if the category with the given ID was not found
    if(!deleteCategory) {
      res.status(404).json({ message: 'Category not found with this id!'});
      return;
    } 
      res.status(200).json(deleteCategory); 
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
