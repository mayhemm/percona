var Sequelize = require("sequelize");
var sequelize = require("./.");

module.exports = sequelize.define("Stat", {
    day: {
        type: Sequelize.DATE,
        validate: {
            isDate: true
        }
    },
    s1: {
        type: Sequelize.INTEGER,
        validate: {
            isInt: true
        }
    },
    s2: {
        type: Sequelize.INTEGER,
        validate: {
            isInt: true
        }
    },
    s3: {
        type: Sequelize.INTEGER,
        validate: {
            isInt: true
        }
    },
    s4: {
        type: Sequelize.INTEGER,
        validate: {
            isInt: true
        }
    },
    s5: {
        type: Sequelize.INTEGER,
        validate: {
            isInt: true
        }
    }
});