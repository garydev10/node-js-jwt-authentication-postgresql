const { authJwt } = require("../middleware");
const controller = require("../controllers/product.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Retrieve all Products
  app.get("/api/product", controller.findAll);

  // Retrieve a single Product with id
  app.get("/api/product/:id", controller.findOne);

  // Create a new Product
  app.post("/api/product", [authJwt.verifyToken, authJwt.isModerator], controller.create);
  app.post("/api/product", [authJwt.verifyToken, authJwt.isAdmin], controller.create);

  // Update a Product with id
  app.put("/api/product/:id", [authJwt.verifyToken, authJwt.isModerator], controller.update);
  app.put("/api/product/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.update);

  // Delete a Product with id
  app.delete("/api/product/:id", [authJwt.verifyToken, authJwt.isModerator], controller.delete);
  app.delete("/api/product/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.delete);
};
