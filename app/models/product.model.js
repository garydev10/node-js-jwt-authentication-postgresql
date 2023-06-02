module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("products", {
    // id: {
    //   type: Sequelize.INTEGER,
    //   autoIncrement: true,
    //   primaryKey: true
    // },
    name: {
      type: Sequelize.STRING
    },
    stock: {
      type: Sequelize.INTEGER
    },
    price: {
      type: Sequelize.DECIMAL(10, 2)
    },
    shortDesc: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    }
  });

  return Product;
};
