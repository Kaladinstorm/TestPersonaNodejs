const express = require('express');
const router = express.Router();
const personaController = require('../controllers/persona.controllers');

const resTemplate = function(codigo, mensaje, res) {
    res.send({ 'Code' : codigo, 'message':  mensaje });
}

/* POST para agregar una persona. */
router.post('/persona', function(req, res, next) {

    personaController.agregarPersona({
        rut: req.body.rut,
        nombre: req.body.nombre
    }).then((persona) => {
        resTemplate(200, persona, res);
    }).catch((error) => {
        resTemplate(500, error.msg, res);
    });
});

/* DELETE para eliminar una persona. */
router.delete('/persona', function(req, res, next) {

    personaController.eliminarPersona(req.body.rut).then((persona) => {
        resTemplate(200, persona, res);
    }).catch((error) => {
        resTemplate(500, error.msg, res);
    });
});

/* Put para modificar una persona */
router.put('/persona', function(req, res, next) {
    console.log(req.body.rut);
    personaController.modificaPersona({
        rut: req.body.rut,
        nombre: req.body.nombre
    }).then((persona) => {
        resTemplate(200, persona, res);
    }).catch((error) => {
        resTemplate(500, error.msg, res);
    });
});

/* GET para buscar a una persona. */
router.get('/persona/:rut', function(req, res, next) {

    personaController.buscaPersona(req.params.rut).then((persona) => {
        resTemplate(200, persona, res);
    }).catch((error) => {
        resTemplate(500, error.msg, res);
    });
});

/* GET para buscar a una persona. */
router.get('/persona/', function(req, res, next) {

    personaController.listaPersonas().then((persona) => {
        resTemplate(200, persona, res);
    }).catch((error) => {
        resTemplate(500, error.msg, res);
    });
});

module.exports = router;
