const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
    // find all categories
  // be sure to include its associated Products
  
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    });

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

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedRows = await Category.update(req.body, {
      where: { id: req.params.id }
    });

    if (updatedRows > 0) {
      const updatedCategory = await Category.findByPk(req.params.id);
      res.status(200).json(updatedCategory);
    } else {
      res.status(404).json({ message: 'Category not found with this id!' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy( {
      where: { id: req.params.id, 
      },
    });
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
