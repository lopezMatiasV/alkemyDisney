module.exports = (sequelize, dataTypes) => {
  let alias = "Personaje";
  let cols = {
    id: {
      type: dataTypes.INTEGER(11).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    imagen: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
    nombre: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
    edad: {
      type: dataTypes.INTEGER(11),
      allowNull: true,
    },
    peso: {
      type: dataTypes.INTEGER(11),
      allowNull: true,
    },
    historia: {
      type: dataTypes.STRING(255),
      allowNull: true,
    },
  };
  let config = {
    tableName: "personajes",
    timestamps: false,
  };
  const Personaje = sequelize.define(alias, cols, config);

  Personaje.associate = (models) => {
    Personaje.belongsToMany(models.Film, {
      as:"films",
      through: "films_personajes",
      foreignKey: "film_id",
      timestamps: false,
    })
  };
  return Personaje;
};
