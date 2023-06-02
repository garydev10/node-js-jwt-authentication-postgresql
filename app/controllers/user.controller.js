const db = require("../models");
const User = db.user;
const Role = db.role;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.findAll = (req, res) => {


  User.findAll({
    attributes: [
      'id',
      'username',
      'email'
    ],
    include: [{
      model: Role,
      attributes: ['name'],
      through: { attributes: [] }
    }]
  })
    .then(users => {
      res.send(users.sort().map(user => ({
        id: user.id,
        username: user.username,
        email: user.email,
        roles: user.roles.map(role => "ROLE_" + role.name.toUpperCase())
      })));
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};