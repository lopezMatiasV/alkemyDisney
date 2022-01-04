module.exports = function(sequelize, dataTypes) {

    let alias = "film_personaje";

    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        personaje_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull : false
        },
        film_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull : false
        },
    }

    let config = {
        tableName: "films_personajes",
        timestamps: false
    }

    let film_personaje = sequelize.define(alias, cols, config)
    return film_personaje
}