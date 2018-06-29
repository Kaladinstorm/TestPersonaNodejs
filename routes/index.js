var express = require('express');
var router = express.Router();
const request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'people23' });
});

/* GET home page. */
router.get('/personas', function(req, res, next) {

  request.get('http://localhost:3000/api/persona', function(err, resp) {
    if(err) {
      throw err;
    } else {

      const personas = JSON.parse(resp.body);

      if(personas.message.length > 0) {
        var nombres = [];
        var ruts = [];

        personas.message.forEach(function(element, index) {
          nombres[index] = element.nombre;
          ruts[index] = element.rut;
      
        });

        res.render('listaPersonas', { title: 'Lista Personas', rut: ruts, nombre: nombres });
      }
      else {
        res.render('listaPersonas', { title: 'Lista Personas', rut: [], nombre: []});
      }

    }
  });
  
});
module.exports = router;
