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
    res.status(500).json({message: 'Nothing Found' });
  }
});
//This code usses Sequelize, which is an ORM (Object-Relational Mapping) for Node.js that works with databases like MySQL
//Category.findAll(): This is a Sequelize method to find all entries in the Category model/table in the associated database. It fetchings
//all categories.include: [{ model: Product }]: This line specifies an association or a join, indicating that along with the categories 
// it should also retrieve associated products. This assumes there's a relationship defined between the Category and Product models 
// in your Sequelize setup. try {...} catch (err) {...}: This is a standard error handling structure in JavaScript. 
// It attempts to execute the code within the try block, and if any errors occur during this execution, it will be caught and handled 
// in the catch block. res.status(200).json(categories);: If the Category.findAll() and product inclusion operation is successful, 
// it will respond with a status code of 200 (indicating success) and return the found categories along with their 
// associated products in JSON format. res.status(500).json({message: 'Nothing Found'}); In case an error occurs during the operation, 
// it responds with a status code of 500 (internal server error) and sends a JSON response with the message 'Nothing Found'.
//This code essentially attempts to fetch all categories and their associated products from the database using Sequelize and 
// handles both successful and error scenarios when fetching this data.
router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
