var Sequelize = require("sequelize");
var debug = require("debug")("sequelize");

module.exports = new Sequelize("sqlite:///percona_dev", { logging: debug });
