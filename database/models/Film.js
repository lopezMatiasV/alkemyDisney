module.exports = (sequelize, dataTypes) => {
  let alias = "Film";
  let cols = {
    id: {
      type: dataTypes.INTEGER(11).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    imagen: {
      type: dataTypes.STRING(100),
      allowNull: true,
    },
    titulo: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
    fechaCreacion: {
      type: dataTypes.DATE,
      allowNull: false,
    },
    calificacion: {
      type: dataTypes.INTEGER(11),
      allowNull: true,
    },
    genero: {
      type: dataTypes.INTEGER(11),
      allowNull: false,
    },
  };
  let config = {
    tableName: "films",
    timestamps: false,
  };
  const Film = sequelize.define(alias, cols, config);

  Film.associate = (models) => {
    Film.belongsTo(models.Genero, {
      as: "genre",
      foreignKey: "genero",
    });
    Film.belongsToMany(models.Personaje, {
      as:"personajes",
      through: "films_personajes",
      foreignKey: "personajeId",
      timestamps: false,
    })
  };
  return Film;
};
