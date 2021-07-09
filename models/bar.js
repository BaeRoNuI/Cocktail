const Sequelize = require('sequelize');

module.exports = class Bar extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            name: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            address: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            comment: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            grade: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            phone: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps : false,
            underscored : false,
            modelName : 'Bar',
            table : 'bars',
            paranoid : false,
            charset : 'utf8',
            collate : 'utf8_general_ci',
        });
    }
    static associate(db) {
    }
}