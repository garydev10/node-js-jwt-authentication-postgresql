const db = require("../models");
const Product = db.product;
// const Op = db.Sequelize.Op;

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Product
  const product = {
    name: req.body.name,
    stock: req.body.stock,
    price: req.body.price,
    shortDesc: req.body.shortDesc,
    description: req.body.description,
  };

  // Save Product in the database
  Product.create(product)
    .then(products => {
      res.send(products);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product."
      });
    });
};

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
  Product.findAll()
    .then(ps => {
      res.send(ps.map(p => ({
        id: p.id,
        name: p.name,
        stock: p.stock,
        price: p.price === null ? null : parseFloat(p.price),
        shortDesc: p.shortDesc,
        description: p.description
      })));
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    });
};

// Find a single Product with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Product.findByPk(id)
    .then(p => {
      res.send({
        id: p.id,
        name: p.name,
        stock: p.stock,
        price: p.price === null ? null : parseFloat(p.price),
        shortDesc: p.shortDesc,
        description: p.description
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Product with id=" + id
      });
    });
};

// Update a Product by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Product.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Product was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Product with id=" + id
      });
    });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Product.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Product was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Product with id=" + id
      });
    });
};

