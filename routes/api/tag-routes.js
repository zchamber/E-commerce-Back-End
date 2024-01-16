const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: {
      model: Product,
      attributes: [`product_name`, `price`, `stock`, `category_id`],
    },
  }).then((productData) => res.json(productData))
  .catch((err) => {
    res.status(400).json(err)
  })
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: {
        model: Product,
        attributes: [`product_name`, `price`, `stock`, `category_id`],
      },
    });
    return res.status(200).json(tagData);
  }
  catch(err){
    res.status(404).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    return res.status(200).json(newTag);
  }catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagUpdate = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
      individualHooks: true
    });
    res.status(200).json(tagUpdate);
  }
  catch(err){
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
  const tagDel = await Tag.destroy({
    where: {
      id: req.params.id
    },
  })
    res.status(200).json(tagDel);
  }catch(err) {
    res.status(400).json(err);
  }
});

module.exports = router;