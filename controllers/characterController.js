const db = require("../database/models");
const jwt = require('jsonwebtoken')
const getUrl = (req) =>
  req.protocol + "://" + req.get("host") + req.originalUrl;

module.exports = {
  all: (req, res) => {
    db.Personaje.findAll({
      include: [{ association: "films", include: ["genre"] }],
    })
      .then(personaje => {
        res.status(200).json({
          meta: {
            endPoint: getUrl(req),
            total: personaje.length,
          },
          data: personaje,
        });
      })
      .catch((error) => res.status(400).send(error));
  },
  one: (req, res) => {
    db.Personaje.findByPk(req.params.id, {
      include: [{ association: "films", include: ["genre"] }],
    })
      .then((personaje) => {
        res.status(200).json({
          meta: {
            endPoint: getUrl(req),
            total: personaje.length,
          },
          data: personaje,
        });
      })
      .catch((error) => res.status(400).send(error));
  },
  add: (req, res) => {
    const { imagen, nombre, edad, peso, historia } = req.body;
    
    jwt.verify(req.token, 'secretkey', (error, authData) =>{
      if(error){
        res.sendStatus(403);
      }else{
        db.Personaje.create({
          imagen,
          nombre,
          edad,
          peso,
          historia,
        })
        .then((personaje) =>
          res.status(201).json({
            msg: "Personaje creado",
            personaje,
            authData
          })
        )
        .catch((error) => res.status(400).send(error));
      }
    })
    
  },
  edit: (req, res) => {
    const { imagen, nombre, edad, peso, historia } = req.body;
    jwt.verify(req.token, 'secretkey', (error, authData) => {
      if(error){
        res.sendStatus(403);
      }else{
        db.Personaje.update(
          {
            imagen,
            nombre,
            edad,
            peso,
            historia,
          },
          {
            where: {
              id: req.params.id,
            },
          }
        )
          .then(personaje =>
          res.status(201).json({
            msg: "Personaje actualizado",
            personaje,
            authData
          }))
          .catch((error) => res.status(400).send(error));
      }
    })
    
  },
  delete: (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData) => {
      if(error){
        res.sendStatus(403);
      }else{
        /* db.film_personaje.destroy({
          where: {
            personajeId: req.params.id,
          },
        })
        .then( */
          db.Personaje.destroy({
            where: {
              id: req.params.id,
            },
          })
            .then(() => {
              return res.status(201).json({
                msg: "Personaje eliminado",
                authData
              });
            })
            .catch((err) => res.status(400).send(err))
        //);
      }
    })
    
  },
  search: (req, res) =>{
    db.Personaje.findAll({
      where: {
        nombre: req.params.name.toLowerCase().trim(), 
      },
      include: [{ association: "films", include: ["genre"] }],
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
};
