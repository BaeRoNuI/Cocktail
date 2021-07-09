const Sequelize = require('sequelize');
const Bar = require('./bar');
const Cocktail = require('./cocktail');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Bar = Bar;

Bar.init(sequelize);
Cocktail.init(sequelize);

Bar.associate(db);
Cocktail.associate(db);

module.exports = db;