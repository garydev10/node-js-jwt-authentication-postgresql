const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var bcrypt = require("bcryptjs");

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;
const User = db.user;
const Product = db.product;
const test_data = require("./app/config/test_data");

// db.sequelize.sync();
// force: true will drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync Database with { force: true }');
  initial();
  console.log('Init End');
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/product.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {

  // seed data
  Role.create({
    // id: 1,
    name: "user"
  });

  Role.create({
    // id: 2,
    name: "moderator"
  });

  Role.create({
    // id: 3,
    name: "admin"
  });

  User.create({
    // id: 1,
    username: "admin",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("password", 8)
  }).then(user => { user.setRoles([1, 2, 3]) });

  User.create({
    // id: 2,
    username: "mod",
    email: "mod@gmail.com",
    password: bcrypt.hashSync("password", 8)
  }).then(user => { user.setRoles([1, 2]) });

  User.create({
    // id: 3,
    username: "user",
    email: "user@gmail.com",
    password: bcrypt.hashSync("password", 8)
  }).then(user => { user.setRoles([1]) });


  // test_data.test_products.sort((a, b) => a.id > b.id ? 1 : -1).map(p => Product.create({
  test_data.test_products
    .sort()
    .map(p => Product.create({
      // id: p.id,
      name: p.name,
      stock: p.stock,
      price: p.price,
      shortDesc: p.shortDesc,
      description: p.description
    }));

}