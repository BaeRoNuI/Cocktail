const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            korName: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            engName: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            num: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            alcohol: {
                type: Sequelize.FLOAT,
                allowNull : false,
            },
            gin: {
                type: Sequelize.TINYINT,
                allowNull : false,
            },
            vodka: {
                type: Sequelize.TINYINT,
                allowNull : false,
            },
            rum: {
                type: Sequelize.TINYINT,
                allowNull : false,
            },
            tequila: {
                type: Sequelize.TINYINT,
                allowNull : false,
            },
            whiskey: {
                type: Sequelize.TINYINT,
                allowNull : false,
            },
            cassis: {
                type: Sequelize.TINYINT,
                allowNull : false,
            },
            midori: {
                type: Sequelize.TINYINT,
                allowNull : false,
            },
            peachTree: {
                type: Sequelize.TINYINT,
                allowNull : false,
            },
            tripleSec: {
                type: Sequelize.TINYINT,
                allowNull : false,
            },
            kahlua: {
                type: Sequelize.TINYINT,
                allowNull : false,
            },
            baileys: {
                type: Sequelize.TINYINT,
                allowNull : false,
            },
            alcoholIngredient: {
                type : Sequelize.TEXT,
                allowNull : true,
            },
            nonalcoholIngredient: {
                type : Sequelize.TEXT,
                allowNull : true,
            },
            recipe: {
                type : Sequelize.TEXT,
                allowNull : true,
            },
            comment: {
                type : Sequelize.TEXT,
                allowNull : true,
            },
            coffee: {
                type: Sequelize.TINYINT,
                allowNull : false,
            },
            tropical: {
                type: Sequelize.TINYINT,
                allowNull : false,
            },
        }, {
            sequelize,
            timestamps : false,
            underscored : false,
            modelName : 'Cocktail',
            table : 'cocktails',
            paranoid : false,
            charset : 'utf8',
            collate : 'utf8_general_ci',
        });
    }
    static associate(db) { }
}