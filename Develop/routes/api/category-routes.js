const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // be sure to include its associated Products
  Category.findAll(
    {
      include: {
        model: Product,
        attributes: ['product_name']
      }
    }
  )
    .then(categoryData => res.json(categoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET one category by id
router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['category_id']
    }
  })
    .then(categoryData => res.json(categoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST a new category
router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
    .then(categoryData => res.json(categoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// PUT update a category
router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then(categoryData => {
      if (!categoryData) {
        res.status(404).json({ message: 'No Category found' });
        return;
      }
      res.json(categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE a category by id
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(categoryData => {
      if (!categoryData) {
        res.status(404).json({ message: 'No Category FOund' });
        return;
      }
      res.json(categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// router.get("/", async (req, res) => {
//   try {
//     const categoryData = await Category.findAll(
//       {
//         include: {
//           model: Product,
//           attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
//         }
//       }
//     );
//     res.status(200).json(categoryData);
//   } catch (error) {
//     escape.status(500).json(error);
//   }
//   // find all categories
//   // be sure to include its associated Products
// });

// router.get("/:id", async (req, res) => {
//   try {
//     const categoryData = await Category.findByPk(req.params.id, {
//       include: {
//         model: Product,
//         attributes: ['id', 'product_name', 'price', 'stock', 'category_id' ]
//       },
//     });

//     if (!categoryData) {
//       res.status(404).json({ message: "Not good!" });
//       return;
//     }

//     res.status(200).json(categoryData);
//   } catch (err) {
//     res.status(500).json(err);
//   }

//   // find one category by its `id` value
//   // be sure to include its associated Products
// });

// router.post("/", async (req, res) => {
//   // create a new category
//   try {
//     const categoryData = await Category.create(req.body.category_name);
//     res.status(200).json(categoryData);
//   } catch (error) {
//     res.status(400).json(error);
//   }
// });

// router.put("/:id", async (req, res) => {
//   // update a category by its `id` value
//   const categoryData = await Category.update(
//     {
//       id: req.body.id,
//     },
//     {
//       where: {
//         id: req.params.id,
//       },
//     }
//   );
//   return res.json(categoryData);
// });

// router.delete("/:id", async (req, res) => {
//   // delete a category by its `id` value
//   try {
//     const categoryData = await Category.destroy({
//       where: {
//         id: req.params.id,
//       },
//     });
//     if (!categoryData) {
//       res.status(404).json({ message: "Not good!" });
//       return;
//     }

//     res.status(200).json(categoryData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
