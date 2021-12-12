module.exports = (sequelize, dataTypes) => {
    let alias = "Genero";
    let cols = {
      id: {
        type: dataTypes.INTEGER(11).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: dataTypes.STRING(100),
        allowNull: false,
      },
      imagen: {
        type: dataTypes.STRING(100),
        allowNull: true,
      },
    };
    let config = {
      tableName: "generos",
      timestamps: false,
    };
    const Genero = sequelize.define(alias, cols, config);
  
    Genero.associate = models => {
        Genero.hasMany(models.Film, {
            as: "films",
            foreignKey: "genero"
        })
    }
    return Genero;
  };