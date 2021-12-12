const db =  require('../database/models')
const getUrl = (req) =>
  req.protocol + "://" + req.get("host") + req.originalUrl;

module.exports = {
    all: (req, res) => {
        db.Film.findAll({
            include : [{association : 'personajes'}, {association: 'genre'}]
          })
          .then(result => {
            if(result !== 0){
              res.status(200).json({
                meta: {
                    endPoint: getUrl(req),
                    total: result.length,
                  },
                  data: result
              })
            }else{
              return res.status(404).json({
                meta: {
                  status: 404,
                  msg: "Not found",
                },
              });
            }
            
          })
          .catch((error) => res.status(400).send(error));
    },
    one: (req, res) => {
      if (req.params.id % 1 !== 0 || req.params.id < 0) {
        return res.status(400).json({
          meta: {
            status: 400,
            msg: "Wrong ID",
          },
        });
      } else {
        db.Film.findOne({
          where: { id: req.params.id },
          include: [{ association: "personajes" }, { association: "genre" }],
        }).then(result => {
          if (result) {
            return res.status(200).json({
              meta: {
                endPoint: getUrl(req),
                name: result.nombre,
              },
              data: result,
            });
          } else {
            return res.status(404).json({
              meta: {
                status: 404,
                msg: "ID not found",
              },
            });
          }
        })
        .catch(errors => console.log(errors)
        )
      }
    },
    search: (req, res) => {
      db.Film.findAll()
      .then(result)
    },
    add: (req, res) => {
      const {
        imagen,
        titulo,
        fechaCreacion,
        calificacion,
        genero
      } = req.body;
      db.Film.create({
        imagen,
        titulo,
        fechaCreacion,
        calificacion,
        genero
      })
      .then(result => {
        res.status(201).json({
          meta: {
            endPoint: getUrl(req),
            msg: "Pelicula agregada",
          },
          data: result,
        });
      }).catch(error => res.status(400).send(error));
    },
    edit: (req, res) => {
      const {
        imagen,
        titulo,
        fechaCreacion,
        calificacion,
        genero,
      } = req.body;
      db.Film.update(
        {
          imagen,
          titulo,
          fechaCreacion,
          calificacion,
          genero,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      ).then(() =>
        res.status(201).json({
          msg: "Film actualizado",
        })
      )
      .catch(error => res.status(400).send(error))
    },
    delete: (req, res) => {
      db.films_personajes
      .destroy({
        where: {
          filmId: req.params.id,
        },
      })
      .then(
        db.Film.destroy({
          where: {
            id: req.params.id,
          },
        })
          .then(() => {
            return res.status(201).json({
              msg: "Film eliminado",
            });
          })
          .catch((err) => res.status(400).send(err))
      );
    },
    search: (req, res) =>{
      db.Film.findAll({
        where: {
          titulo: req.params.title.toLowerCase().trim(), 
        },
        include: [{ association: "personajes" }, { association: "genre" }],
      })
      .then(result => {
        res.status(200).json({
          meta: {
            endPoint: getUrl(req),
            total: result.length,
          },
          data: result,
        });
      })
      .catch((error) => res.status(400).send(error));
    }
}